import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Sale extends Model {
  public id!: number;
  public mes!: string;
  public venta!: number;
}

Sale.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venta: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Sale',
  tableName: 'sales',
  timestamps: false
});

export default Sale;

