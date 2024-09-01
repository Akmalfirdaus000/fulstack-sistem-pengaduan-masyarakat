const express = require('express');
const next = require('next');
const path = require('path');
const multer = require('multer');

// Inisialisasi Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Konfigurasi multer untuk upload file
const upload = multer({ dest: 'public/uploads/' });

app.prepare().then(() => {
  const server = express();

  // Middleware untuk parsing JSON dan URL-encoded
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Route untuk upload pengaduan
  server.post('/api/pengaduan/new', upload.single('foto'), (req, res) => {
    try {
      const { kategori, judul, deskripsi } = req.body;
      const foto = req.file?.filename || ''; // Mengambil nama file dari upload

      // Validasi data
      if (!kategori || !judul || !deskripsi) {
        return res.status(400).json({ message: 'Data pengaduan tidak lengkap.' });
      }

      // Simulasi simpan ke database (ganti ini dengan logika penyimpanan ke DB Anda)
      const pengaduan = {
        user_id: 1, // Gantilah ini dengan ID pengguna yang sesuai
        kategori,
        judul,
        deskripsi,
        foto,
        status: 'baru' // Status default
      };

      res.status(201).json(pengaduan);
    } catch (error) {
      res.status(500).json({ message: 'Gagal membuat pengaduan.', error: error.message });
    }
  });

  // Route untuk Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
