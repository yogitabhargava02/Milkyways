import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OOL5TSAxgNXmhmIfYlRrDdWLqFZph2uKvy9UOvLE4HvxquKbOZ7zWebPJrYWg5QzjNnpP5I0vnp6kYsMM1UXWP600y29t1nlN');

const Payment = () => {
  const [totalBill, setTotalBill] = useState(null);
  const [milkmanId, setMilkmanId] = useState("657d71baa8aa85513d6d3b48");
  const [customerId, setCustomerId] = useState("657d718ea8aa85513d6d3b40");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/milkman/calculateBill/${milkmanId}/${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Total Bill from API:', data.totalBill);

        setTotalBill(data.totalBill);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [customerId, milkmanId]);

  const handlePay = async () => {
    try {
      // Make an API call to initiate the payment session
      const paymentResponse = await fetch('http://localhost:3001/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [/* Your product data here */],
        }),
      });

      const paymentData = await paymentResponse.json();
      console.log('Payment Intent Client Secret from API:', paymentData.id);

      // Use the obtained Payment Intent Client Secret for Stripe payment confirmation
      // ... (your existing Stripe payment confirmation logic)

    } catch (error) {
      console.error('Error during payment initiation:', error);
    }
  };

  return (
    <div>
      <h1>Total Bill: {totalBill}</h1>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
};

export default Payment;
