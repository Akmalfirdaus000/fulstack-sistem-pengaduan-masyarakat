import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../lib/db';

const testConnection = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'Koneksi ke database berhasil.' });
  } catch (error) {
    // Menangani error dengan type assertion
    const errorMessage = (error as Error).message || 'Terjadi kesalahan';
    res.status(500).json({ message: 'Gagal terhubung ke database.', error: errorMessage });
  }
};

export default testConnection;
