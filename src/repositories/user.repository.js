const User = require('../models/user');

class UserRepository {
    async getAllUsers(page, limit) {
        const users = await User.findAll({
            offset: (page - 1) * limit,
            limit
        });
        return users;
    }

    async getUserById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        return user;
    }

    async updateUser(id, user) {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            return null;
        }
        const updatedUser = await existingUser.update(user);
        return updatedUser;
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        await user.destroy();
        return user;
    }
}

module.exports = new UserRepository();