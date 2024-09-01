import { DataTypes, Model } from 'sequelize';
import sequelize  from '../lib/db';
import User from './users';

class Pengaduan extends Model {}

Pengaduan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: true, // Allow null if user_id is not always required
  },
  kategori: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  judul: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('baru', 'diproses', 'selesai'),
    defaultValue: 'baru',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at', // Use field mapping to match database column
  },
}, {
  sequelize,
  modelName: 'Pengaduan',
  tableName: 'Pengaduan', // Explicitly specify table name
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
});


export default Pengaduan;
