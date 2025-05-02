import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Patient from '../Patient/Patient';

class PhilMember extends Model {}

PhilMember.init(
    {
        MemberID: {
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
        MPPhilHealthID: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MLLastName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MFirstName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MMiddleName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MExtName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MSex: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        RoomFloor: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        BuildingName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        LotHouseBldg: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Street: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Subvill: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Barangay: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        CityMunicipality: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Province: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        Country: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        ZipCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        LandLine: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        MContactNumber: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        MEmailAddress: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        RelationshipToPatient: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MPOccupation: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MBusinessName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MCaseRate: {
            type: DataTypes.STRING(25),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'PhilMember',
        tableName: 'PhilMember',
        timestamps: false // Add this line to disable timestamps
    }
);

// Define the association with Patient model
PhilMember.belongsTo(Patient, { foreignKey: 'ClientNumber' });

export default PhilMember;