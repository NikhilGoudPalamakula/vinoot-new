// const City = require("../models/citymodel");
// const State = require("../models/Statemodel");

// exports.getAllCities = async (req, res) => {
//   try {
//     const cities = await City.find();
//     res.json(cities);
//   } catch (error) {
//     console.error("Failed to fetch cities", error);
//     res.status(500).json({ message: "Failed to fetch cities" });
//   }
// };

// exports.addCity = async (req, res) => {
//   const { stateId, city_id, cityName } = req.body;
//   try {
//     // Check if the provided stateId exists
//     const state = await State.findById(stateId);
//     if (!state) {
//       return res.status(404).json({ message: "State not found" });
//     }
//     // Check if the city already exists in the provided state
//     const existingCity = await City.findOne({
//       city_id,
//       name: cityName,
//     });
//     if (existingCity) {
//       return res
//         .status(400)
//         .json({ message: "City already exists in this state" });
//     }
//     // If city doesn't exist, add it to the database
//     const newCity = new City({
//       stateId,
//       StateName: state.name,
//       state_id: state.state_id, // Fetch and store the state_id from the state schema
//       name: cityName,
//       city_id: city_id,
//     });
//     await newCity.save();
//     res.status(201).json({ message: "City added successfully" });
//   } catch (error) {
//     console.error("Failed to add city", error);
//     res.status(500).json({ message: "Failed to add city" });
//   }
// };

const City = require("../models/citymodel");
const State = require("../models/Statemodel");

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    console.error("Failed to fetch cities", error);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

exports.addCity = async (req, res) => {
  const {
    stateId,
    city_id,
    cityName,
    modifiedBy,
    createdBy,
    createdAt,
    modifiedAt,
  } = req.body;
  try {
    // Check if the provided stateId exists
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    // Check if the city already exists in the provided state
    const existingCity = await City.findOne({
      city_id,
      name: cityName,
    });
    if (existingCity) {
      return res
        .status(400)
        .json({ message: "City already exists in this state" });
    }
    // If city doesn't exist, add it to the database
    const newCity = new City({
      stateId,
      StateName: state.name,
      state_id: state.state_id, // Fetch and store the state_id from the state schema
      name: cityName,
      city_id: city_id,
      modifiedBy,
      createdBy,
      createdAt,
      modifiedAt,
    });
    await newCity.save();
    res.status(201).json({ message: "City added successfully" });
  } catch (error) {
    console.error("Failed to add city", error);
    res.status(500).json({ message: "Failed to add city" });
  }
};
exports.toggleCityStatus = async (req, res) => {
  const { cityId } = req.params;

  const { modifiedBy, status, modifiedAt } = req.body;

  try {
    // Validate request body fields
    if (!modifiedBy || !status || !modifiedAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update state status
    const updatedCity = await City.findByIdAndUpdate(
      cityId,
      { modifiedBy, status, modifiedAt },
      { new: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ message: "city not found" });
    }

    res.status(200).json({ message: "city status updated", updatedCity });
  } catch (error) {
    console.error("Error toggling city status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
