// Import necessary components and hooks
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import Register from './components/customer/Register';
import Login from './components/customer/Login';
import MilkmanLogin from './components/milkman/MilkmanLogin';
import MilkmanRegister from './components/milkman/MilkmanRegister';
import CustomerDashboard from './components/customer/customerDashboard';
import MilkmanProfile from './components/milkman/MilkmanProfile';
import AttendanceTracker from './components/calender/attendance';
import Payment from './pages/Payement';
import MilkmanDashboard from './components/milkman/milkmanDashboard';
// import NavBar from './components/shared/Navbar/Navbar';]
import About from "./pages/About/Aboutus";
const stripePromise = loadStripe('your_publishable_key');

function App() {
  return (

    <Router>
      {/* <NavBar/> */}
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clogin" element={<Login />} />
          <Route path="/cregister" element={<Register />} />
          <Route path="/customerDashboard" element={<CustomerDashboard />} />
          <Route path="/mlogin" element={<MilkmanLogin />} />
          <Route path="/mregister" element={<MilkmanRegister />} />
          <Route path="/milkmanProfile" element={<MilkmanProfile />} />
          <Route path="/milkman/markAttendance" element={<AttendanceTracker />} />
          <Route path="/milkman/milkmanDashboard" element={<MilkmanDashboard />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
