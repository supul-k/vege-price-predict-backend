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

    static predictVegetablePrice(date) {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python', ['path/to/predict_vegetable_price.py', date]);

            pythonProcess.stdout.on('data', (data) => {
                const price = parseFloat(data.toString());
                resolve(price);
            });

            pythonProcess.stderr.on('data', (data) => {
                reject(new Error(`Error in Python script: ${data.toString()}`));
            });

            pythonProcess.on('error', (error) => {
                reject(new Error(`Failed to start Python script: ${error.message}`));
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Python script exited with code ${code}`));
                }
            });
        });
    }

    async updateVegetablePrice(vegetableId, newPrice) {
        // Update vegetable price in the database using VegetableRepository
        await VegetableRepository.updateVegetablePrice(vegetableId, newPrice);
    }
}

module.exports = new VegetableService();