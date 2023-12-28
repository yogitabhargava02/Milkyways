import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';

const AttendanceTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    [selectedDate.toISOString().split('T')[0]]: {
      customer1: false,
      customer2: false,
      // Add more customers as needed
    },
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleAttendance = (customer) => {
    if (selectedDate) {
      setAttendanceData((prevData) => ({
        ...prevData,
        [selectedDate.toISOString().split('T')[0]]: {
          ...prevData[selectedDate.toISOString().split('T')[0]],
          [customer]: !prevData[selectedDate.toISOString().split('T')[0]]?.[customer],
        },
      }));
    }
  };

  const onSelectedDay = (selectedDay) => {
    // Handle the selected day
    console.log('Selected Day:', selectedDay);
    // You can update the state or perform other actions based on the selected day
  };

  return (
    <div className="min-screen flex items-center justify-center bg-[#fb7185]">
    {/* Use the whole page width */}
    <div className="w-screen w-screen p-2 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Mark Attendance</h1>
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
            Attendance for {selectedDate.toLocaleDateString()}
          </h2>
          <ul className="list-none p-0">
            {Object.entries(attendanceData[selectedDate.toISOString().split('T')[0]]).map(
              ([customer, attended]) => (
                <li
                  key={customer}
                  className="flex items-center justify-between p-2 border-b border-gray-300"
                  onClick={() => toggleAttendance(customer)}
                >
                  <span>{customer}</span>
                  {attended && <span className="text-green-500">✔</span>}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  </div>
);
};

export default AttendanceTracker;