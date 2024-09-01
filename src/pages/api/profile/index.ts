import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/users';
import authMiddleware from '../../../lib/authMiddleware';
// import { hashPassword } from '../../../lib/auth';

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json(user);
  } catch (error) {
    // Menambahkan Type Assertion
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Gagal mengambil data profil.', error: errorMessage });
  }
};

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id;
    const { username, email } = req.body;
    const image = req.file ? req.file.filename : null; // Asumsikan kita menggunakan multer untuk upload file

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    user.username = username;
    user.email = email;
    if (image) {
      user.image = image;
    }

    await user.save();

    res.status(200).json({ message: 'Profil berhasil diperbarui.' });
  } catch (error) {
    // Menambahkan Type Assertion
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Gagal memperbarui profil.', error: errorMessage });
  }
};

export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getProfile(req, res);
  } else if (req.method === 'PUT') {
    await updateProfile(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
