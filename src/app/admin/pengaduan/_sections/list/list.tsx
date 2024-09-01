import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
}

const List = () => {
  const [pengaduan, setPengaduan] = useState<Pengaduan[]>([]);
  const [filteredPengaduan, setFilteredPengaduan] = useState<Pengaduan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const response = await axios.get('/api/admin/pengaduan');
        setPengaduan(response.data);
        setFilteredPengaduan(response.data);
        setLoading(false);
      } catch (error) {
        setError('Gagal mengambil data pengaduan.');
        setLoading(false);
      }
    };

    fetchPengaduan();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (!searchQuery) {
        setFilteredPengaduan(pengaduan);
        return;
      }
      const filtered = pengaduan.filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user_id.toString().includes(searchQuery)
      );
      setFilteredPengaduan(filtered);
    };

    filterData();
  }, [searchQuery, pengaduan]);

  const handleDetailClick = (id: number) => {
    router.push(`/admin/pengaduan/${id}`); // Navigate to detail page
  };

  const getStatusColor = (status: 'baru' | 'diproses' | 'selesai') => {
    switch (status) {
      case 'baru':
        return 'bg-yellow-200 text-yellow-800';
      case 'diproses':
        return 'bg-blue-200 text-blue-800';
      case 'selesai':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-600">Memuat...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau ID pengguna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Kategori</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Judul</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Deskripsi</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPengaduan.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{item.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.kategori}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.judul}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.deskripsi}</td>
                <td className={`px-4 py-3 text-sm font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleDetailClick(item.id)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
