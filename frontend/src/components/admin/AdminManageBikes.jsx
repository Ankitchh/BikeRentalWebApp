import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminManageBikes = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminToken = localStorage.getItem("adminToken");
  console.log(adminToken);

  const [formData, setFormData] = useState({
    image: "",
    bikeModel: "",
    ratePerDay: "",
    rating: "",
    milage: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    bikeCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/addBike`, // Note the added /api/v1
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert("Bike added successfully!");
      setFormData({
        image: "",
        bikeModel: "",
        ratePerDay: "",
        rating: "",
        milage: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        bikeCount: "",
      });
    } catch (error) {
      console.error("Error adding bike:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Bike</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bikeModel">
            Bike Model
          </label>
          <input
            type="text"
            id="bikeModel"
            name="bikeModel"
            value={formData.bikeModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ratePerDay">
            Rate Per Day ($)
          </label>
          <input
            type="number"
            id="ratePerDay"
            name="ratePerDay"
            value={formData.ratePerDay}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="rating">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="milage">
            Mileage
          </label>
          <input
            type="text"
            id="milage"
            name="milage"
            value={formData.milage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="optionOne">
            Option 1
          </label>
          <input
            type="text"
            id="optionOne"
            name="optionOne"
            value={formData.optionOne}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="optionTwo">
            Option 2
          </label>
          <input
            type="text"
            id="optionTwo"
            name="optionTwo"
            value={formData.optionTwo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="optionThree">
            Option 3
          </label>
          <input
            type="text"
            id="optionThree"
            name="optionThree"
            value={formData.optionThree}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bikeCount">
            Bike Count
          </label>
          <input
            type="number"
            id="bikeCount"
            name="bikeCount"
            value={formData.bikeCount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Bike"}
        </button>
      </form>
    </div>
  );
};

export default AdminManageBikes;
