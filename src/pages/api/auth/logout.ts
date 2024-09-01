// src/pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Users from '../../../models/users'; // Pastikan path ke model user sudah benar
import db from '../../../lib/db'; // Pastikan koneksi database Anda berfungsi dengan baik

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Pastikan koneksi database sudah terhubung
    await db.authenticate();

    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(400).json({ message: 'Token tidak ditemukan' });
    }

    // Verifikasi token JWT untuk mendapatkan ID pengguna
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: 'Token tidak valid atau tidak ada ID pengguna.' });
    }

    // Dapatkan pengguna dari database berdasarkan ID yang didekode
    const user = await Users.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Perbarui status pengguna menjadi tidak aktif
    await Users.update(
      { active: false }, // Set 'active' ke false
      { where: { id: user.id } } // Berdasarkan ID pengguna dari token
    );

    // Tidak ada cookie yang perlu dihapus, cukup kirim respons berhasil
    return res.status(200).json({ message: 'Logout berhasil' });
  } catch (error: any) {
    console.error('Error saat logout:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

export default logout;
