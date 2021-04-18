const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

// Setting schema index for simple search function
userSchema.index({'$**': 'text'});

module.exports = mongoose.model("User", userSchema);
