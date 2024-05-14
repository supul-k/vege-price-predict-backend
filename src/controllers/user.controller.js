const UserService = require("../services/user.service");

class UserController {

  async createUser(req, res) {
    const userData = req.body;
    try {
      const user = await UserService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.loginUser(email, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.max(1, parseInt(req.query.limit) || 10);
      const users = await UserService.getAllUsers(page, limit);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });
    try {
      const user = await UserService.getUserById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    try {
      const updatedUser = await UserService.updateUser(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await UserService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new UserController();
