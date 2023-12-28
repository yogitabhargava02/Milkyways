
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { markedDays } = req.body;

   
    const totalAmount = calculateTotalAmount(markedDays);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: totalAmount * 100,
          },
          quantity: 1, 
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const calculateTotalAmount = (markedDays) => {
  
  const pricePerMarkedDay = 10;
  return markedDays * pricePerMarkedDay;
};

module.exports = {
  createCheckoutSession,
};
