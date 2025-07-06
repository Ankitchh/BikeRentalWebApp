import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create context
const BookingContext = createContext();

export const BookingProvider = ({ children, bikes = [] }) => {
  const [booking, setBooking] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    startDate: null,
    endDate: null,
    pickupLocation: "",
    dropoffLocation: "",
    fuelOption: "half",
    accessories: [],
    selectedBike: "",
  });

  const [formStep, setFormStep] = useState(1);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Update booking information
  const updateBooking = (field, value) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add accessory to booking
  const addAccessory = (accessory) => {
    const existing = booking.accessories.find(
      (item) => item.id === accessory.id
    );

    if (existing) {
      setBooking((prev) => ({
        ...prev,
        accessories: prev.accessories.map((item) =>
          item.id === accessory.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      setBooking((prev) => ({
        ...prev,
        accessories: [...prev.accessories, { ...accessory, quantity: 1 }],
      }));
    }
  };

  // Remove accessory from booking
  const removeAccessory = (accessoryId) => {
    setBooking((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((item) => item.id !== accessoryId),
    }));
  };

  // Update accessory quantity
  const updateAccessoryQuantity = (accessoryId, quantity) => {
    if (quantity <= 0) {
      removeAccessory(accessoryId);
      return;
    }

    setBooking((prev) => ({
      ...prev,
      accessories: prev.accessories.map((item) =>
        item.id === accessoryId ? { ...item, quantity: quantity } : item
      ),
    }));
  };

  // Calculate number of rental days
  const calculateRentalDays = () => {
    if (!booking.startDate || !booking.endDate) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  // Calculate total price
  const calculateTotal = () => {
    const rentalDays = calculateRentalDays();
    const selectedBike = bikes.find(
      (bike) => bike._id === booking.selectedBike
    );
    const bikePrice = selectedBike ? selectedBike.ratePerDay * rentalDays : 0;

    const accessoriesTotal = booking.accessories.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return bikePrice + accessoriesTotal;
  };

  // Complete booking
  const completeBooking = async () => {
    setIsBookingComplete(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/book`,
        {
          booking,
        }
      );
    } catch (err) {
      console.log(err);
    }

    console.log("Booking completed:", booking);
  };

  // Reset booking form
  const resetBooking = () => {
    setBooking({
      fullName: "",
      address: "",
      email: "",
      phone: "",
      startDate: null,
      endDate: null,
      pickupLocation: "",
      dropoffLocation: "",
      fuelOption: "half",
      accessories: [],
      selectedBike: "",
    });
    setFormStep(1);
    setIsBookingComplete(false);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        formStep,
        isBookingComplete,
        updateBooking,
        addAccessory,
        removeAccessory,
        updateAccessoryQuantity,
        calculateTotal,
        calculateRentalDays,
        setFormStep,
        completeBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
