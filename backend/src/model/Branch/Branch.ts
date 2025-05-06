import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class Branch extends Model {
  public BranchID!: number;
  public BranchName!: string;
  public BranchLocation!: string;
  public BranchStatus!: boolean;
  public BranchRequest!: string;
}

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
      defaultValue: true
    },
    BranchRequest: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Branch',
    tableName: 'Branch',
    timestamps: false
  }
);

export default Branch;
