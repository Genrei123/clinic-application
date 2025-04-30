import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class Employee extends Model {}

Employee.init(
    {
        EmployeeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EEmail: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EPassword: {
            type: DataTypes.STRING(18),
            allowNull: true,
        },
        ELastName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EFirstName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EMiddleName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EExtensionName: {
            type: DataTypes.STRING(3),
            allowNull: true,
        },
        EAccreditationNumber: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        EDepartment: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ESpecialist: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EDegree: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ESickLeave: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        ELocation: {
            type: DataTypes.DATEONLY, // Note: Schema shows DATE but this might be incorrect for a location field
            allowNull: true,
        },
        EStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        EPhoneNumber: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        EFacebook: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        EInstagram: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ETweeter: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ELinkedin: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        DateJoined: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        EmployeeIMG: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        EmployeeDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Employee',
        tableName: 'Employee' // Explicitly set the table name to match SQL schema
    }
);

export default Employee;
