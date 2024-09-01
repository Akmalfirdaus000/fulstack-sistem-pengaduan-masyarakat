import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../lib/db'; // Sesuaikan dengan jalur koneksi database Anda

interface PesanAttributes {
  id: number;
  pengirim_id: number;
  penerima_id: number;
  isi: string;
  created_at?: Date;
}

interface PesanCreationAttributes extends Optional<PesanAttributes, 'id'> {}

class Pesan extends Model<PesanAttributes, PesanCreationAttributes> implements PesanAttributes {
  public id!: number;
  public pengirim_id!: number;
  public penerima_id!: number;
  public isi!: string;
  public created_at!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pesan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pengirim_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  penerima_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Pesan',
  tableName: 'Pesan',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Pesan;
