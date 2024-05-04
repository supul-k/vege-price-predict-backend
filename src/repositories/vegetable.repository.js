const Vegetable = require('../models/vegetable');

class VegetableRepository {
    async getAllVegetables(page, limit) {
        const vegetables = await Vegetable.findAll({
            offset: (page - 1) * limit,
            limit
        });
        return vegetables;
    }

    async getVegetableById(id) {
        const vegetable = await Vegetable.findByPk(id);
        if (!vegetable) {
            return null;
        }
        return vegetable;
    }
}

module.exports = new VegetableRepository();