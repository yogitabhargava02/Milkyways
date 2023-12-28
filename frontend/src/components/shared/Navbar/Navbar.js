import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../../../assets/logo.png';

const NavBar = () => {
  return (
    <nav className="bg-opacity-90 backdrop-blur-md p-3">
      <div className="container mx-auto flex items-center justify-between">

        <div className="text-white font-bold text-xl">
          <img src={Login} alt="" style={{ width: "100px" }} />
          {/* <span className="text-yellow-500">Dairy</span> To Door */}
        </div>

        <div className="space-x-4">
          <Link to="/clogin" className="text-white hover:text-black-500 focus:outline-none">
            Login
          </Link>

          <button className="bg-white-500 text-black-800 px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            <Link to="/mlogin" className="text-white hover:text-white-500 focus:outline-none">
              Are you a milkman?
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
