import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";

// Sample accessories data
const accessoriesData = [
  {
    id: 1,
    name: "Helmet",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1571819507488-0e1dfe7cc22d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Safety first! Our comfortable helmets provide protection during your ride.",
  },
  {
    id: 2,
    name: "Bike Lock",
    price: 3,
    image:
      "https://images.unsplash.com/photo-1664146158348-6a8c71ac62d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Secure your bike when you stop to explore with our heavy-duty locks.",
  },
  {
    id: 3,
    name: "Water Bottle",
    price: 2,
    image:
      "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Stay hydrated on your journey with our 24oz reusable water bottle.",
  },
  {
    id: 4,
    name: "Phone Mount",
    price: 4,
    image:
      "https://images.unsplash.com/photo-1622926491422-f5a3b10f87d4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Keep your phone accessible for navigation and photos with our secure mount.",
  },
  {
    id: 5,
    name: "Bike Lights",
    price: 6,
    image:
      "https://images.pexels.com/photos/1409969/pexels-photo-1409969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Front and rear LED lights for safety during evening rides.",
  },
  {
    id: 6,
    name: "Basket",
    price: 8,
    image:
      "https://images.pexels.com/photos/1127190/pexels-photo-1127190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Convenient storage for your belongings while you ride.",
  },
  {
    id: 7,
    name: "Bike Repair Kit",
    price: 10,
    image:
      "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Essential tools for basic repairs on the go.",
  },
  {
    id: 8,
    name: "Child Seat",
    price: 15,
    image:
      "https://images.pexels.com/photos/3705328/pexels-photo-3705328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Safe and comfortable seat for young riders to join your adventure.",
  },
];

const Accessories = () => {
  const {
    booking,
    addAccessory,
    removeAccessory,
    updateAccessoryQuantity,
    calculateTotal,
  } = useBooking();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Initialize quantities from booking
  React.useEffect(() => {
    const initialQuantities = {};
    booking.accessories.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [booking.accessories]);

  // Get quantity for an accessory
  const getQuantity = (accessoryId) => {
    return quantities[accessoryId] || 0;
  };

  // Increment quantity
  const incrementQuantity = (accessory) => {
    const currentQuantity = getQuantity(accessory.id);
    const newQuantity = currentQuantity + 1;

    setQuantities({
      ...quantities,
      [accessory.id]: newQuantity,
    });

    // If this is the first one, add to booking
    if (currentQuantity === 0) {
      addAccessory(accessory);
    } else {
      // Otherwise just update the quantity
      updateAccessoryQuantity(accessory.id, newQuantity);
    }
  };

  // Decrement quantity
  const decrementQuantity = (accessoryId) => {
    const currentQuantity = getQuantity(accessoryId);
    if (currentQuantity === 0) return;

    const newQuantity = currentQuantity - 1;

    setQuantities({
      ...quantities,
      [accessoryId]: newQuantity,
    });

    if (newQuantity === 0) {
      removeAccessory(accessoryId);
    } else {
      updateAccessoryQuantity(accessoryId, newQuantity);
    }
  };

  // Calculate total accessories in cart
  const totalItems = booking.accessories.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen pt-20 pb-20 bg-neutral-50">
      <div className="container mx-auto ">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start gap-8"
          >
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Bike Accessories</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {accessoriesData.map((accessory, index) => (
                  <motion.div
                    key={accessory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <img
                      src={accessory.image}
                      alt={accessory.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          {accessory.name}
                        </h3>
                        <span className="font-medium text-primary-600">
                          ${accessory.price}/day
                        </span>
                      </div>
                      <p className="text-neutral-600 text-sm mb-4">
                        {accessory.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => decrementQuantity(accessory.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              getQuantity(accessory.id) > 0
                                ? "bg-primary-100 text-primary-600 hover:bg-primary-200"
                                : "bg-neutral-100 text-neutral-400"
                            }`}
                            disabled={getQuantity(accessory.id) === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="mx-3 font-medium w-5 text-center">
                            {getQuantity(accessory.id)}
                          </span>
                          <button
                            onClick={() => incrementQuantity(accessory)}
                            className="w-8 h-8 bg-primary-100 text-primary-600 hover:bg-primary-200 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => incrementQuantity(accessory)}
                          className={`font-medium px-3 py-1 ml-2 rounded transition-colors text-xs ${
                            getQuantity(accessory.id) > 0
                              ? "bg-primary-500 text-white hover:bg-primary-600"
                              : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                          }`}
                        >
                          {getQuantity(accessory.id) > 0
                            ? "Add More"
                            : "Add to Booking"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full md:w-1/3 sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Your Selections
                  {totalItems > 0 && (
                    <span className="ml-2 bg-primary-100 text-primary-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </h3>

                {booking.accessories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-neutral-500 mb-4">Your cart is empty</p>
                    <p className="text-sm text-neutral-400">
                      Add some accessories to enhance your ride!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {booking.accessories.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b border-neutral-100 pb-3"
                        >
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="text-neutral-500 text-sm">
                              ${item.price} × {item.quantity}
                            </div>
                          </div>
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="text-lg font-bold text-primary-600">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
