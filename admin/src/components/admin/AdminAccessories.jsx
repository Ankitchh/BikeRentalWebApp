import { getAuthToken } from "./utils/Authtoken";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAccessories = () => {
  getAuthToken();
  const adminToken = localStorage.getItem("adminToken");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    image: "https://via.placeholder.com/300x200?text=Accessory+Image",
  });

  // Fetch accessories data
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/accessories`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
        setError("Failed to load accessories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, [adminToken]);

  const handleCardClick = (item) => {
    setSelectedItem({
      ...item,
      price: item.price.toString(), // Convert to string for input field
      stock: item.stock.toString(),
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setSelectedItem({
      id: null,
      name: "",
      price: "",
      stock: "",
      image: "https://via.placeholder.com/300x200?text=Accessory+Image",
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedItem((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...selectedItem,
        price: parseFloat(selectedItem.price),
        stock: parseInt(selectedItem.stock),
      };

      if (isEditing) {
        // Update existing accessory
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/admin/accessories/${
            selectedItem.id
          }`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setData((prev) =>
          prev.map((item) => (item.id === selectedItem.id ? payload : item))
        );
        setSuccess("Accessory updated successfully!");
      } else {
        // Add new accessory
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/admin/addAccessories`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setData((prev) => [...prev, response.data]);
        setSuccess("Accessory added successfully!");
      }

      setShowForm(false);
    } catch (error) {
      console.error("Error saving accessory:", error);
      setError(error.response?.data?.message || "Failed to save accessory");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/accessories/${selectedItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setData((prev) => prev.filter((item) => item.id !== selectedItem.id));
      setSuccess("Accessory deleted successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error deleting accessory:", error);
      setError(error.response?.data?.message || "Failed to delete accessory");
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6 w-[78vw] ml-[20vw]">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Accessories</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Accessory
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p>{success}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No accessories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="cursor-pointer border rounded-lg shadow-md hover:shadow-lg bg-white transition duration-200 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="text-xl font-semibold text-white">
                    {item.name}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Price:</span>
                  <span className="font-medium">₹{item.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Stock:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.stock > 5
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock} available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay with blur */}
            <div
              
              aria-hidden="true"
              onClick={() => setShowForm(false)}
            ></div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {isEditing ? "Update Accessory" : "Add New Accessory"}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Image Preview and Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedItem.image}
                        alt="Accessory preview"
                        className="w-full h-48 object-cover rounded-md mb-2"
                      />
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors">
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={selectedItem.name}
                      onChange={handleFormChange}
                      placeholder="Accessory name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Price Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={selectedItem.price}
                      onChange={handleFormChange}
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Stock Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={selectedItem.stock}
                      onChange={handleFormChange}
                      placeholder="Stock quantity"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    >
                      {isEditing ? "Update" : "Add"} Accessory
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-span-2 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccessories;
