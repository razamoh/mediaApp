import { Sequelize } from 'sequelize-typescript';
import { Media, Token } from '@models/index';


const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [Media, Token],
});

export default sequelize;
