// const Area = require("../models/Areamodel");
// const City = require("../models/citymodel");

// exports.getAllAreas = async (req, res) => {
//   try {
//     const areas = await Area.find();
//     res.json(areas);
//   } catch (error) {
//     console.error("Failed to fetch areas", error);
//     res.status(500).json({ message: "Failed to fetch areas" });
//   }
// };

// exports.addArea = async (req, res) => {
//   const { cityId, areaName, city_id, area_id } = req.body;
//   try {
//     // Check if the provided cityId exists
//     const city = await City.findById(cityId);
//     if (!city) {
//       return res.status(404).json({ message: "City not found" });
//     }
//     // Check if the area already exists in the provided city
//     const existingArea = await Area.findOne({
//       cityId,
//       name: areaName,
//       area_id,
//     });
//     if (existingArea) {
//       return res
//         .status(400)
//         .json({ message: "Area already exists in this city" });
//     }

//     const newArea = new Area({
//       cityId,
//       StateName: city.StateName,
//       state_id: city.state_id,
//       CityName: city.name,
//       name: areaName,
//       city_id: city_id,
//       area_id: area_id,
//     });
//     await newArea.save();
//     res.status(201).json({ message: "Area added successfully" });
//   } catch (error) {
//     console.error("Failed to add Area", error);
//     res.status(500).json({ message: "Failed to add area" });
//   }
// };

const Area = require("../models/Areamodel");
const City = require("../models/citymodel");

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    console.error("Failed to fetch areas", error);
    res.status(500).json({ message: "Failed to fetch areas" });
  }
};

exports.addArea = async (req, res) => {
  const {
    cityId,
    areaName,
    city_id,
    area_id,
    modifiedBy,
    createdBy,
    createdAt,
    modifiedAt,
  } = req.body;
  try {
    // Check if the provided cityId exists
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    // Check if the area already exists in the provided city
    const existingArea = await Area.findOne({
      cityId,
      name: areaName,
      area_id,
    });
    if (existingArea) {
      return res
        .status(400)
        .json({ message: "Area already exists in this city" });
    }

    const newArea = new Area({
      cityId,
      StateName: city.StateName,
      state_id: city.state_id,
      CityName: city.name,
      name: areaName,
      city_id: city_id,
      area_id: area_id,
      modifiedBy,
      createdBy,
      createdAt,
      modifiedAt,
    });
    await newArea.save();
    res.status(201).json({ message: "Area added successfully" });
  } catch (error) {
    console.error("Failed to add Area", error);
    res.status(500).json({ message: "Failed to add area" });
  }
};
exports.toggleAreaStatus = async (req, res) => {
  const { areaId } = req.params;
  const { modifiedBy, status, modifiedAt } = req.body;
  try {
    // Validate request body fields
    if (!modifiedBy || !status || !modifiedAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update state status
    const updatedArea = await Area.findByIdAndUpdate(
      areaId,
      { modifiedBy, status, modifiedAt },
      { new: true }
    );

    if (!updatedArea) {
      return res.status(404).json({ message: "area not found" });
    }

    res.status(200).json({ message: "area status updated", updatedArea });
  } catch (error) {
    console.error("Error toggling area status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
