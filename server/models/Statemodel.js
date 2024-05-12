// const mongoose = require("mongoose");

// const stateSchema = new mongoose.Schema({
//   name: String,
//   state_id: String,
// });
// const State = mongoose.model("State", stateSchema);

// module.exports = State;

const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state_id: {
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

const State = mongoose.model("State", stateSchema);

module.exports = State;
