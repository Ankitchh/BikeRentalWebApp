import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Fuel, Plus } from 'lucide-react';
import Modal from './Modal';

const BookingForm = () => {
  const { booking, updateBooking, formStep, setFormStep, completeBooking, calculateTotal } = useBooking();
  const { user } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  // Pre-fill form with user data if logged in
  React.useEffect(() => {
    if (user) {
      updateBooking('fullName', user.fullName || '');
      updateBooking('email', user.email || '');
      updateBooking('phone', user.phone || '');
      updateBooking('address', user.address || '');
    }
  }, [user, updateBooking]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Step 1 validation
    if (formStep === 1) {
      if (!booking.fullName) newErrors.fullName = 'Full name is required';
      if (!booking.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(booking.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!booking.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(booking.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
      if (!booking.address) newErrors.address = 'Address is required';
    }
    
    // Step 2 validation
    if (formStep === 2) {
      if (!booking.startDate) newErrors.startDate = 'Start date is required';
      if (!booking.endDate) newErrors.endDate = 'End date is required';
      if (booking.startDate && booking.endDate && new Date(booking.startDate) > new Date(booking.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
      if (!booking.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
      if (!booking.dropoffLocation) newErrors.dropoffLocation = 'Drop-off location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setFormStep(formStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      completeBooking();
      setShowSuccessModal(true);
    }
  };

  // Navigate to accessories page
  const goToAccessories = () => {
    navigate('/accessories');
  };

  // Form content based on current step
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Personal Information</h3>
            
            <div>
              <label htmlFor="fullName" className="label">Full Name</label>
              <input
                type="text"
                id="fullName"
                className={`input ${errors.fullName ? 'border-red-500' : ''}`}
                value={booking.fullName}
                onChange={(e) => updateBooking('fullName', e.target.value)}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            
            <div>
              <label htmlFor="address" className="label">Address</label>
              <input
                type="text"
                id="address"
                className={`input ${errors.address ? 'border-red-500' : ''}`}
                value={booking.address}
                onChange={(e) => updateBooking('address', e.target.value)}
                placeholder="123 Main St, City, Country"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                className={`input ${errors.email ? 'border-red-500' : ''}`}
                value={booking.email}
                onChange={(e) => updateBooking('email', e.target.value)}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className={`input ${errors.phone ? 'border-red-500' : ''}`}
                value={booking.phone}
                onChange={(e) => updateBooking('phone', e.target.value)}
                placeholder="+1 (234) 567-890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary w-full"
              >
                Continue to Booking Details
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Booking Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="label">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    className={`input pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                    value={booking.startDate || ''}
                    onChange={(e) => updateBooking('startDate', e.target.value)}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                </div>
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              
              <div>
                <label htmlFor="endDate" className="label">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    className={`input pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                    value={booking.endDate || ''}
                    onChange={(e) => updateBooking('endDate', e.target.value)}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                </div>
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="pickupLocation" className="label">Pickup Location</label>
              <div className="relative">
                <select
                  id="pickupLocation"
                  className={`input pl-10 ${errors.pickupLocation ? 'border-red-500' : ''}`}
                  value={booking.pickupLocation}
                  onChange={(e) => updateBooking('pickupLocation', e.target.value)}
                >
                  <option value="">Select pickup location</option>
                  <option value="downtown">Downtown Store</option>
                  <option value="north">North Side Location</option>
                  <option value="south">South Side Location</option>
                  <option value="airport">Airport</option>
                </select>
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
              </div>
              {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
            </div>
            
            <div>
              <label htmlFor="dropoffLocation" className="label">Drop-off Location</label>
              <div className="relative">
                <select
                  id="dropoffLocation"
                  className={`input pl-10 ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                  value={booking.dropoffLocation}
                  onChange={(e) => updateBooking('dropoffLocation', e.target.value)}
                >
                  <option value="">Select drop-off location</option>
                  <option value="downtown">Downtown Store</option>
                  <option value="north">North Side Location</option>
                  <option value="south">South Side Location</option>
                  <option value="airport">Airport</option>
                </select>
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
              </div>
              {errors.dropoffLocation && <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>}
            </div>
            
            <div>
              <label className="label">Fuel Option</label>
              <div className="flex items-center space-x-6 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fuelHalf"
                    name="fuelOption"
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    value="half"
                    checked={booking.fuelOption === 'half'}
                    onChange={() => updateBooking('fuelOption', 'half')}
                  />
                  <label htmlFor="fuelHalf" className="ml-2 text-neutral-700">
                    Half Tank
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fuelFull"
                    name="fuelOption"
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    value="full"
                    checked={booking.fuelOption === 'full'}
                    onChange={() => updateBooking('fuelOption', 'full')}
                  />
                  <label htmlFor="fuelFull" className="ml-2 text-neutral-700">
                    Full Tank
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="button"
                onClick={goToAccessories}
                className="btn btn-outline flex items-center justify-center w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Accessories
              </button>
            </div>
            
            {booking.accessories.length > 0 && (
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Selected Accessories:</h4>
                <ul className="space-y-2">
                  {booking.accessories.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Complete Booking
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto"
      >
        {/* Progress steps */}
        <div className="flex mb-8">
          <div className="flex-1">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
              1
            </div>
            <p className="text-sm text-center mt-2">Personal Info</p>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-16 -left-full h-0.5 bg-neutral-200">
              <div className={`h-full bg-primary-500 transition-all duration-300 ${formStep >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
              2
            </div>
            <p className="text-sm text-center mt-2">Booking Details</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderFormStep()}
        </form>
      </motion.div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-neutral-600 mb-6">
              Your bike rental has been successfully booked. You will receive a confirmation email shortly.
            </p>
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-500">Booking ID:</span>
                <span className="font-medium">ECO-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-500">Start Date:</span>
                <span className="font-medium">{booking.startDate}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-500">End Date:</span>
                <span className="font-medium">{booking.endDate}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-500">Total:</span>
                <span className="font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/');
              }}
              className="btn btn-primary w-full"
            >
              Return to Homepage
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookingForm;