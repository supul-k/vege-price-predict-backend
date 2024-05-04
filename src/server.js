const express = require('express');
const pool = require('./db/dbConfig');
const sequelize = require('./db/sequalize');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3015;

require('dotenv').config();

const forceSync = process.env.FORCE_SYNC === 'true';

app.use(express.json());    

const checkSequelizeDbConnection = async () => {
    try {
        await sequelize.sync({ force: forceSync });
        console.log('Database synchronized with Sequelize');
    } catch (error) {
        console.error('Failed to synchronize database with Sequelize:', error);
        process.exit(1);
    }
};

// Function to check database connection
const checkDbConnection = async () => {
    try {
        await pool.query('SELECT NOW()'); // Simple query to check the connection
        console.log('Connected to the database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process with an error code
    }
};

// Mount the routes
app.use('/', routes);

// Start the server and check database connection
const startServer = async () => {
    await checkSequelizeDbConnection();
    await checkDbConnection(); // Ensure DB connection is okay before starting the server

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
