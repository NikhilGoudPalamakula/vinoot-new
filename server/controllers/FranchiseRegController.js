const Franchise = require('../models/FranchiseRegModel');

exports.createFranchise = async (req, res) => {
  try {
    const franchise = new Franchise(req.body);
    await franchise.save();
    res.status(201).json({ success: true, message: 'Franchise created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create franchise.', error: error.message });
  }
};

// Similarly, you can have methods for updating, deleting, and fetching franchises
