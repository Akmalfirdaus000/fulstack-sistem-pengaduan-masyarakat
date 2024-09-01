import { DataTypes, Model } from 'sequelize';
import sequelize  from '../lib/db';

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
      model: 'Users',
      key: 'id',
    },
    allowNull: true,
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Pengaduan',
  tableName: 'Pengaduan',
  timestamps: false,
});

export default Pengaduan;
