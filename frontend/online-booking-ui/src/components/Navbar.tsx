import { useState } from "react";
import { Link } from "react-router";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-left">
          Online Bookings
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/new-booking" className="hover:text-white">
            New Booking
          </Link>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-500 text-white shadow-md py-3">
          <Link to="/about" className="block px-4 py-2 hover:bg-blue-400">
            New Booking
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;