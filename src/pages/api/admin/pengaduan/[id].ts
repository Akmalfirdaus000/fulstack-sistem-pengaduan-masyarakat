import type { NextApiRequest, NextApiResponse } from 'next';
import Pengaduan from '../../../../models/pengaduan';

const getPengaduanById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const pengaduan = await Pengaduan.findByPk(id as string);
    if (pengaduan) {
      res.status(200).json(pengaduan);
    } else {
      res.status(404).json({ message: 'Pengaduan tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pengaduan.', error: (error as Error).message });
  }
};

const updatePengaduan = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const [updated] = await Pengaduan.update(req.body, {
      where: { id: id as string },
    });
    if (updated) {
      const updatedPengaduan = await Pengaduan.findByPk(id as string);
      res.status(200).json(updatedPengaduan);
    } else {
      res.status(404).json({ message: 'Pengaduan tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui pengaduan.', error: (error as Error).message });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getPengaduanById(req, res);
  } else if (req.method === 'PUT') {
    await updatePengaduan(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
