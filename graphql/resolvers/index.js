const userResolver = require('./user')
const propertyResolver = require('./property')
const User = require('../../models/User')
const Property = require('../../models/Property')
const {transformUser} = require("./merge")

const rootResolver = {
    search: async args => {
        try {
            const properties = await Property.find({$text: {$search: args.searchInput}}).exec()
            const users = await User.find({$text: {$search: args.searchInput}}).exec()
            const result = {
                // Check Users first
                users: users.map(user =>{
                    return transformUser(user)
                }),
                // Check Properties next
                properties: properties.map(property => {
                    return {...property._doc}
                }),
            }
            return result
        } catch (error) {
            throw error;
        }
    },
    ...propertyResolver,
    ...userResolver,
}

module.exports = rootResolver