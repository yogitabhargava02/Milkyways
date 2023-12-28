import React from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MilkmanProfile = () => {
  const formik = useFormik({
    initialValues: {
      name: 'John Doe',
      address: '123 Main St, City',
      mobileNumber: '123-456-7890',
      billingCharge: '',
    },
    onSubmit: (values) => {
      // Add logic to handle form submission (e.g., send data to the server)
      console.log('Form submitted with values:', values);
      toast.success('Profile updated successfully!');
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
   
      <div className="flex max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
      
        {/* Left Section - Profile Picture */}
        <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4 pt-2 pb-0">Profile</h2>
          <div className="p-8 pt-2">
            <div className="p-6">
              <div className="flex items-center justify-center">
                <img
                  className="h-32 w-32 rounded-full object-cover cursor-pointer"
                  src="https://via.placeholder.com/150" // Replace with the actual image source
                  alt="Profile"
                />
              </div>
              <div className="mt-6">
                <label htmlFor="profilePicture" className="block text-sm font-medium">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePicture"
                  name="profilePicture"
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Professional Information */}
        <div className="flex-grow p-8">
          <div className="p-6">
          
            {/* Editable fields */}
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="123 Main St, City"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="mobileNumber" className="block text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="123-456-7890"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="billingCharge" className="block text-sm font-medium flex justify-start">
                  Billing Charge
                </label>
                <input
                  type="text"
                  id="billingCharge"
                  name="billingCharge"
                  onChange={formik.handleChange}
                  value={formik.values.billingCharge}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter billing charge"
                />
              </div>
              {/* Add more fields as needed */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MilkmanProfile;
