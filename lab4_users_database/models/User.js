const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: {
        type: String,
        required: true,
        unique: true,
        valdiate: [validator.isEmail, "Invalid email format, should be: email@domain.com"]
    },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: {
            type: String,
            required: true,
            valdiate: {
                validator: function (value) {
                    return /^[A-Za-z\s]+$/.test(value);
                },
                message: "City name must contain only alphabets and space"
            }
        },
        zipcode: {
            type: String,
            required: true,
            valdiate: {
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
        validate: [validator.isURL, "Invalid URL format"]
    }
});

module.exports = mongoose.model("User", UserSchema)