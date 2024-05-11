const User = require("../models/MasterAdminRegmodel");

// Controller to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.userId) {
      res.status(400).json({ error: "User ID already exists" });
    } else if (error.code === 11000 && error.keyPattern.phoneNumber) {
      res.status(400).json({ error: "Phone number already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, password });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (!user.isActive) {
      return res.status(400).json({ error: "User is not active" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateUserActiveState = async (req, res) => {
  const { id } = req.params;
  const { isActive, updatedBy, fullName, email, password } = req.body; // Updated by information
  try {
    // Update active state and updated by information
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      {
        isActive,
        modifiedBy: updatedBy,
        modifiedAt: Date.now(),
        fullName,
        email,
        password,
      },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: "User active state updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// const User = require('../models/MasterAdminRegmodel');

// exports.registerUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.updateUserActiveState = async (req, res) => {
//   const { id } = req.params;
//   const { isActive, updatedBy } = req.body;
//   try {
//     await User.findByIdAndUpdate(id, { isActive, activeChangedBy: updatedBy, activeChangedAt: Date.now() });
//     res.status(200).json({ message: 'User active state updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { fullName, username, email, phoneNumber, dateOfBirth, gender, userType } = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { fullName, username, email, phoneNumber, dateOfBirth, gender, userType },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndDelete(id);
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };
