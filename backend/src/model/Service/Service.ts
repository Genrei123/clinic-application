import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Branch from '../Branch/Branch';
import Employee from '../Employee/Employee';

class Service extends Model {}

Service.init(
    {
        ServiceID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ServiceName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ServiceType: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ServicePrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        ServiceStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Branch,
                key: 'BranchID'
            }
        },
        EmployeeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Employee,
                key: 'EmployeeID'
            }
        }
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'Service' // Explicitly set the table name to match SQL schema
    }
);

// Define the associations
Service.belongsTo(Branch, { foreignKey: 'BranchID' });
Service.belongsTo(Employee, { foreignKey: 'EmployeeID' });

export default Service;