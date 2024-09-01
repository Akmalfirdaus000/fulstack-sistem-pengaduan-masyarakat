import type { NextApiRequest, NextApiResponse } from 'next';
import Pesan from '../../../models/pesan'; // Sesuaikan dengan path yang benar
import authMiddleware from '../../../lib/authMiddleware'; // Sesuaikan dengan path yang benar

const replyPesan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { penerima_id, isi, pesan_id } = req.body;

    // Validasi data
    if (!penerima_id || !isi || !pesan_id) {
      return res.status(400).json({ message: 'Data yang dikirim tidak lengkap.' });
    }

    // Parsing ID
    const parsedPesanId = parseInt(pesan_id, 10);
    const parsedPenerimaId = parseInt(penerima_id, 10);

    if (isNaN(parsedPesanId) || isNaN(parsedPenerimaId)) {
      return res.status(400).json({ message: 'ID tidak valid.' });
    }

    // Menambahkan balasan pesan ke database
    const newPesan = await Pesan.create({
      pengirim_id: parsedPenerimaId,
      penerima_id: parsedPenerimaId,
      isi,
      created_at: new Date(), // Gunakan objek Date langsung
    });

    res.status(201).json(newPesan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membalas pesan.', error: (error as Error).message });
  }
};

export default authMiddleware(replyPesan);
