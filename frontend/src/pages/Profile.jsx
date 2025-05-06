import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Edit2, Check, X, Upload } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

const Profile = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [editMode, setEditMode] = useState({
    fullName: false,
    email: false,
    phone: false,
    address: false,
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Set initial form data when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-neutral-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-neutral-600 mb-6">
            You need to be logged in to view your profile.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  // Toggle edit mode for a field
  const toggleEditMode = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    
    // Reset form data for this field if canceling edit
    if (editMode[field]) {
      setFormData(prev => ({
        ...prev,
        [field]: user[field] || ''
      }));
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save changes for a field
  const saveField = (field) => {
    // Validate email format
    if (field === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Validate phone format
    if (field === 'phone' && formData.phone && !/^\+?[0-9\s\-()]{8,20}$/.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    
    updateUser({ [field]: formData[field] });
    toggleEditMode(field);
  };
  
  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Mock upload process (in a real app, you'd upload to a server)
    setUploadingImage(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        updateUser({ profileImage: e.target.result });
        setUploadingImage(false);
      }, 1500); // Simulate network delay
    };
    reader.readAsDataURL(file);
  };
  
  // Booking history (mock data - would come from API in real app)
  const bookingHistory = [
    {
      id: 'ECO-123456',
      date: '2024-08-15',
      bikeType: 'City Cruiser',
      status: 'Completed',
      totalAmount: 75.00,
    },
    {
      id: 'ECO-789012',
      date: '2024-07-22',
      bikeType: 'Electric Bike',
      status: 'Completed',
      totalAmount: 120.00,
    },
    {
      id: 'ECO-345678',
      date: '2024-09-03',
      bikeType: 'Mountain Bike',
      status: 'Upcoming',
      totalAmount: 90.00,
    },
  ];
  
  return (
    <>
    <Header/>
    <div className="min-h-screen pt-20 pb-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8"
          >
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative group">
                  <img 
                    src={user.profileImage} 
                    alt={user.fullName}
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary-200" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-white mb-1" />
                      <span className="text-white text-sm">Change Photo</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full">
                      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-4">{user.fullName}</h2>
                <p className="text-neutral-500">Member since 2023</p>
              </div>
              
              {/* Profile Details */}
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-neutral-500">Full Name</label>
                      <button 
                        onClick={() => toggleEditMode('fullName')}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {editMode.fullName ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {editMode.fullName ? (
                      <div className="flex">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="input flex-grow"
                        />
                        <button 
                          onClick={() => saveField('fullName')}
                          className="ml-2 bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p>{user.fullName}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-neutral-500">Email</label>
                      <button 
                        onClick={() => toggleEditMode('email')}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {editMode.email ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {editMode.email ? (
                      <div className="flex">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input flex-grow"
                        />
                        <button 
                          onClick={() => saveField('email')}
                          className="ml-2 bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p>{user.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-neutral-500">Phone</label>
                      <button 
                        onClick={() => toggleEditMode('phone')}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {editMode.phone ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {editMode.phone ? (
                      <div className="flex">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input flex-grow"
                        />
                        <button 
                          onClick={() => saveField('phone')}
                          className="ml-2 bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p>{user.phone}</p>
                    )}
                  </div>
                  
                  {/* Address */}
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-neutral-500">Address</label>
                      <button 
                        onClick={() => toggleEditMode('address')}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {editMode.address ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {editMode.address ? (
                      <div className="flex">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="input flex-grow"
                        />
                        <button 
                          onClick={() => saveField('address')}
                          className="ml-2 bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p>{user.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Booking History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6">My Booking History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-neutral-200">
                    <th className="py-3 px-2">Booking ID</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Bike Type</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory.map((booking, index) => (
                    <tr key={booking.id} className={`border-b border-neutral-200 ${index % 2 === 0 ? 'bg-neutral-50' : ''}`}>
                      <td className="py-4 px-2 font-medium">{booking.id}</td>
                      <td className="py-4 px-2">{booking.date}</td>
                      <td className="py-4 px-2">{booking.bikeType}</td>
                      <td className="py-4 px-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 font-medium">${booking.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {bookingHistory.length === 0 && (
              <div className="text-center py-6">
                <p className="text-neutral-500">You haven't made any bookings yet.</p>
                <button className="btn btn-primary mt-4">Book Your First Ride</button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;