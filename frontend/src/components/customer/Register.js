import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };


    getLocation();
  }, []);

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      name: '',
      address: '',
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      mobileNumber: Yup.string().required('Mobile Number is required'),
      name: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {

        if (!location || !location.latitude || !location.longitude) {

          throw new Error('Invalid coordinates provided.');
        }

        const registrationData = {
          ...values,
          location: {
            coordinates: [location.longitude, location.latitude],
            type: 'Point',
          },
        };

        console.log(registrationData);


        const response = await axios.post(`${backendUrl}customer/cregister`, registrationData);


        console.log('Registration successful!', response.data);


        const token = response.data.token;


        console.log('Token:', token);
        localStorage.setItem('token', token);

        toast.success('Registration successful!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        navigate('/clogin');

      } catch (error) {
        // Handle registration failure

        // Display an error message using toast
        toast.error('Registration failed. Please check your information.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.error('Registration failed:', error.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center signup">
      <div className="bg-white p-8 rounded shadow-md w-120">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
              className={`w-full p-2 border rounded ${formik.touched.mobileNumber && formik.errors.mobileNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your mobile number"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-red-500 text-sm">{formik.errors.mobileNumber}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
              placeholder="Choose a username"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
              placeholder="Choose a address"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
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
              className={`w-full p-2 border rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
          <Link to="/clogin" className="text-blue-500 hover:underline ml-4">
            Already registered? Login here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
