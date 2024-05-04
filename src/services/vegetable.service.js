const VegetableRepository = require('../repositories/vegetable.repository');
const { spawn } = require('child_process');

class VegetableService {
    async getAllVegetables(page, limit) {
        const vegetables = await VegetableRepository.getAllVegetables(page, limit);
        return vegetables;
    }

    async getVegetableById(id) {
        const vegetable = await VegetableRepository.getVegetableById(id);
        if (vegetable) {
            return vegetable;
        }
        return null;
    }

    async predictVegetablePrice(vegetableName, quantity) {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python', ['path/to/predict_vegetable_price.py', vegetableName, quantity]);
            
            pythonProcess.stdout.on('data', (data) => {
                const price = parseFloat(data.toString());
                resolve(price);
            });
            
            pythonProcess.stderr.on('data', (data) => {
                reject(new Error(`Error in Python script: ${data.toString()}`));
            });
        });
    }

    async updateVegetablePrice(vegetableId, newPrice) {
        // Update vegetable price in the database using VegetableRepository
        await VegetableRepository.updateVegetablePrice(vegetableId, newPrice);
    }
}

module.exports = new VegetableService();