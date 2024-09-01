'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter untuk navigasi

interface Pengaduan {
  id: number;
  user_id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  foto: string | null;
  status: 'baru' | 'diproses' | 'selesai';
  created_at: string;
  User?: { username: string }; // Menambahkan informasi pengguna
}

const PengaduanDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter(); // Gunakan useRouter untuk navigasi
  const [pengaduan, setPengaduan] = useState<Pengaduan | null>(null);
  const [newStatus, setNewStatus] = useState<'baru' | 'diproses' | 'selesai'>('baru');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [adminId] = useState<number>(8); // ID admin yang diizinkan

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const response = await axios.get(`/api/admin/pengaduan/${id}`);
        setPengaduan(response.data);
        setNewStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pengaduan:', error);
        setError('Gagal mengambil detail pengaduan.');
        setLoading(false);
      }
    };

    if (id) {
      fetchPengaduan();
    }
  }, [id]);

  const handleStatusChange = async () => {
    if (!pengaduan) return;

    try {
      await axios.put(`/api/admin/pengaduan/${pengaduan.id}`, { status: newStatus });
      setPengaduan((prev) => (prev ? { ...prev, status: newStatus } : null));
      alert('Status pengaduan berhasil diperbarui.');
    } catch (error) {
      alert('Gagal memperbarui status pengaduan.');
    }
  };

  const handleSendMessage = async () => {
    if (!pengaduan || !message) return;

    try {
      await axios.post(`/api/admin/pesan`, {
        pengirim_id: adminId, // ID admin yang diizinkan
        penerima_id: pengaduan.user_id,
        isi: message,
      });
      alert('Pesan berhasil dikirim.');
      setMessage('');
      // Arahkan ke halaman admin pengaduan setelah pesan berhasil dikirim
      router.push('/admin/pengaduan');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Gagal mengirim pesan.');
    }
  };

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
      {pengaduan && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Detail Pengaduan</h2>

            {pengaduan.foto && (
              <div className="mb-4">
                <img src={pengaduan.foto} alt="Foto Pengaduan" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            )}

            <p className="text-gray-700">
              <strong>ID:</strong> {pengaduan.id}
            </p>
            <p className="text-gray-700">
              <strong>Pengguna:</strong> {pengaduan.User?.username || 'Tidak diketahui'}
            </p>
            <p className="text-gray-700">
              <strong>Kategori:</strong> {pengaduan.kategori}
            </p>
            <p className="text-gray-700">
              <strong>Judul:</strong> {pengaduan.judul}
            </p>
            <p className="text-gray-700">
              <strong>Deskripsi:</strong> {pengaduan.deskripsi}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {pengaduan.status}
            </p>
            <p className="text-gray-700">
              <strong>Tanggal:</strong> {new Date(pengaduan.created_at).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Ubah Status:
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'baru' | 'diproses' | 'selesai')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="baru">Baru</option>
                <option value="diproses">Diproses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>

            <button
              onClick={handleStatusChange}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Update Status
            </button>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">Kirim Pesan ke Pengguna</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tulis pesan..."
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              >
                Kirim Pesan
              </button>
            </div>

            <button
              onClick={() => router.push('/admin/pengaduan')}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengaduanDetail;
