import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const MilkmanDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customerData, setCustomerData] = useState({});
  const [error, setError] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSelectedDay = (selectedDay) => {
    // Handle the selected day
    console.log('Selected Day:', selectedDay);
    // You can update the state or perform other actions based on the selected day
  };

  useEffect(() => {
    // Fetch subscribed customers when the component mounts or when selectedDate changes
    const fetchSubscribedCustomers = async () => {
      try {
        const milkmanId = localStorage.getItem('milkman');
      
        const response = await axios.get(`${backendUrl}milkman/6581b1ab58927633cd9c831f/subscribedCustomers`);
        setCustomerData(response.data.customers);
      } catch (error) {
        setError('Error fetching subscribed customers.');
        console.error('Error fetching subscribed customers:', error.message);
      }
    };

    fetchSubscribedCustomers();
  }, [selectedDate]);

  return (
    <div className="min-screen flex items-center justify-center bg-[#fb7185]">
      {/* Use the whole page width */}
      <div className="w-screen w-screen p-2 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Milkman Dashboard</h1>
        <div className="mb-4">
          {/* Use the horizontal date picker */}
          <ReactHorizontalDatePicker
            selectedDay={onSelectedDay}
            enableScroll={true}
            enableDays={180}
            color={'#987876'}
          />
        </div>
        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Delivered orders for {selectedDate.toLocaleDateString()}
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="list-none p-0">
              {customerData && Object.entries(customerData).map(([customer, data]) => (
  <li
    key={customer}
    className="flex items-center justify-between p-2 border-b border-gray-300"
  >
    <span>{customer}</span>
    {data.deliveredDays &&
      data.deliveredDays.includes(selectedDate.toISOString().split('T')[0]) && (
        <span className="text-green-500">Delivered</span>
      )}
  </li>
))}

              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilkmanDashboard;
