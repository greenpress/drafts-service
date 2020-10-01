const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Post",
  },
  contents: {
    type: [String],
  },
  thumbnail: {
    type: String,
    index: true,
  },
});

DraftSchema.statics.saveAsPost = function () {
  // need help
};

module.exports = mongoose.model("Draft", DraftSchema);
