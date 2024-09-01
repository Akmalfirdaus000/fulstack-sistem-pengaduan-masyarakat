import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Set to true if you want to see SQL queries in console
});

// Cek koneksi ke database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');
  } catch (error) {
    console.error('Gagal terhubung ke database:', error);
  }
};

testConnection();

export default sequelize;
