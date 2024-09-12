import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Event extends Model {
  public id!: number;
  public title!: string;
  public color!: string;
  public start!: Date;
  public end!: Date;
}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: false,
});

export default Event;
