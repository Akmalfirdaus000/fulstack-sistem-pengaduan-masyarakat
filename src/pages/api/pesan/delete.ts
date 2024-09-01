import type { NextApiRequest, NextApiResponse } from 'next';
import Pesan from '../../../models/pesan'; // Sesuaikan dengan jalur model Anda
import authMiddleware from '../../../lib/authMiddleware';

// Handler untuk menghapus pesan
const deletePesan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID pesan tidak ditemukan.' });
    }

    // Cari pesan berdasarkan ID
    const pesan = await Pesan.findByPk(id);

    if (!pesan) {
      return res.status(404).json({ message: 'Pesan tidak ditemukan.' });
    }

    // Hapus pesan
    await pesan.destroy();

    res.status(200).json({ message: 'Pesan berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus pesan.', error: (error as Error).message });
  }
};

// Middleware autentikasi
export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await deletePesan(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
