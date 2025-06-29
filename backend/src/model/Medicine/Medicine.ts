import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';
import Branch from '../Branch/Branch';

class Medicine extends Model {
  public MedicineID!: number;
  public MedicineName!: string;
  public MedicineQuantity!: string;
  public MedicinePrice!: number;
  public ManufactureDate!: Date;
  public ExpirationDate!: Date;
  public BranchID!: number;
  public MedicineStatus!: boolean;
  public MedicineDescription!: string;
  public MedicineIMG!: string;
}

Medicine.init(
    {
        MedicineID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        MedicineName: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MedicineQuantity: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        MedicinePrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        ManufactureDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        ExpirationDate: {
            type: DataTypes.DATEONLY,
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
        MedicineStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        MedicineDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        MedicineIMG: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Medicine',
        tableName: 'Medicine',
        timestamps: false
    }
);

// Define the association with Branch model
Medicine.belongsTo(Branch, { foreignKey: 'BranchID' });

export default Medicine;
