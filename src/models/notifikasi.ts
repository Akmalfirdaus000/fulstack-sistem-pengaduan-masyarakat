import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../lib/db';

// Definisikan tipe data untuk entitas Notifikasi
interface NotifikasiAttributes {
  id: number;
  user_id: number;
  pesan: string;
  tipe: 'info' | 'warning' | 'error';
  status: 'belum dibaca' | 'dibaca';
  created_at: Date;
}

// Opsi untuk entitas Notifikasi
interface NotifikasiCreationAttributes extends Optional<NotifikasiAttributes, 'id' | 'created_at'> {}

// Definisikan model Notifikasi
class Notifikasi extends Model<NotifikasiAttributes, NotifikasiCreationAttributes> implements NotifikasiAttributes {
  public id!: number;
  public user_id!: number;
  public pesan!: string;
  public tipe!: 'info' | 'warning' | 'error';
  public status!: 'belum dibaca' | 'dibaca';
  public created_at!: Date;
}

// Inisialisasi model Notifikasi dengan definisi tabel
Notifikasi.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  pesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipe: {
    type: DataTypes.ENUM('info', 'warning', 'error'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('belum dibaca', 'dibaca'),
    defaultValue: 'belum dibaca',
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Notifikasi',
  timestamps: false, // menggunakan field `created_at` manual, bukan `createdAt`/`updatedAt`
});

export default Notifikasi;
