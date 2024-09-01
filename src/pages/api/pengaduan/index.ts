import type { NextApiRequest, NextApiResponse } from 'next';
import Pengaduan from '../../../models/pengaduan';
import authMiddleware from '../../../lib/authMiddleware';
import { Op } from 'sequelize'; // Jika Anda memerlukan operator Sequelize

// Handler untuk mendapatkan semua pengaduan pengguna
const getPengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id; // Mendapatkan ID pengguna dari token

    const pengaduan = await Pengaduan.findAll({
      where: { user_id: userId },
      attributes: ['id', 'kategori', 'judul', 'deskripsi', 'foto', 'status', 'created_at'],
    });

    res.status(200).json(pengaduan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pengaduan.', error: (error as Error).message });
  }
};

// Handler untuk membuat pengaduan baru
const createPengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user.id; // Mendapatkan ID pengguna dari token
    const { kategori, judul, deskripsi, foto } = req.body;

    const pengaduan = await Pengaduan.create({
      user_id: userId,
      kategori,
      judul,
      deskripsi,
      foto,
      status: 'baru' // Status default
    });

    res.status(201).json(pengaduan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat pengaduan.', error: (error as Error).message });
  }
};

// Middleware autentikasi
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getPengaduan(req, res);
  } else if (req.method === 'POST') {
    await createPengaduan(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Menggunakan middleware autentikasi
export default authMiddleware(handler);
