import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="border p-4 my-2">
            <p><strong>Vehicle:</strong> {booking.vehicle.make} {booking.vehicle.model}</p>
            <p><strong>Dates:</strong> {new Date(booking.startDate).toDateString()} - {new Date(booking.endDate).toDateString()}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <button
              className="bg-red-500 text-white p-2 mt-2 rounded"
              onClick={async () => {
                await axios.delete(`/api/bookings/${booking.vehicle._id}/${booking._id}`);
                setBookings(bookings.filter(b => b._id !== booking._id));
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
