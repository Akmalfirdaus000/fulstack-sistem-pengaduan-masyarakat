import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/users'; // Sesuaikan dengan path model user Anda

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const getUserFromRequest = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token tidak ditemukan');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }
    return user;
  } catch (error) {
    throw new Error('Token tidak valid');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getUserFromRequest(req);

    // Logic untuk mendapatkan statistik admin
    // Misalnya:
    const stats = {
      pengaduanCount: 123,
      userCount: 456,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
