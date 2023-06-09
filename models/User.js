const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  age: Number,
  sports: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
