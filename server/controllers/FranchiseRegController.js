const Franchise = require("../models/FranchiseRegModel");

exports.createFranchise = async (req, res) => {
  try {
    const franchise = new Franchise(req.body);
    // Check for unique franchiseId and email
    const existingFranchiseID = await Franchise.findOne({
      $or: [{ franchiseID: req.body.franchiseID }],
    });
    if (existingFranchiseID) {
      if (existingFranchiseID.franchiseID === req.body.franchiseID) {
        return res.status(400).json({ error: "franchiseID already exists" });
      }
    }
    await franchise.save();
    res
      .status(201)
      .json({ success: true, message: "Franchise created successfully." });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.franchiseID) {
      return res.status(400).json({ error: "franchiseID already exists" });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed create Franchise.",
        error: error.message,
      });
    }
  }
};

exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.status(200).json({ success: true, franchises });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch franchises.",
      error: error.message,
    });
  }
};

exports.toggleFranchiseStatus = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const franchise = await Franchise.findById(id);
    if (!franchise) {
      return res
        .status(404)
        .json({ success: false, message: "Franchise not found." });
    }

    // Toggle the active/deactivate status
    franchise.isActive = !franchise.isActive;
    franchise.modifiedAt = new Date();

    await franchise.save();

    res.status(200).json({
      success: true,
      message: "Franchise status updated successfully.",
      franchise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update franchise status.",
      error: error.message,
    });
  }
};
// Check if franchiseID already exists
exports.checkFranchiseID = async (req, res) => {
  try {
    const franchise = await Franchise.findOne({ franchiseID: req.params.franchiseID });
    res.json(franchise !== null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Similarly, you can have methods for updating, deleting, and fetching franchises
