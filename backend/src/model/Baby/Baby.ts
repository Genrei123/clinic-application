import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Patient from '../Patient/Patient';
import PhilMember from '../PhilMember/PhilMember';
import Employee from '../Employee/Employee';
import Branch from '../Branch/Branch';
import StatementOfAccount from '../StatementOfAccount/StatementOfAccount';

class Baby extends Model {}

Baby.init(
    {
        BabyID: {
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
        MemberID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: PhilMember,
                key: 'MemberID'
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
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Branch,
                key: 'BranchID'
            }
        },
        AccountID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: StatementOfAccount,
                key: 'AccountID'
            }
        },
        DeliveryType: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        BabyWeight: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        BabyHeight: {
            type: DataTypes.STRING(25),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Baby',
        tableName: 'Baby',
        timestamps: false
    }
);

// Define the associations
Baby.belongsTo(Patient, { foreignKey: 'ClientNumber' });
Baby.belongsTo(PhilMember, { foreignKey: 'MemberID' });
Baby.belongsTo(Employee, { foreignKey: 'EmployeeID' });
Baby.belongsTo(Branch, { foreignKey: 'BranchID' });
Baby.belongsTo(StatementOfAccount, { foreignKey: 'AccountID' });

export default Baby;