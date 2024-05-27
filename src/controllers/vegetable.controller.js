const VegetableService = require("../services/vegetable.service");

class VegetableController {
  async getAllVegetables(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.max(1, parseInt(req.query.limit) || 10);
      const vegetables = await VegetableService.getAllVegetables(page, limit);
      res.json(vegetables);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getVegetableById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "Invalid vegetable ID" });
    try {
      const vegetable = await VegetableService.getVegetableById(id);
      if (!vegetable)
        return res.status(404).json({ error: "Vegetable not found" });
      res.json(vegetable);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async predictVegetablePrice(req, res) {
    const { selectedDate } = req.body;
    try {
      const price = await VegetableService.predictVegetablePrice(selectedDate);
      res.json({ price });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new VegetableController();
