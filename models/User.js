const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,      // for local login
  googleId: String,      // for Google login
  name: String,
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  }
});

module.exports = mongoose.model("User", userSchema);
