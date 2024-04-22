const Admin = require('../models/FranchiseAdminmodel');

exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create admin.', error: error.message });
  }
};

// Similarly, you can have methods for updating, deleting, and fetching admins
