import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class Patient extends Model {}

Patient.init(
    {
        ClientNumber: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PLastName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PFirstName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PMiddleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PExtName: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        PAddress: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PRegion: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        POccupation: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PBirthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        PAge: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        PContactNumber: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Branch: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        DateAdmitted: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        TimeAdmitted: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        DateDischarged: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        TimeOfDischarged: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        DateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        TimeOfBirth: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        PImage: {
            type: DataTypes.STRING(245),
            allowNull: true,
        },
        PPhilHealthID: {
            type: DataTypes.STRING(25),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Patient',
        tableName: 'Patient'
    }
);

export default Patient;