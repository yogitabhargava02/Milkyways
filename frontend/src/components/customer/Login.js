import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch user location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the user's location
          const latitude = position.coords.longitude;
          const longitude = position.coords.latitude;

          // Store latitude and longitude in local storage
          localStorage.setItem('userLatitude', longitude);
          localStorage.setItem('userLongitude', latitude);

          setUserLocation({
            coordinates: [longitude,latitude],
            type: 'Point',
          });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      password: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string().required('Mobile Number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Include the user's location in the request payload
        const payload = {
          ...values,
          location: userLocation,
        };

        const response = await axios.post(`${backendUrl}customer/clogin`, payload);
        const token = response.data.token;
        console.log(response);
        const customer = response.data.customerId; // Assuming this is how you get the customer ID
        console.log(customer);
        // Store customerId in local storage
        localStorage.setItem('customerId', customer);
        // Handle the token as needed (e.g., store it in localStorage)
        console.log('Login successful! Token:', token);
        localStorage.setItem('token', token);
        // Set llogin success state to true
        setLoginSuccess(true);

        // Display a success toast
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        // Navigate to /customerDashboard after successful login using the navigate function
        navigate('/customerDashboard');
      } catch (error) {
        console.error('Login failed:', error.response?.data?.error || error.message);

        // Display an error toast
        toast.error('Login failed. Please check your credentials.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
              placeholder="Enter your mobile number"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-red-500 text-sm">{formik.errors.mobileNumber}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-6 flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <Link to="/cregister" className="text-blue-500 hover:underline">
              Not registered? Register here
            </Link>
          </div>
        </form>
        <ToastContainer position="top-right" />
      </div>
      <div className="w-16" /> {/* Empty space on the right */}
    </div>
  );
};

export default Login;
