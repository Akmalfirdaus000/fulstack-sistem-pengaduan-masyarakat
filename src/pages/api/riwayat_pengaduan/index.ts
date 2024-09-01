import type { NextApiRequest, NextApiResponse } from 'next';
import RiwayatPengaduan from '../../../models/riwayat_pengaduan';
import authMiddleware from '../../../lib/authMiddleware';

// Handler untuk mendapatkan riwayat pengaduan pengguna
const getRiwayatPengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id; // Mendapatkan ID pengguna dari token

    const riwayatPengaduan = await RiwayatPengaduan.findAll({
      where: {
        // Sesuaikan dengan skema relasi jika diperlukan
        // Contoh: pengaduan_id yang terkait dengan user_id
      },
      attributes: ['id', 'pengaduan_id', 'status', 'komentar', 'updated_at']
    });

    res.status(200).json(riwayatPengaduan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data riwayat pengaduan.', error: (error as Error).message });
  }
};

// Middleware autentikasi
export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getRiwayatPengaduan(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
