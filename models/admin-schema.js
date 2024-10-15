const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Notice = new model("Notice", adminSchema);

module.exports = Notice;
