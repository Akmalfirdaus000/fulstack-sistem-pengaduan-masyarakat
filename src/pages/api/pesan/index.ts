import type { NextApiRequest, NextApiResponse } from 'next';
import Pesan from '../../../models/pesan';
import authMiddleware from '../../../lib/authMiddleware';

// Handler untuk mendapatkan pesan
const getPesan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pesan = await Pesan.findAll({
      // Menambahkan filter jika perlu, misalnya berdasarkan ID pengguna
      // where: { penerima_id: (req as any).user.id } 
    });
    res.status(200).json(pesan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pesan.', error: (error as Error).message });
  }
};

// Handler untuk membuat pesan
const createPesan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Pastikan data yang diperlukan ada di req.body
    const pesan = await Pesan.create(req.body);
    res.status(201).json(pesan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat pesan.', error: (error as Error).message });
  }
};

// Middleware autentikasi
export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getPesan(req, res);
  } else if (req.method === 'POST') {
    await createPesan(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
