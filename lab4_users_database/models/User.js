const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, minlength: 4 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(value) {
        return validator.isEmail(value); // ✅ Proper email validation
      },
      message: "Invalid email format"
    }
  },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { 
      type: String, 
      required: true, 
      validate: {
        validator: function (value) {
          return /^[A-Za-z\s]+$/.test(value);
        },
        message: "City name must contain only alphabets and spaces"
      }
    },
    zipcode: { 
      type: String, 
      required: true, 
      validate: {
        validator: function (value) {
          return /^\d{5}-\d{4}$/.test(value);
        },
        message: "Zipcode must be in format 12345-1234"
      }
    }
  },
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: function (value) {
        return /^1-\d{3}-\d{3}-\d{4}$/.test(value);
      },
      message: "Phone number must be in format 1-123-123-1234"
    }
  },
  website: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(value) {
        return validator.isURL(value, { protocols: ['http','https'], require_protocol: true });
      },
      message: "Invalid URL format"
    }
  }
});

module.exports = mongoose.model("User", UserSchema);