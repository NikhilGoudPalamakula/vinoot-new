const User = require('../models/MasterAdminRegmodel');

// Controller to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateUserActiveState = async (req, res) => {
  const { id } = req.params;
  const { isActive, updatedBy } = req.body; // Updated by information
  try {
    // Update active state and updated by information
    await User.findByIdAndUpdate(id, { isActive, modifiedBy: updatedBy, modifiedAt: Date.now() });
    res.status(200).json({ message: 'User active state updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};