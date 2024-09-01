'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter } from 'react-icons/fa';
import Link from 'next/link';

interface Pengaduan {
  id: number;
  kategori: string;
  judul: string;
  status: string;
  created_at: string;
}

const DaftarRiwayatPengaduan = () => {
  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>([]);
  const [filteredPengaduan, setFilteredPengaduan] = useState<Pengaduan[]>([]);
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const response = await axios.get('/api/pengaduan');
        setPengaduanList(response.data);
        setFilteredPengaduan(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat pengaduan:', error);
      }
    };

    fetchPengaduan();
  }, []);

  useEffect(() => {
    const filtered = pengaduanList.filter((pengaduan) =>
      (kategori ? pengaduan.kategori === kategori : true) &&
      (status ? pengaduan.status === status : true) &&
      (search ? pengaduan.judul.toLowerCase().includes(search.toLowerCase()) : true)
    );
    setFilteredPengaduan(filtered);
  }, [search, kategori, status, pengaduanList]);

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'baru':
        return 'bg-yellow-100 text-yellow-800';
      case 'diproses':
        return 'bg-blue-100 text-blue-800';
      case 'selesai':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header dengan Pencarian dan Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-lg space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Riwayat Pengaduan</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari judul..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-blue-300 rounded-lg shadow-sm py-2 px-4 w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
          <div className="relative w-full md:w-auto">
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="border-2 border-blue-300 rounded-lg shadow-sm py-2 px-4 w-full md:w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Kategori</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Infrastruktur">Infrastruktur</option>
            </select>
            <FaFilter className="absolute right-3 top-3 text-gray-500" />
          </div>
          <div className="relative w-full md:w-auto">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-2 border-blue-300 rounded-lg shadow-sm py-2 px-4 w-full md:w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Status</option>
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
            <FaFilter className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tabel Riwayat Pengaduan */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full min-w-full bg-white border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Kategori</th>
              <th className="py-3 px-4 text-left">Judul</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Tanggal Pengajuan</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengaduan.map((pengaduan) => (
              <tr key={pengaduan.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{pengaduan.kategori}</td>
                <td className="py-2 px-4">{pengaduan.judul}</td>
                <td className="py-2 px-4">
                  <span className={`inline-flex items-center ${getStatusColor(pengaduan.status)} text-sm font-semibold px-2 py-1 rounded-full`}>
                    {pengaduan.status}
                  </span>
                </td>
                <td className="py-2 px-4">{new Date(pengaduan.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <Link href={`/users/riwayat-pengaduan/${pengaduan.id}`} className="text-blue-500 hover:underline">
                    Lihat Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarRiwayatPengaduan;
