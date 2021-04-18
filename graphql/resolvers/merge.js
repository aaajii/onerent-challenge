/*
Merged functions and helpers are found here
*/

const Property = require("../../models/Property");
const User = require("../../models/User");

const properties = async (propertyIds) => {
    try {
        const properties = await Property.find({ _id: { $in: propertyIds } });
        return properties.map((property) => {
            return {...property._doc};
        });
    } catch (err) {
        throw err;
    }
};

const transformUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            firstName: user._doc.firstName,
            properties: properties.bind(this, user._doc.properties),
        };
    } catch (err) {
        throw err;
    }
};


exports.transformUser = transformUser