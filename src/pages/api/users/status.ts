import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Users from '../../../models/users'; // Pastikan path ke model user sudah benar
import db from '../../../lib/db'; // Pastikan koneksi database Anda berfungsi dengan baik

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Pastikan koneksi database sudah terhubung
  await db.authenticate();

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verifikasi token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Dapatkan user berdasarkan ID dari token yang telah didekode
    const user = await Users.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Logika untuk memeriksa apakah user aktif atau tidak
    const isActive = user.active; // 'active' adalah kolom dalam tabel Users

    // Jika logout, perbarui status user menjadi tidak aktif
    if (!isActive) {
      await Users.update(
        { active: false }, // Set 'active' ke false
        { where: { id: decoded.id } } // Berdasarkan user ID dari token
      );
    }

    // Kembalikan status user yang diperbarui
    const userStatus = {
      id: user.id,
      status: user.active ? 'active' : 'inactive',
    };

    return res.status(200).json(userStatus);
  } catch (error) {
    console.error('Error during status check:', error);
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

export default handler;
