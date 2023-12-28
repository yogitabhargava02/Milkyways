import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
       
        <div className="text-white font-bold text-xl">
          <span className="text-yellow-500">Milk</span> Delivery
        </div>

        <div className="space-x-4">
          <Link to="/clogin" className="text-pink bg-green hover:text-yellow-500 focus:outline-none">
            Login
          </Link>

          <button className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none">
          <Link to="/mlogin" className="text-white hover:text-yellow-500 focus:outline-none">
          Are you a milkman?
          </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
