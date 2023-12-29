import React, { useState } from 'react';
import NavBar from '../components/shared/Navbar/Navbar';
import backgroundImage from '../assets/main.jpg';
import { useNavigate } from 'react-router-dom';
import "./home.css";
// import AttendanceTracker from '../components/calender/attendance';

const Home = () => {
  // const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearchNearbyMilkmen = () => {
    // Fetch the user's current location using geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        // Save the user's location to local storage
        localStorage.setItem('userLatitude', userLatitude);
        localStorage.setItem('userLongitude', userLongitude);

        // Use the fetched location for the search
        fetchNearbyMilkmen({ latitude: userLatitude, longitude: userLongitude });
      },
      (error) => {
        console.error('Error fetching user location:', error.message);
      }
    );
  };

  const fetchNearbyMilkmen = (location) => {
    // Call your backend API to get nearby milkmen based on the user's location
    // Update the API endpoint and parameters as per your backend implementation
    const backendUrl = process.env.REACT_APP_BACKEND_URL; // Replace with your actual backend URL

    // Example API call using fetch
    fetch(`${backendUrl}customer/nearby`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        maxDistance: 5000, // Example max distance in meters (5 km)
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/customerDashboard'); // Corrected typo here
        // Handle the fetched nearby milkmen data
        console.log('Nearby Milkmen:', data.nearbyMilkmen);
        // Update state or perform any other necessary actions
      })
      .catch((error) => {
        console.error('Error fetching nearby milkmen:', error);
      });
  };

  return (
    <div className="min-h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />

      <div className="flex flex-col items-center justify-center h-full text-blue ml-80">
        <h1 className="text-4xl font-bold mb-4 mt-60 text">Find Nearby Milkmen</h1>
        <button onClick={handleSearchNearbyMilkmen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text">
          Find Nearby Milkmen
        </button>
      </div>
    </div>
  );
};

export default Home;
