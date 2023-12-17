function calculateBill(subscribedCustomers) {
    const billingRate = 10; // Example: $10 per delivered day
    let totalBill = 0;
  
    subscribedCustomers.forEach((subscription) => {
      // Check if the delivery was marked as delivered
      if (subscription.delivered) {
        // Calculate the number of days between the start date and today
        const startDate = new Date(subscription.startDate);
        const today = new Date();
        const daysSubscribed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  
        // Accumulate the bill
        totalBill += daysSubscribed * billingRate;
      }
    });
  
    return totalBill;
  }
  