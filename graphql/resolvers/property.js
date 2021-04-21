const Property = require("../../models/Property");

module.exports = {
    properties: async () => {
        try {
            const properties = await Property.find();
            return properties
        } catch (error) {
            console.log(error)
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

            // City, state, etc. are set already for the sake of simplicity
            const property = new Property({
                street: args.propertyInput.street,
                city: "San Jose",
                state: "CA",
                zip: "95008",
                rent: 3500,
            });
            const result = await property.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    }
};
