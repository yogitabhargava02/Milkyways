function viewDeliveryHistory(subscribedCustomers) {
    const deliveryHistory = subscribedCustomers
      .filter(subscription => subscription.delivered)
      .map(subscription => ({
        customer: subscription.customer,
        deliveryDate: subscription.deliveryDate,
        // Add other relevant delivery details as needed
      }));
  
    return deliveryHistory;
  }
  