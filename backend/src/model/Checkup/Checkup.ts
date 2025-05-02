import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Patient from '../Patient/Patient';

class Checkup extends Model {}

Checkup.init(
    {
        CheckUpID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ClientNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: 'ClientNumber'
            }
        },
        MedicalHistory: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        NumberOfPregnancy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Gravida: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Para: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Term: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        PreTerm: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Abortion: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Living: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Lmp: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Edd: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Menarch: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        CheckupDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        AOG: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        WT: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        FH: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        FHT: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Checkup',
        tableName: 'Checkup',
        timestamps: false
    }
);

// Define the association with Patient model
Checkup.belongsTo(Patient, { foreignKey: 'ClientNumber' });

export default Checkup;