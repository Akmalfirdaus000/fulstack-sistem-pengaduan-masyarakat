import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import User from '../../../models/users'; // Sesuaikan dengan path model Anda

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Mengambil daftar pengguna dari database
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { username, email, password, role, active }: {
        username: string;
        email: string;
        password: string;
        role: 'user' | 'admin';
        active: boolean;
      } = req.body;

      // Validasi data
      if (!username || !email || !password || !role || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Invalid data' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Menambah pengguna baru ke database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        active,
        created_at: new Date(), // Menetapkan tanggal saat ini untuk created_at
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
