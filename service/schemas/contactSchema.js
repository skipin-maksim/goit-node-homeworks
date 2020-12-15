const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 70,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
