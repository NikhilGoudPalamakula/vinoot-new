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
