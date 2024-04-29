// const State = require("../models/Statemodel");

// exports.getAllStates = async (req, res) => {
//   try {
//     const states = await State.find();
//     res.json(states);
//   } catch (error) {
//     console.error("Failed to fetch states", error);
//     res.status(500).json({ message: "Failed to fetch states" });
//   }
// };

// exports.addState = async (req, res) => {
//   const { state_id, name } = req.body;
//   const existingState = await State.findOne({ name });
//   if (existingState) {
//     return res.status(400).json({ message: "State already exists" });
//   }
//   try {
//     const newState = new State({ state_id, name });
//     await newState.save();
//     res.status(201).json({ message: "State added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add state" });
//   }
// };

// // exports.suggeststates = async (req, res) => {
// //     const { query } = req.query; // Get the query parameter from the request
// //     if (query) {
// //       const suggestions = await State.find({
// //         states: { $regex: query, $options: "i" }, // Case-insensitive regex match
// //       }).limit(10); // Limit to a reasonable number of suggestions
  
// //       res.json(suggestions);
// //     } else {
// //       res.json([]); // Return empty array if no query
// //     }
// //   };



// // In the suggeststates controller function
// exports.suggeststates = async (req, res) => {
//   const { query } = req.query; // Get the query parameter from the request
//   if (query) {
//     try {
//       const suggestions = await State.find({
//         name: { $regex: query, $options: "i" }, // Filter states by name
//       }).limit(10); // Limit to a reasonable number of suggestions

//       res.json(suggestions);
//     } catch (error) {
//       console.error('Error fetching state suggestions:', error);
//       res.status(500).json({ message: "Failed to fetch state suggestions" });
//     }
//   } else {
//     res.json([]); // Return empty array if no query
//   }
// };



const State = require("../models/Statemodel");

exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    console.error("Failed to fetch states", error);
    res.status(500).json({ message: "Failed to fetch states" });
  }
};

exports.addState = async (req, res) => {
  const { state_id, name } = req.body;
  const existingState = await State.findOne({ name });
  if (existingState) {
    return res.status(400).json({ message: "State already exists" });
  }
  try {
    const newState = new State({ state_id, name });
    await newState.save();
    res.status(201).json({ message: "State added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add state" });
  }
};
// controllers/StateController.js
exports.toggleStateStatus = async (req, res) => {
  const { stateId } = req.params;
  try {
    const state = await State.findById(stateId); // Use findById instead of findOne
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    // Toggle the status
    state.status = state.status === "active" ? "inactive" : "active";
    await state.save();

    res.json({ message: "State status updated successfully", state });
  } catch (error) {
    console.error("Failed to toggle state status", error);
    res.status(500).json({ message: "Failed to toggle state status" });
  }
};

// exports.suggeststates = async (req, res) => {
//     const { query } = req.query; // Get the query parameter from the request
//     if (query) {
//       const suggestions = await State.find({
//         states: { $regex: query, $options: "i" }, // Case-insensitive regex match
//       }).limit(10); // Limit to a reasonable number of suggestions

//       res.json(suggestions);
//     } else {
//       res.json([]); // Return empty array if no query
//     }
//   };

// In the suggeststates controller function
exports.suggeststates = async (req, res) => {
  const { query } = req.query; // Get the query parameter from the request
  if (query) {
    try {
      const suggestions = await State.find({
        name: { $regex: query, $options: "i" }, // Filter states by name
      }).limit(10); // Limit to a reasonable number of suggestions

      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching state suggestions:", error);
      res.status(500).json({ message: "Failed to fetch state suggestions" });
    }
  } else {
    res.json([]); // Return empty array if no query
  }
};

