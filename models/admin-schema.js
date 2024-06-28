const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Notice = new model('Notice', adminSchema);

module.exports = Notice;
