import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../lib/db';

// Definisikan tipe data untuk entitas RiwayatPengaduan
interface RiwayatPengaduanAttributes {
  id: number;
  pengaduan_id: number;
  status: 'baru' | 'diproses' | 'selesai';
  komentar: string | null;
  updated_at: Date;
}

// Opsi untuk entitas RiwayatPengaduan
interface RiwayatPengaduanCreationAttributes extends Optional<RiwayatPengaduanAttributes, 'id' | 'updated_at'> {}

// Definisikan model RiwayatPengaduan
class RiwayatPengaduan extends Model<RiwayatPengaduanAttributes, RiwayatPengaduanCreationAttributes> implements RiwayatPengaduanAttributes {
  public id!: number;
  public pengaduan_id!: number;
  public status!: 'baru' | 'diproses' | 'selesai';
  public komentar!: string | null;
  public updated_at!: Date;
}

// Inisialisasi model RiwayatPengaduan dengan definisi tabel
RiwayatPengaduan.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  pengaduan_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('baru', 'diproses', 'selesai'),
    allowNull: false,
  },
  komentar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Riwayat_Pengaduan',
  timestamps: false, // menggunakan field `updated_at` manual, bukan `createdAt`/`updatedAt`
});

export default RiwayatPengaduan;
