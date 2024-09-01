// src/pages/api/admin/pesan/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Pesan from '../../../../models/pesan';

const ADMIN_ID = 8; // ID admin yang diizinkan

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pengirim_id, penerima_id, isi } = req.body;

    // Validasi input
    if (!pengirim_id || !penerima_id || !isi) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Pastikan pengirim adalah admin dengan ID yang valid
    if (pengirim_id !== ADMIN_ID) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
      // Membuat pesan baru
      const newPesan = await Pesan.create({
        pengirim_id,
        penerima_id,
        isi,
      });

      res.status(201).json(newPesan);
    } catch (error) {
      console.error('Error creating pesan:', error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
