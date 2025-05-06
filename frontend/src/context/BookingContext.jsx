import React, { createContext, useState, useContext } from 'react';

// Create context
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    startDate: null,
    endDate: null,
    pickupLocation: '',
    dropoffLocation: '',
    fuelOption: 'half',
    accessories: []
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Update booking information
  const updateBooking = (field, value) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add accessory to booking
  const addAccessory = (accessory) => {
    const existing = booking.accessories.find(item => item.id === accessory.id);
    
    if (existing) {
      setBooking(prev => ({
        ...prev,
        accessories: prev.accessories.map(item => 
          item.id === accessory.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }));
    } else {
      setBooking(prev => ({
        ...prev,
        accessories: [...prev.accessories, { ...accessory, quantity: 1 }]
      }));
    }
  };

  // Remove accessory from booking
  const removeAccessory = (accessoryId) => {
    setBooking(prev => ({
      ...prev,
      accessories: prev.accessories.filter(item => item.id !== accessoryId)
    }));
  };

  // Update accessory quantity
  const updateAccessoryQuantity = (accessoryId, quantity) => {
    if (quantity <= 0) {
      removeAccessory(accessoryId);
      return;
    }
    
    setBooking(prev => ({
      ...prev,
      accessories: prev.accessories.map(item => 
        item.id === accessoryId 
          ? { ...item, quantity: quantity }
          : item
      )
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    const accessoriesTotal = booking.accessories.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
    
    // Base bike rental price would typically be calculated based on dates
    const basePrice = 50; // placeholder value
    
    return basePrice + accessoriesTotal;
  };

  // Complete booking
  const completeBooking = () => {
    setIsBookingComplete(true);
    // In a real app, this would send the booking to an API
    console.log('Booking completed:', booking);
  };

  // Reset booking form
  const resetBooking = () => {
    setBooking({
      fullName: '',
      address: '',
      email: '',
      phone: '',
      startDate: null,
      endDate: null,
      pickupLocation: '',
      dropoffLocation: '',
      fuelOption: 'half',
      accessories: []
    });
    setFormStep(1);
    setIsBookingComplete(false);
  };

  return (
    <BookingContext.Provider value={{
      booking,
      formStep,
      isBookingComplete,
      updateBooking,
      addAccessory,
      removeAccessory,
      updateAccessoryQuantity,
      calculateTotal,
      setFormStep,
      completeBooking,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};