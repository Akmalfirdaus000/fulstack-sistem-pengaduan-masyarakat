import type { NextApiRequest, NextApiResponse } from 'next';
import KategoriPengaduan from '../../../models/kategori_pengaduan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const kategoriPengaduan = await KategoriPengaduan.findAll();
        res.status(200).json(kategoriPengaduan);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'Gagal mengambil data kategori pengaduan.', error: error.message });
        } else {
          res.status(500).json({ message: 'Gagal mengambil data kategori pengaduan.', error: 'Unknown error' });
        }
      }
      break;
    case 'POST':
      const { kategori, deskripsi } = req.body;
      if (!kategori) {
        return res.status(400).json({ message: 'Kategori harus diisi.' });
      }
      try {
        const newKategoriPengaduan = await KategoriPengaduan.create({
          kategori,
          deskripsi,
        });
        res.status(201).json(newKategoriPengaduan);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'Gagal menambahkan kategori pengaduan.', error: error.message });
        } else {
          res.status(500).json({ message: 'Gagal menambahkan kategori pengaduan.', error: 'Unknown error' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
