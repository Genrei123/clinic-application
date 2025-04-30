import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Patient from '../Patient/Patient';
import Checkup from '../Checkup/Checkup';
import Branch from '../Branch/Branch';
import Employee from '../Employee/Employee';
import Medicine from '../Medicine/Medicine';
import Service from '../Service/Service';

class StatementOfAccount extends Model {}

StatementOfAccount.init(
    {
        AccountID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ClientNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Patient,
                key: 'ClientNumber'
            }
        },
        CheckUpID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Checkup,
                key: 'CheckUpID'
            }
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
        },
        MedicineID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Medicine,
                key: 'MedicineID'
            }
        },
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Service,
                key: 'ServiceID'
            }
        },
        DatePaid: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        Total: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'StatementOfAccount',
        tableName: 'StatementOfAccount' // Explicitly set the table name to match SQL schema
    }
);

// Define the associations
StatementOfAccount.belongsTo(Patient, { foreignKey: 'ClientNumber' });
StatementOfAccount.belongsTo(Checkup, { foreignKey: 'CheckUpID' });
StatementOfAccount.belongsTo(Branch, { foreignKey: 'BranchID' });
StatementOfAccount.belongsTo(Employee, { foreignKey: 'EmployeeID' });
StatementOfAccount.belongsTo(Medicine, { foreignKey: 'MedicineID' });
StatementOfAccount.belongsTo(Service, { foreignKey: 'ServiceID' });

export default StatementOfAccount;