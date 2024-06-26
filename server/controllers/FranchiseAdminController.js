// const Admin = require("../models/FranchiseAdminmodel");
// const FranchiseRegModel = require("../models/FranchiseRegModel");

// exports.createAdmin = async (req, res) => {
//   try {
//     const admin = new Admin(req.body);

//     // Check for unique userId and email
//     const existingAdmin = await Admin.findOne({
//       $or: [{ userId: req.body.userId }, { email: req.body.email }],
//     });

//     if (existingAdmin) {
//       if (existingAdmin.userId === req.body.userId) {
//         return res
//           .status(400)
//           .json({ error: "Admin with this User ID already exists" });
//       } else if (existingAdmin.email === req.body.email) {
//         return res
//           .status(400)
//           .json({ error: "Admin with this email already exists" });
//       }
//     }

//     await admin.save();
//     res
//       .status(201)
//       .json({ success: true, message: "Admin created successfully." });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create admin.",
//       error: error.message,
//     });
//   }
// };

// exports.getAllFranchiseAmins = async (req, res) => {
//   try {
//     const users = await Admin.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// exports.getExceptAllFranchiseAmins = async (req, res) => {
//   try {
//     const frid = req.params.frid;
//     const users = await Admin.find({ FranchiseID: frid });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// exports.loginfranchiseUser = async (req, res) => {
//   const { userId, password } = req.body;
//   try {
//     // Find the user in the FranchiseAdmin model
//     const user = await Admin.findOne({ userId });
//     const userdata = await Admin.findOne({ userId, password }).select(
//       "franchisename FranchiseID userId designation"
//     );

//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Check if the password matches
//     if (user.password !== password) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Check if the user is active
//     if (!user.isActive) {
//       return res.status(400).json({ error: "User is not active" });
//     }

//     // Get the FranchiseID from the user
//     const franchiseIDOne = user.franchiseID;

//     // Find the corresponding franchise in the FranchiseRegModel
//     const franchise = await FranchiseRegModel.findOne({
//       franchiseID: franchiseIDOne,
//     });

//     if (!franchise) {
//       return res.status(400).json({ error: "Franchise not found" });
//     }

//     // Check if the franchise is active
//     if (!franchise.isActive) {
//       return res.status(400).json({ error: "Franchise is not active" });
//     }

//     // If everything is successful, return success message
//     res.status(200).json(userdata);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// exports.updateFranchiseAdminActiveState = async (req, res) => {
//   const { id } = req.params;
//   const { isActive, updatedBy } = req.body; // Updated by information
//   try {
//     // Update active state and updated by information
//     await Admin.findByIdAndUpdate(id, {
//       isActive,
//       modifiedBy: updatedBy,
//       modifiedAt: Date.now(),
//     });
//     res.status(200).json({ message: "User active state updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Admin.find({ designation: "Doctor" });
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getFranchiseAdminsByFranchiseName = async (req, res) => {
//   try {
//     const { franchisename } = req.params;
//     const franchise = await FranchiseRegModel.findOne({ franchisename });
//     if (!franchise) {
//       return res.status(404).json({ error: "Franchise not found" });
//     }
//     const franchiseID = franchise.franchiseID;
//     const users = await Admin.find({ FranchiseID: franchiseID });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

const Admin = require("../models/FranchiseAdminmodel");
const FranchiseRegModel = require("../models/FranchiseRegModel");

exports.createAdmin = async (req, res) => {
  try {
    // Check if the userID already exists
    const existingAdmin = await Admin.findOne({ userId: req.body.userId });
    if (existingAdmin) {
      return res.status(400).json({ error: "User ID already exists" });
    }

    const admin = new Admin(req.body);

    await admin.save();
    res
      .status(201)
      .json({ success: true, message: "Admin created successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create admin.",
      error: error.message,
    });
  }
};

exports.getAllFranchiseAmins = async (req, res) => {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getExceptAllFranchiseAmins = async (req, res) => {
  try {
    const frid = req.params.frid;
    const users = await Admin.find({ franchiseID: frid });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.loginfranchiseUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    // Find the user in the FranchiseAdmin model
    const user = await Admin.findOne({ userId });
    const userdata = await Admin.findOne({ userId, password }).select(
      "franchisename franchiseID userId designation"
    );

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ error: "Password Doesn't Match" });
    }

    // if (!user && user.password !== password){
    //   return res.status(400).json({ error: "Invalid Credentials" });
    // }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(400).json({ error: "User is not active" });
    }

    // Get the FranchiseID from the user
    const franchiseIDOne = user.franchiseID;

    // Find the corresponding franchise in the FranchiseRegModel
    const franchise = await FranchiseRegModel.findOne({
      franchiseID: franchiseIDOne,
    });

    if (!franchise) {
      return res.status(400).json({ error: "Franchise not found" });
    }

    // Check if the franchise is active
    if (!franchise.isActive) {
      return res.status(400).json({ error: "Franchise is not active" });
    }

    // If everything is successful, return success message
    res.status(200).json(userdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateFranchiseAdminActiveState = async (req, res) => {
  const { id } = req.params;
  const { isActive, updatedBy, fullname, password, designation, mobileNumber } =
    req.body; // Updated by information
  try {
    // Update active state and updated by information
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        isActive,
        modifiedBy: updatedBy,
        modifiedAt: Date.now(),
        fullname,
        designation,
        password,
        mobileNumber,
      },
      { new: true } // Set { new: true } to return the updated document
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

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Admin.find({ designation: "Doctor" });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFranchiseAdminsByFranchiseID = async (req, res) => {
  try {
    const { franchiseID } = req.params;
    const franchise = await FranchiseRegModel.findOne({ franchiseID });
    if (!franchise) {
      return res.status(404).json({ error: "Franchise not found" });
    }
    const FranchiseID = franchise.franchiseID;
    const users = await Admin.find({ franchiseID: FranchiseID });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateFranchiseAdminActiveStatepart2 = async (req, res) => {
  const { id } = req.params;
  const { isActive, updatedBy } = req.body; // Updated by information
  try {
    // Update active state and updated by information
    await Admin.findByIdAndUpdate(id, {
      isActive,
      modifiedBy: updatedBy,
      modifiedAt: new Date().toLocaleString(),
    });
    res.status(200).json({ message: "User active state updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Check if userID already exists
exports.checkUserID = async (req, res) => {
  try {
    const admin = await Admin.findOne({ userId: req.params.userId });
    res.json(admin !== null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
