import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Branch from '../Branch/Branch';
import Medicine from '../Medicine/Medicine';
import Employee from '../Employee/Employee';

class Inventory extends Model {}

Inventory.init(
    {
        InventoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Branch,
                key: 'BranchID'
            }
        },
        MedicineID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Medicine,
                key: 'MedicineID'
            }
        },
        EmployeeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Employee,
                key: 'EmployeeID'
            }
        },
        InventoryStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        InventoryRequest: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Inventory',
        tableName: 'Inventory', // Explicitly set the table name to match SQL schema
        timestamps: false // Add this line to disable timestamps
    }
);

// Define the associations
Inventory.belongsTo(Branch, { foreignKey: 'BranchID' });
Inventory.belongsTo(Medicine, { foreignKey: 'MedicineID' });
Inventory.belongsTo(Employee, { foreignKey: 'EmployeeID' });

export default Inventory;