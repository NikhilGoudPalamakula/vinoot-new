const Billing = require('../models/BillingModel');

exports.createBilling = async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
};



exports.fetchBillingData = async (req, res) => {
    try {

      const frid = req.params.frid;
      const billingData = await Billing.find({ FranchiseID: frid });
      res.json(billingData);

    } catch (error) {
      console.error('Error fetching billing data:', error);
      res.status(500).json({ error: 'An error occurred while fetching billing data' });
    }
  };


  exports.fetchBillingDatafrosuperadmin = async (req, res) => {
    try {
      const billingData = await Billing.find();
      res.json(billingData);
    } catch (error) {
      console.error('Error fetching billing data:', error);
      res.status(500).json({ error: 'An error occurred while fetching billing data' });
    }
  };