const UserRepository = require('../repositories/user.repository');

class UserService {
    async getAllUsers(page, limit) {
        const users = await UserRepository.getAllUsers(page, limit);
        return users;
    }

    async getUserById(id) {
        const user = await UserRepository.getUserById(id);
        if (user) {
            return user;
        }
        return null;
    }

    async updateUser(id, user) {
        const updatedUser = await UserRepository.updateUser(id, user);
        if (updatedUser) {
            return updatedUser;
        }
        return null;
    }

    async deleteUser(id) {
        return UserRepository.deleteUser(id);
    }
}

module.exports = new UserService();