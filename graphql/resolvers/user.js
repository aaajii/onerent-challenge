const User = require("../../models/User");
const {transformUser} = require("./merge")


module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            return users.map((user) => {
                return transformUser(user);
            });
        } catch (err) {
            throw err;
        }
    },
    createUser: async (args) => {
        const user = new User({
            firstName: args.userInput.firstName,
            lastName: "Smith, it's always been Smith.",
        });
        let createdUser;
        try {
            const result = await user.save();
            createdUser = transformUser(result);
            return createdUser;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};
