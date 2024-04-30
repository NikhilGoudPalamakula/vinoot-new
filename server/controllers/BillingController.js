const Billing = require('../models/BillingModel');

exports.createBilling = async (req, res) => {
    try {
        const { doctor, planName, paymentType, amountPaid, status, gst, price,remainingAmount } = req.body;
        const newBilling = new Billing({
            doctor,
            planName,
            paymentType,
            amountPaid,
            remainingAmount,
            status,
            gst,
            price
        });
        await newBilling.save();
        res.status(201).json({ message: 'Billing data saved successfully' });
    } catch (error) {
        console.error('Error saving billing data:', error);
        res.status(500).json({ error: 'An error occurred while saving billing data' });
    }
};



exports.fetchBillingData = async (req, res) => {
    try {
      const billingData = await Billing.find();
      res.json(billingData);
    } catch (error) {
      console.error('Error fetching billing data:', error);
      res.status(500).json({ error: 'An error occurred while fetching billing data' });
    }
  };