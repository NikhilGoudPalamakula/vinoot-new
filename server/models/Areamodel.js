// const mongoose = require("mongoose");

// const areaSchema = new mongoose.Schema({
//   stateId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "City",
//   },
//   StateName: String,
//   state_id: String,
//   CityName: String,
//   name: String,
//   city_id: String,
//   area_id: {
//     type: String,
//     unique: true,
//   },
// });
// const Area = mongoose.model("Area", areaSchema);

// module.exports = Area;

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
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  modifiedBy: { type: String, required: true },
  modifiedAt: { type: String, required: true  },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
});
const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
