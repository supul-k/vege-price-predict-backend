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

    async predictVegetablePrice(date) {
        console.log('Date has been received:', date);
    
        return new Promise((resolve, reject) => {
            console.log('Spawning Python process...');
            const pythonProcess = spawn('python', ['model.py', date]);
    
            let output = '';
    
            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });
    
            pythonProcess.stderr.on('data', (data) => {
                console.error('Error from Python script:', data.toString());
            });
    
            pythonProcess.on('error', (error) => {
                console.error('Failed to start Python script:', error.message);
                reject(new Error(`Failed to start Python script: ${error.message}`));
            });
    
            pythonProcess.on('close', (code) => {
                console.log('Python script exited with code:', code);
                if (code === 0) {
                    try {
                        const parsedData = JSON.parse(output);
                        console.log('Parsed data:', parsedData);
                        resolve(parsedData);
                    } catch (error) {
                        reject(new Error('Failed to parse JSON data'));
                    }
                } else {
                    reject(new Error(`Python script exited with code ${code}`));
                }
            });
        });
    };
    
    // async predictVegetablePrice(date) {

    //     console.log('Date has recieved', date);
        
    //     return new Promise((resolve, reject) => {
    //         const pythonProcess = spawn('python', ['model.py', date]);

    //         pythonProcess.stdout.on('data', (data) => {
    //             const price = parseFloat(data.toString());
    //             resolve(price);
    //         });

    //         pythonProcess.stderr.on('data', (data) => {
    //             reject(new Error(`Error in Python script: ${data.toString()}`));
    //         });

    //         pythonProcess.on('error', (error) => {
    //             reject(new Error(`Failed to start Python script: ${error.message}`));
    //         });

    //         pythonProcess.on('close', (code) => {
    //             if (code !== 0) {
    //                 reject(new Error(`Python script exited with code ${code}`));
    //             }
    //         });
    //     });
    // }

    async updateVegetablePrice(vegetableId, newPrice) {
        // Update vegetable price in the database using VegetableRepository
        await VegetableRepository.updateVegetablePrice(vegetableId, newPrice);
    }
}

module.exports = new VegetableService();