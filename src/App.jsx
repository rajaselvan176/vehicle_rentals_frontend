import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import MyBookings from "./pages/MyBookings";  // ✅ Import MyBookings page
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
    const userId = "60d21b4667d0d8992e610c85"; // Replace with actual user ID from authentication

    return (
        <>
            <Navbar />
            <Routes>
                {/* ✅ Main vehicle list */}
                <Route path="/" element={<VehicleList userId={userId} />} />

                {/* ✅ Alternate path for My Bookings */}
                <Route path="/bookings" element={<MyBookings userId={userId} />} />
                
                {/* Authentication Routes (Future use) */}
                {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> */}

                {/* Vehicle Details and Booking */}
                {/* <Route path="/vehicle/:id" element={<VehicleDetails />} />
                <Route path="/booking/:id" element={<BookingPage />} /> */}
            </Routes>
        </>
    );
}

export default App;
