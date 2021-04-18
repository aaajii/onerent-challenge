const Property = require("../../models/Property");
const User = require("../../models/User");

module.exports = {
    properties: async () => {
        try {
            const properties = await Property.find();
            return {...properties._doc}
        } catch (error) {
            throw error;
        }
    },
    createProperty: async (args) => {
        try {
            const existingProperty = await Property.findOne({
                street: args.propertyInput.street,
            });
            if (existingProperty) {
                throw new Error("Property exists already.");
            }

            const property = new Property({
                street: args.propertyInput.street,
                city: "San Jose",
                state: "CA",
                zip: "95008",
                rent: 3500,
            });
            const result = await property.save();
            const owner = await User.findOne({firstName:"John"});
            if (!owner){
                throw new Error("UserID not found.");
            }
            owner.properties.push(property);
            await owner.save()
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    }
};
