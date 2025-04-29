import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

export default User;