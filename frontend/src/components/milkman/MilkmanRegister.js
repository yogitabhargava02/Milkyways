import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MilkmanRegister = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
   
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude,latitude} = position.coords;
            setLocation({ longitude, latitude });
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
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string().required('Mobile Number is required'),
      name: Yup.string().required('name is required'),
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
       
        // Make API call to register endpoint
        const response = await axios.post(`http://localhost:3001/api/milkman/mregister`, registrationData);

      
         
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
    
      navigate('/mlogin');
    
      } catch (error) {
       
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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              className={`w-full p-2 border rounded ${formik.touched.mobileNumber && formik.errors.mobileNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your mobile number"
              {...formik.getFieldProps('mobileNumber')}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-red-500 text-sm">{formik.errors.mobileNumber}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-2 border rounded ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
              placeholder="Choose a name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
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
              className={`w-full p-2 border rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
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
              className={`w-full p-2 border rounded ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default MilkmanRegister;
