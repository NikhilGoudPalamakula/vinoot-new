// const mongoose = require("mongoose");

// const citySchema = new mongoose.Schema({
//   StateName: String,
//   state_id: String,
//   name: String,
//   city_id: String,
// });
// const City = mongoose.model("City", citySchema);

// module.exports = City;

const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  StateName: {
    type: String,
    required: true,
  },
  state_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  modifiedBy: { type: String, required: true },
  modifiedAt: { type: String, required: true  },
  createdAt: { type: String, required: true  },
  createdBy: { type: String, required: true },
});
const City = mongoose.model("City", citySchema);

module.exports = City;
