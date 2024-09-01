import sequelize from './db';
import User from '../models/users';
import Pengaduan from '../models/pengaduan';
import KategoriPengaduan from '../models/kategori_pengaduan'; // Sesuaikan nama model dengan file yang telah dibuat
import RiwayatPengaduan from '../models/riwayat_pengaduan';
import Notifikasi from '../models/notifikasi';
import Pesan from '../models/pesan';
import FAQ from '../models/faq';

const init_database = async () => {
  try {
    // Sinkronisasi semua model dengan database
    await sequelize.sync({ force: true }); // Hati-hati dengan { force: true }, ini akan menghapus dan membuat ulang tabel
    console.log('Database initialized and synchronized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default init_database;
