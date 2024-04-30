// const Admin = require('../models/FranchiseAdminmodel');

// exports.createAdmin = async (req, res) => {
//   try {
//     const admin = new Admin(req.body);
//     await admin.save();
//     res.status(201).json({ success: true, message: 'Admin created successfully.' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create admin.', error: error.message });
//   }
// };


// exports.getAllFranchiseAmins = async (req, res) => {
//   try {
//     const users = await Admin.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.loginfranchiseUser = async (req, res) => {
//   const { Adminid, password } = req.body;
//   try {
//     const user = await Admin.findOne({ Adminid, password }).select('franchisename FranchiseID username');
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };




// exports.updateFranchiseAdminActiveState = async (req, res) => {
//   const { id } = req.params;
//   const { isActive, updatedBy } = req.body; // Updated by information
//   try {
//     // Update active state and updated by information
//     await Admin.findByIdAndUpdate(id, { isActive, modifiedBy: updatedBy, modifiedAt: Date.now() });
//     res.status(200).json({ message: 'User active state updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };



// // Similarly, you can have methods for updating, deleting, and fetching admins


// ------------------


// const FranchiseAdmin = require('../models/FranchiseAdminmodel');

// exports.createAdmin = async (req, res) => {
//   try {
//     const admin = new FranchiseAdmin(req.body);
//     await admin.save();
//     res.status(201).json({ success: true, message: 'Admin created successfully.' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create admin.', error: error.message });
//   }
// };


// exports.getAllFranchiseAmins = async (req, res) => {
//   try {
//     const users = await FranchiseAdmin.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.loginfranchiseUser = async (req, res) => {
//   const { Adminid, password } = req.body;
//   try {
//     const user = await FranchiseAdmin.findOne({ Adminid, password }).select('franchisename FranchiseID username');
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.updateFranchiseAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;
//     const updatedAdmin = await FranchiseAdmin.findByIdAndUpdate(id, updatedData, { new: true });
//     res.json(updatedAdmin);
//   } catch (error) {
//     console.error('Error updating admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.deleteAdmin = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await FranchiseAdmin.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting admin:', error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };



const FranchiseAdmin = require('../models/FranchiseAdminmodel');

exports.createAdmin = async (req, res) => {
  try {
    const admin = new FranchiseAdmin(req.body);
    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create admin.', error: error.message });
  }
};

exports.getAllFranchiseAmins = async (req, res) => {
  try {
    const users = await FranchiseAdmin.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.loginfranchiseUser = async (req, res) => {
  const { Adminid, password } = req.body;
  try {
    const user = await FranchiseAdmin.findOne({ Adminid, password }).select('franchisename FranchiseID username');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateFranchiseAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAdmin = await FranchiseAdmin.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await FranchiseAdmin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.getDoctors = async (req, res) => {
  try {
    const doctors = await FranchiseAdmin.find({ designation: "Doctor" }, 'fullName');
    const doctorNames = doctors.map(doctor => doctor.fullName);
    res.json(doctorNames);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};