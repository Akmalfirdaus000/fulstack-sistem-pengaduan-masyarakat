import type { NextApiRequest, NextApiResponse } from 'next';
import Notifikasi from '../../../models/notifikasi';
import authMiddleware from '../../../lib/authMiddleware';

// Handler untuk mendapatkan notifikasi
const getNotifikasi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Menambahkan filter berdasarkan ID pengguna yang terautentikasi
    const userId = (req as any).user.id;
    const notifikasi = await Notifikasi.findAll({
      where: { user_id: userId }
    });
    res.status(200).json(notifikasi);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data notifikasi.', error: (error as Error).message });
  }
};

// Middleware autentikasi
export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getNotifikasi(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
