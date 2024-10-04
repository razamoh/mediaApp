import 'module-alias/register';
import app from './app';
import redisClient from '@config/redis';
import sequelize from '@config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
    await redisClient.connect();
    await sequelize.sync(); // Sync models with the database

    redisClient.on('connect', () => {
        console.log(`Connected to Redis`);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Error starting server:', error);
});
