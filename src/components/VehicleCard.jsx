import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleCard = ({ vehicle, userId }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [existingBookings, setExistingBookings] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // ✅ Fetch existing bookings for this vehicle
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`https://vehicle-rentals-backend.onrender.com/api/bookings/${vehicle._id}`);
        setExistingBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [vehicle._id]);

  // ✅ Function to check if selected dates overlap with existing bookings
  const checkAvailability = () => {
    if (!startDate || !endDate) {
      setIsAvailable(true);
      return;
    }

    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);

    const isBooked = existingBookings.some((booking) => {
      const bookedStart = new Date(booking.startDate);
      const bookedEnd = new Date(booking.endDate);
      return selectedStart <= bookedEnd && selectedEnd >= bookedStart;
    });

    setIsAvailable(!isBooked);
  };

  // ✅ Run availability check whenever dates change
  useEffect(() => {
    checkAvailability();
  }, [startDate, endDate]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setMessage("❌ Please select valid dates.");
      return;
    }

    if (!isAvailable) {
      setMessage("🚫 Vehicle is already booked for these dates!");
      return;
    }

    try {
      await axios.post("https://vehicle-rentals-backend.onrender.com/api/bookings", {
        userId,
        vehicleId: vehicle._id,
        startDate,
        endDate,
        totalPrice:
          vehicle.pricePerDay *
          ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)),
      });

      setMessage("✅ Booking confirmed!");
    } catch (error) {
      setMessage("❌ Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={vehicle.images?.[0] || "https://via.placeholder.com/300"}
        alt={`${vehicle.make} ${vehicle.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
        <p className="text-gray-500">{vehicle.location}</p>
        <p className="text-green-600 font-bold">${vehicle.pricePerDay}/day</p>
        
        {/* Booking Form */}
        <button
          onClick={() => setShowBooking(!showBooking)}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {showBooking ? "Close" : "Book Now"}
        </button>

        {showBooking && (
          <div className="mt-4 p-4 border rounded">
            <label className="block mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <label className="block mb-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            {/* ✅ Show availability message */}
            <p className={`mt-2 ${isAvailable ? "text-green-500" : "text-red-500"}`}>
              {isAvailable ? "✅ Available" : "🚫 Not Available for selected dates"}
            </p>

            <button
              onClick={handleBooking}
              className={`mt-2 py-2 px-4 rounded-lg transition ${
                isAvailable ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isAvailable}
            >
              Confirm Booking
            </button>

            {message && <p className="mt-2 text-red-500">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
