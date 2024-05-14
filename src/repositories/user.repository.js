const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {

    async createUser(user) {
        const newUser = await User.create(user);
        return newUser;
    }

    async createUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10); 
            const newUser = { ...user, password: hashedPassword };
            const createdUser = await User.create(newUser);    
            return createdUser;

        } catch (error) {            
            console.error("Error creating user:", error);
            throw error; 
        }
    }

    async getUserByEmail(email) {
        const user =  await User.findOne({
            where: {
                email
            }
        });
        return user;
    }

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