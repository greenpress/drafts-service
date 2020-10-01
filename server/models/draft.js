const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  contextType: {
    type: String,
    enum: ["Post", "Category", "Menu", "Block", "Comment", "Configuration"],
    required: true,
  },
  contextId: {
    type: String,
    required: false,
  },
  contextData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

module.exports = mongoose.model("Draft", DraftSchema);
