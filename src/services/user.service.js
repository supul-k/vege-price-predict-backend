const UserRepository = require("../repositories/user.repository");
const jwtAuth = require("../middlewares/jwtAuth");
const bcrypt = require("bcrypt");

class UserService {
  async createUser(user) {
    const newUser = await UserRepository.createUser(user);
    return newUser;
  }

  async loginUser(email, password) {
    try {
      const user = await UserRepository.getUserByEmail(email);

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return null;
      }

      const token = jwtAuth.sign({ userId: user.id, userEmail: user.email});
      return token;
      
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

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
