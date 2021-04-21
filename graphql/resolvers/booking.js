const Booking = require("../../models/Booking");
const Property = require("../../models/Property");
const User = require("../../models/User");

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking =>{
                return{...booking._doc}
            })
        } catch (error) {
            console.log(error.message)
            throw error;
        }
    },

    bookProperty: async (args) => {
        try{
            const propertyID = args.bookingInput.property
            const userID = args.bookingInput.user
            // Validate first if the entered property and user is existing
            const existingProperty = await Property.findOne({
                _id: propertyID
            });
            const existingUser = await User.findOne({
                _id: userID
            });
            if (!existingProperty) {
                throw new Error("The entered property does not exist.");
            }else if (!existingUser){
                throw new Error("The entered user does not exist.");
            }else if(await Booking.findOne({user:existingUser, property: existingProperty})){
                throw new Error("Booking already exists")
            }else{
                const newBooking = new Booking({
                    property: existingProperty,
                    user: existingUser
                })
                console.log(newBooking)
                await newBooking.save()
                return {...newBooking._doc}
            }

        }catch(error){
            console.log(error)
            throw error;
        }
    }
}