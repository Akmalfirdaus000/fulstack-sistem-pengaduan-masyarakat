import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../lib/auth'; // Pastikan pathnya benar
import db from '../../../lib/db'; // Pastikan pathnya benar
import Pengaduan from '../../../models/pengaduan'; // Pastikan pathnya benar

const getLatestPengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const latestPengaduan = await Pengaduan.findOne({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
    });

    if (!latestPengaduan) {
      return res.status(404).json({ message: 'Pengaduan tidak ditemukan.' });
    }

    res.status(200).json(latestPengaduan);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: (error as Error).message });
  }
};

export default getLatestPengaduan;
