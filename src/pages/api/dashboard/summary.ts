import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import  Pengaduan  from '../../../models/pengaduan'; // Sesuaikan path model Pengaduan
import Users  from '../../../models/users'; // Sesuaikan path model Users
import db from '../../../lib/db'; // Pastikan koneksi database Anda berfungsi dengan baik
import authenticateUser from '../../../pages/api/auth/login'; // Middleware untuk autentikasi JWT

interface ApiResponse {
  message: string;
  data?: {
    statusTerbaru?: string;
    jumlahPengaduan?: {
      baru: number;
      diproses: number;
      selesai: number;
    };
  };
  error?: string;
}

const getPengaduanSummary = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  // Cek method request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Autentikasi pengguna dan dapatkan ID pengguna
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Pastikan koneksi database sudah terhubung
    await db.authenticate();
    console.log('Database connected successfully.');

    // Dapatkan status pengaduan terbaru
    const pengaduanTerbaru = await Pengaduan.findOne({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
      limit: 1,
    });

    // Dapatkan jumlah pengaduan berdasarkan status
    const jumlahPengaduan = await Pengaduan.findAll({
      where: { user_id: user.id },
      attributes: [
        'status',
        [db.fn('COUNT', db.col('status')), 'count'],
      ],
      group: ['status'],
    });

    // Format data jumlah pengaduan
    const pengaduanCount = {
      baru: 0,
      diproses: 0,
      selesai: 0,
    };

    jumlahPengaduan.forEach((pengaduan: any) => {
      pengaduanCount[pengaduan.status as keyof typeof pengaduanCount] = parseInt(pengaduan.dataValues.count, 10);
    });

    res.status(200).json({
      message: 'Ringkasan pengaduan berhasil diambil.',
      data: {
        statusTerbaru: pengaduanTerbaru ? pengaduanTerbaru.status : 'Tidak ada pengaduan',
        jumlahPengaduan: pengaduanCount,
      },
    });
  } catch (error: any) {
    // Log error detail ke console
    console.error('Error fetching pengaduan summary:', error);

    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
      error: error.message || 'Unknown error',
    });
  }
};

export default getPengaduanSummary;
