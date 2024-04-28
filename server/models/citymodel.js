const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  StateName: String,
  state_id: String,
  name: String,
  city_id: String,
});
const City = mongoose.model("City", citySchema);

module.exports = City;
