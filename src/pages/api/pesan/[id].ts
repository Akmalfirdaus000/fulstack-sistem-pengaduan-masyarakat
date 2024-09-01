import type { NextApiRequest, NextApiResponse } from 'next';
import Pesan from '../../../models/pesan';

const getPesanById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const pesan = await Pesan.findByPk(id as string);
    if (pesan) {
      res.status(200).json(pesan);
    } else {
      res.status(404).json({ message: 'Pesan tidak ditemukan.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pesan.', error: (error as Error).message });
  }
};

export default getPesanById;
