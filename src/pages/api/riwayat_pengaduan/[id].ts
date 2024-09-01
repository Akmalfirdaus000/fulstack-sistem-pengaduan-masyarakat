import type { NextApiRequest, NextApiResponse } from 'next';
import RiwayatPengaduan from '../../../models/riwayat_pengaduan';

const getRiwayatPengaduanById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const riwayatPengaduan = await RiwayatPengaduan.findByPk(id as string);
    if (riwayatPengaduan) {
      res.status(200).json(riwayatPengaduan);
    } else {
      res.status(404).json({ message: 'Riwayat pengaduan tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data riwayat pengaduan.', error: (error as Error).message });
  }
};

export default getRiwayatPengaduanById;
