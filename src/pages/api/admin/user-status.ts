import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../lib/auth'; // Pastikan path ke fungsi benar
import User from '../../../models/users'; // Pastikan path ke model benar

const updateLoginStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verifikasi token dan ambil data pengguna
    const user = await getUserFromRequest(req);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Ambil semua pengguna dari database
    const users = await User.findAll();

    // Daftar ID pengguna yang sedang aktif (misalnya, dari sesi atau logika lain)
    const activeUserIds = []; // Anda harus mengimplementasikan logika untuk menentukan pengguna aktif

    // Perbarui status pengguna
    await Promise.all(users.map(async (user) => {
      const status = activeUserIds.includes(user.id) ? 'aktif' : 'nonaktif';
      await user.update({ status });
    }));

    return res.status(200).json({ message: 'Status login diperbarui' });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan' });
  }
};

export default updateLoginStatus;
