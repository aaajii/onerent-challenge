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
    },
    properties: [{
        type: Schema.Types.ObjectId,
        ref: "Property",
    }],
});
userSchema.index({'$**': 'text'});

module.exports = mongoose.model("User", userSchema);