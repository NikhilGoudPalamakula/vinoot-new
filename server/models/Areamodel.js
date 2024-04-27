const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  StateName: String,
  state_id: String,
  CityName: String,
  name: String,
  city_id: String,
  area_id: {
    type: String,
    unique: true,
  },
});
const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
