import React, { useState, useEffect } from "react";
import { getAuthToken } from "./utils/Authtoken";
import CustomerRatings from "../graphs/CoustomerRatings";
import axios from "axios";

const AdminReview = () => {
  getAuthToken();
  const adminToken = localStorage.getItem("adminToken");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/reviews`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [adminToken]);

  const toggleApproval = async (reviewId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/data/reviews/${reviewId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? response.data : review
        )
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/data/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="w-[78vw] ml-[20vw] mt-20 p-6">
      <CustomerRatings />

      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Review Management
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={review.avatar}
                            alt={review.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {review.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {review.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => toggleApproval(review._id)}
                        className={`${
                          review.approved
                            ? "text-yellow-600 hover:text-yellow-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        {review.approved ? "Unapprove" : "Approve"}
                      </button>
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Review Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {selectedReview.name}
                  </h4>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < selectedReview.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  {new Date(selectedReview.createdAt).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-700">
                  {selectedReview.description}
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    toggleApproval(selectedReview._id);
                    setShowModal(false);
                  }}
                  className={`px-4 py-2 rounded-md ${
                    selectedReview.approved
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {selectedReview.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => {
                    deleteReview(selectedReview._id);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
