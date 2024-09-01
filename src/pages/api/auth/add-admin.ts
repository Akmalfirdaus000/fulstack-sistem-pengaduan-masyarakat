import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'; // Menggunakan 'bcryptjs' yang lebih umum untuk Node.js
import Users  from '../../../models/users'; // Sesuaikan dengan path model user Anda
import db from '../../../lib/db'; // Pastikan koneksi database Anda berfungsi dengan baik

interface ApiResponse {
  message: string;
  user?: object; // atau tipe data yang lebih spesifik sesuai model user Anda
  error?: string;
}

const register = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  // Cek method request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, email, password } = req.body;

  // Validasi input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi.' });
  }

  try {
    // Pastikan koneksi database sudah terhubung
    await db.authenticate();
    console.log('Database connected successfully.');

    // Cek apakah email sudah digunakan
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin', // Atur role sesuai kebutuhan
    });

    return res.status(201).json({ message: 'Pengguna berhasil didaftarkan.', user: newUser });
  } catch (error: any) {
    console.error('Error during registration:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
      error: error.message || 'Unknown error',
    });
  }
};

export default register;
