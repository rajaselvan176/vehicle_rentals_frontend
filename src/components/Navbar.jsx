import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">Vehicle Rental</Link>
                </h1>
                <div>
                    <Link to="/" className="mr-4 hover:text-gray-300">Home</Link>
                    <Link to="/bookings" className="mr-4 hover:text-gray-300">My Bookings</Link>
                    {/* <Link to="/login" className="hover:text-gray-300">Login</Link> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
