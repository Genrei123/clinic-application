import { Sequelize } from 'sequelize';

const CONNECTION_STRING = process.env.DB_CONN;

export const sequelize = new Sequelize(CONNECTION_STRING || "localhost:3000");
export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect tot he database: ', error);
    }
};
