const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PicSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

module.exports = mongoose.model("Picture", PicSchema);
