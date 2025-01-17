const { Schema, model } = require("mongoose");
const { url, image } = require("../config/cloudinary");

const adminSchema = new Schema(
  {
    desc: {
      type: String,
      default: "",
    },
    Image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Notice = new model("Notice", adminSchema);

module.exports = Notice;
