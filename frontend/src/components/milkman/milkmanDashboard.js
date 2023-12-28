import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AttendanceTracker from '../calender/attendance';
const MilkmanDashboard = () => {
  const [subscribedCustomers, setSubscribedCustomers] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const milkmanId = localStorage.getItem('milkmanId');

  useEffect(() => {
    const fetchSubscribedCustomers = async () => {
      try {
        const response = await axios.get(`${backendUrl}milkman/subscribed-customers/${milkmanId}`);

        setSubscribedCustomers(response.data.subscribedCustomers);
      } catch (error) {
        console.error('Error fetching subscribed customers:', error);
      }
    };

    fetchSubscribedCustomers();
  }, [backendUrl, milkmanId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <div className="flex justify-end space-x-4 mb-4">
          {token && (
            <Link to="/milkmanProfile">
              <button
                onClick={() => {
                  console.log('Profile clicked');
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaUser size={24} />
              </button>
            </Link>
          )}
          {token && (
            <button
              onClick={() => {
                console.log('Notification clicked');
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaBell size={24} />
            </button>
          )}
          {token && (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('milkmanId');
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaSignOutAlt size={24} />
            </button>
          )}
        </div>

        <h2 className="text-xl font-semibold my-4">Subscribed Customers</h2>
        <AttendanceTracker/>
        {subscribedCustomers.map((customer) => (
          <div key={customer._id} className="bg-white rounded-md overflow-hidden shadow-md">
            <div className="p-4">
              <h3 className="text-lg font-semibold">{customer.name}</h3>
            </div>
            <div className="mb-4 p-4">
              <h4 className="text-md font-semibold mb-2">Customer Details</h4>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phoneNumber}</p>
              {/* Add more details as needed */}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MilkmanDashboard;
