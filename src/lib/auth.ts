import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import User from '../models/users'; // Pastikan path ke model benar

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const getUserFromRequest = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token tidak ditemukan');
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verifikasi token dan dapatkan payload
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Ambil user dari database berdasarkan ID di payload
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }

    return user;
  } catch (error) {
    console.error('Error saat memverifikasi token atau mengambil pengguna:', error);
    throw new Error('Token tidak valid');
  }
};
