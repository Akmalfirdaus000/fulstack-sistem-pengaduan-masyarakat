'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaFileUpload, FaPlus, FaRegFileAlt, FaTag, FaPen, FaCamera } from 'react-icons/fa';

const NewComplaintForm = () => {
  const [kategori, setKategori] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('kategori', kategori);
    formData.append('judul', judul);
    formData.append('deskripsi', deskripsi);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      await axios.post('/api/pengaduan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push('/users/dashboard');
    } catch (error) {
      console.error('Gagal mengajukan pengaduan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Ajukan Pengaduan Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-3">
            <label htmlFor="kategori" className="flex items-center text-sm font-medium text-gray-800">
              <FaTag className="mr-3 text-blue-500 text-xl" /> Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
              className="border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-4"
            >
              <option value="">Pilih Kategori</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Infrastruktur">Infrastruktur</option>
            </select>
          </div>

          <div className="flex flex-col space-y-3">
            <label htmlFor="judul" className="flex items-center text-sm font-medium text-gray-800">
              <FaRegFileAlt className="mr-3 text-blue-500 text-xl" /> Judul
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              placeholder="Masukkan judul pengaduan"
              className="border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-4"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label htmlFor="deskripsi" className="flex items-center text-sm font-medium text-gray-800">
              <FaPen className="mr-3 text-blue-500 text-xl" /> Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              placeholder="Masukkan deskripsi pengaduan"
              rows={5}
              className="border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-4"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label htmlFor="foto" className="flex items-center text-sm font-medium text-gray-800">
              <FaCamera className="mr-3 text-blue-500 text-xl" /> Foto (Opsional)
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)}
              className="border-2 border-blue-300 rounded-lg shadow-sm py-2 px-4 file:border-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md file:cursor-pointer hover:file:bg-blue-600 transition-colors"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              {loading ? 'Mengirim...' : <><FaPlus className="mr-2" /> Ajukan Pengaduan</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComplaintForm;
