import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/database';

class Logs extends Model {
  public LogID!: number;
  public Timestamp!: Date;
  public ActionType!: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
  public TableName!: string;
  public RecordID!: number | null;
  public UserID!: number | null;
  public OldValues!: object | null;
  public NewValues!: object | null;
  public Description!: string;
  public IPAddress!: string | null;
  public UserAgent!: string | null;
}

Logs.init(
  {
    LogID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    ActionType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['CREATE', 'READ', 'UPDATE', 'DELETE']]
      }
    },
    TableName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    RecordID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OldValues: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    NewValues: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IPAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    UserAgent: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Logs',
    tableName: 'Logs',
    timestamps: false
  }
);

export default Logs;