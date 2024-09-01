// src/pages/api/admin/dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Pastikan path sesuai dengan setup Anda
import Pengaduan from '../../../models/pengaduan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Hitung jumlah pengaduan berdasarkan status
      const [newCount, inProgressCount, completedCount] = await Promise.all([
        Pengaduan.count({ where: { status: 'baru' } }),
        Pengaduan.count({ where: { status: 'diproses' } }),
        Pengaduan.count({ where: { status: 'selesai' } }),
      ]);

      res.status(200).json({
        new: newCount,
        inProgress: inProgressCount,
        completed: completedCount,
      });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
