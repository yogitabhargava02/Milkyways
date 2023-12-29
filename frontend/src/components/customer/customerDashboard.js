import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerDashboard = () => {
  const [nearbyMilkmen, setNearbyMilkmen] = useState([]);
  const [subscribedMilkmen, setSubscribedMilkmen] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchNearbyMilkmen = async () => {
      try {
        setLoading(true);
        const storedLongitude = localStorage.getItem('userLongitude');
        const storedLatitude = localStorage.getItem('userLatitude');

        if (storedLatitude && storedLongitude) {
          const response = await axios.get(`${backendUrl}customer/nearby`, {
            params: {
              longitude: parseFloat(storedLongitude),
              latitude: parseFloat(storedLatitude),
              maxDistance: 1000000,
            },
          });

          setNearbyMilkmen(response.data.nearbyMilkmen);
        } else {
          console.error('Latitude or longitude not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching nearby milkmen:', error);
        toast.error('Failed to fetch nearby milkmen. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyMilkmen();
  }, [backendUrl]);

  const handleCall = (phoneNumber) => {
    const telUri = `tel:${phoneNumber}`;
    window.location.href = telUri;
  };

  const handleSubscribe = async (milkmanId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login to add subscription.');
      Navigate('/clogin');
      return;
    }

    const customerId = localStorage.getItem('customerId');
    const startDate = new Date().toISOString();
    const Quantity = 2;

    setLoading(true);
    const response = await axios.post(`${backendUrl}customer/subscribe`, {
      customerId,
      milkmanId,
      startDate,
      Quantity,
    });

    if (response.data.message === 'Subscription successful') {
      setSubscribedMilkmen([...subscribedMilkmen, milkmanId]);

      // Display toast message for successful subscription
      toast.success('Subscription successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


      Navigate('/milkman/markAttendance');
    } else {
      console.error('Subscription failed:', response.data.message);
      toast.error(`Subscription failed: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error subscribing:', error);
    toast.error('Error subscribing. Please try again later.');
  } finally {
    setLoading(false);
  }
};

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
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaSignOutAlt size={24} />
            </button>
          )}
        </div>

        <h2 className="text-3xl font-semibold my-4">Nearby Milkmen</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyMilkmen.map((milkman) => (
            <div key={milkman._id} className="bg-white overflow-hidden shadow-md">
              <div className="p-2">
                <h3 className="text-lg font-semibold">{milkman.name}</h3>
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="text-gray-600">{milkman.mobileNumber}</p>
                <button
                  className={`mt-2 px-4 py-1 rounded-md text-sm transition duration-300 ${
                    subscribedMilkmen.includes(milkman._id)
                      ? 'bg-green-500 text-white hover:bg-green-600 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => handleSubscribe(milkman._id)}
                  disabled={subscribedMilkmen.includes(milkman._id)}
                >
                  {subscribedMilkmen.includes(milkman._id) ? 'Subscribed' : 'Subscribe'}
                </button>
                <p className="mt-1 text-xs">
                  {subscribedMilkmen.includes(milkman._id) ? 'Subscribed' : 'Not Subscribed'}
                </p>
              </div>
              <div className="p-2">
                <button
                  className={`bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition duration-300`}
                  onClick={() => handleCall("1234567890", milkman.name)}
                >
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default CustomerDashboard;
