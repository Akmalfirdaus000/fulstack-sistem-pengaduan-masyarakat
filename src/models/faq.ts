import { DataTypes, Model } from 'sequelize';
import sequelize  from '../lib/db';

class FAQ extends Model {}

FAQ.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pertanyaan: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  jawaban: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'FAQ',
  tableName: 'FAQ',
  timestamps: false,
});

export default FAQ;
