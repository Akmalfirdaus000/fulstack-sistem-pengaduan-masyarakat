'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Pengaduan {
  id: number;
  user_id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  foto: string | null;
  status: 'baru' | 'diproses' | 'selesai';
  created_at: string;
  user_name: string; // Tambahkan user_name jika Anda ingin menampilkan nama pengguna
}

const PengaduanDetail = () => {
  const [pengaduan, setPengaduan] = useState<Pengaduan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'baru' | 'diproses' | 'selesai'>('baru');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const response = await axios.get(`/api/admin/pengaduan/${id}`);
        setPengaduan(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        setError('Gagal mengambil detail pengaduan.');
        setLoading(false);
      }
    };

    if (id) {
      fetchPengaduan();
    }
  }, [id]);

  const handleStatusChange = async (newStatus: 'baru' | 'diproses' | 'selesai') => {
    try {
      await axios.put(`/api/admin/pengaduan/${id}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      setError('Gagal mengubah status pengaduan.');
    }
  };

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {pengaduan && (
        <>
          <h2 className="text-xl font-bold mb-4">Detail Pengaduan</h2>
          <div className="mb-4">
            <strong>ID Pengaduan:</strong> {pengaduan.id}
          </div>
          <div className="mb-4">
            <strong>User ID:</strong> {pengaduan.user_id}
          </div>
          <div className="mb-4">
            <strong>Nama User:</strong> {pengaduan.user_name}
          </div>
          <div className="mb-4">
            <strong>Kategori:</strong> {pengaduan.kategori}
          </div>
          <div className="mb-4">
            <strong>Judul:</strong> {pengaduan.judul}
          </div>
          <div className="mb-4">
            <strong>Deskripsi:</strong> {pengaduan.deskripsi}
          </div>
          {pengaduan.foto && (
            <div className="mb-4">
              <strong>Foto:</strong>
              <img src={pengaduan.foto} alt={pengaduan.judul} className="w-64 h-64 object-cover mt-2" />
            </div>
          )}
          <div className="mb-4">
            <strong>Status:</strong>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as 'baru' | 'diproses' | 'selesai')}
              className="ml-2 p-1 border border-gray-300 rounded"
            >
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div className="mb-4">
            <strong>Tanggal Pengaduan:</strong> {new Date(pengaduan.created_at).toLocaleDateString()}
          </div>
        </>
      )}
    </div>
  );
};

export default PengaduanDetail;
