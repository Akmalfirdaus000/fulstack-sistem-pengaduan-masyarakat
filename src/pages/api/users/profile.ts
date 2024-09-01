import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '../../../lib/authMiddleware';
import db from '../../../lib/db';
import User  from '../../../models/users';

// Endpoint untuk mendapatkan profil pengguna
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'role', 'created_at'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error });
  }
};

export default authMiddleware(handler);
