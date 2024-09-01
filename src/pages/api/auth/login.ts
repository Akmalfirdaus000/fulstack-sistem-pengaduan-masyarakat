import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/users'; // Pastikan path ini sesuai
import sequelize from '../../../lib/db'; // Pastikan path ini sesuai

// Secret key untuk JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi.' });
  }

  try {
    // Temukan user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Update last_login dan set active ke 1
    await user.update({
      last_login: new Date(),
      active: true,
    });

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token akan kadaluarsa dalam 1 jam
    );

    // Kirim token JWT ke client
    return res.status(200).json({ message: 'Login berhasil', token });
  } catch (error) {
    console.error('Error saat login:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.', error });
  }
};

export default login;
