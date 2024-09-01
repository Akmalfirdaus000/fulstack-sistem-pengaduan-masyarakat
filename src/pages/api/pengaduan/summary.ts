// src/pages/api/pengaduan/summary.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../lib/auth'; // Pastikan pathnya benar
import db from '../../../lib/db'; // Pastikan pathnya benar
import Pengaduan from '../../../models/pengaduan'; // Pastikan pathnya benar

const summary = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const user = await getUserFromRequest(req); // Dapatkan pengguna dari request
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Hitung jumlah pengaduan berdasarkan status
    const newCount = await Pengaduan.count({ where: { user_id: user.id, status: 'baru' } });
    const inProgressCount = await Pengaduan.count({ where: { user_id: user.id, status: 'diproses' } });
    const completedCount = await Pengaduan.count({ where: { user_id: user.id, status: 'selesai' } });

    res.status(200).json({
      new: newCount,
      inProgress: inProgressCount,
      completed: completedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: (error as Error).message });
  }
};

export default summary;
