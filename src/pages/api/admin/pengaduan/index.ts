import type { NextApiRequest, NextApiResponse } from 'next';
import Pengaduan from '../../../../models/pengaduan';

// Handler untuk mendapatkan semua pengaduan
const getPengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pengaduan = await Pengaduan.findAll({
      attributes: ['id', 'user_id', 'kategori', 'judul', 'deskripsi', 'foto', 'status', 'created_at'],
    });

    res.status(200).json(pengaduan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pengaduan.', error: (error as Error).message });
  }
};

// Handler untuk API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getPengaduan(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
