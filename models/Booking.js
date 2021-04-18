const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    property:{
        type: Schema.Types.ObjectId,
        ref: "Property",
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("Booking", bookingSchema)