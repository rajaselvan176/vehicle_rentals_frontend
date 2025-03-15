import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";

const VehicleList = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({ type: "", location: "", priceMin: 0, priceMax: 1000 });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/api/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (filters.type ? vehicle.type === filters.type : true) &&
      (filters.location ? vehicle.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      vehicle.pricePerDay >= filters.priceMin &&
      vehicle.pricePerDay <= filters.priceMax
    );
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Available Vehicles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} userId={userId} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
