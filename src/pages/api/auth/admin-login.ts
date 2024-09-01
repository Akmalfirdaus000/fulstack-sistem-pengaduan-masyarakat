import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User  from '../../../models/users'; // Sesuaikan dengan jalur model Anda

const secret = process.env.JWT_SECRET || 'your_secret_key';

const adminLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email, role: 'admin' } });

      if (!user) {
        return res.status(401).json({ message: 'Admin tidak ditemukan.' });
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Password salah.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan.', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default adminLogin;
