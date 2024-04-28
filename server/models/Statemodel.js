const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: String,
  state_id: String,
});
const State = mongoose.model("State", stateSchema);

module.exports = State;
