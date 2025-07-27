import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ city, setCity, fetchWeather }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="p-5 flex justify-between items-center text-[20px] font-mono bg-black text-white relative z-50">
      <h1 className="text-white font-bold">HOME</h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-black px-2 py-1 rounded bg-white placeholder:text-gray-500 "
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 font-semibold cursor-pointer transition duration-75"
        >
          Search
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="hidden md:block hover:text-gray-400 hover:scale-105 transition cursor-pointer font-bold"
      >
        Logout
      </button>

      {/* Mobile Menu */}
      <button
        className="block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-black p-6 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-white absolute top-5 right-5"
        >
          <X size={24} />
        </button>

        <div className="mt-20 flex flex-col space-y-4 font-bold">
          <button
            onClick={handleLogout}
            className="text-white text-lg hover:text-gray-400 transition font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
