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

exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.status(200).json({ success: true, franchises });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch franchises.', error: error.message });
  }
};

exports.toggleFranchiseStatus = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const franchise = await Franchise.findById(id);
    if (!franchise) {
      return res.status(404).json({ success: false, message: 'Franchise not found.' });
    }

    // Toggle the active/deactivate status
    franchise.isActive = !franchise.isActive;
    await franchise.save();

    res.status(200).json({ success: true, message: 'Franchise status updated successfully.', franchise });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update franchise status.', error: error.message });
  }
};


// Similarly, you can have methods for updating, deleting, and fetching franchises


