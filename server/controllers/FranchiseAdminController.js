const Admin = require('../models/FranchiseAdminmodel');
const franchiseActive = require('../models/FranchiseAdminmodel');

exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);

    // Check for unique userId and email
    const existingAdmin = await Admin.findOne({ $or: [{ userId: req.body.userId }, { email: req.body.email }] });

    if (existingAdmin) {
      if (existingAdmin.userId === req.body.userId) {
        return res.status(400).json({ error: 'Admin with this User ID already exists' });
      } else if (existingAdmin.email === req.body.email) {
        return res.status(400).json({ error: 'Admin with this email already exists' });
      }
    }

    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create admin.', error: error.message });
  }
};


exports.getAllFranchiseAmins = async (req, res) => {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.getExceptAllFranchiseAmins = async (req, res) => {
  try {
    const frid = req.params.frid;
    const users = await Admin.find({ FranchiseID: frid });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.loginfranchiseUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await Admin.findOne({ userId, password }).select('franchisename FranchiseID userId designation');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};




exports.updateFranchiseAdminActiveState = async (req, res) => {
  const { id } = req.params;
  const { isActive, updatedBy } = req.body; // Updated by information
  try {
    // Update active state and updated by information
    await Admin.findByIdAndUpdate(id, { isActive, modifiedBy: updatedBy, modifiedAt: Date.now() });
    res.status(200).json({ message: 'User active state updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.getDoctors = async (req, res) => {
  try {
      const doctors = await Admin.find({ designation: 'Doctor' });
      res.json(doctors);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};