import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class Branch extends Model {}

Branch.init(
    {
        BranchID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        BranchName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        BranchLocation: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        BranchStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        BranchRequest: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Branch',
        tableName: 'Branch', // Explicitly set the table name to match SQL schema
        timestamps: false // Add this line to disable timestamps
    }
);

export default Branch;
