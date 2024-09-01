'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTag, FaRegClock, FaFileAlt, FaRegFileImage, FaArrowLeft, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

type Riwayat = {
  id: number;
  status: string;
  komentar: string;
  updated_at: string;
};

type PengaduanDetail = {
  id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  foto?: string;
  status: string;
  created_at: string;
  riwayat: Riwayat[];
};

const DetailPengaduan = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [pengaduanDetail, setPengaduanDetail] = useState<PengaduanDetail | null>(null);

  useEffect(() => {
    const fetchPengaduanDetail = async () => {
      try {
        const response = await axios.get(`/api/pengaduan/${id}`);
        setPengaduanDetail(response.data);
      } catch (error) {
        console.error('Error fetching pengaduan detail:', error);
      }
    };

    if (id) {
      fetchPengaduanDetail();
    }
  }, [id]);

  if (!pengaduanDetail) {
    return <div>Loading...</div>;
  }

  // Function to get status color and icon
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'baru':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <FaHourglassHalf className="text-yellow-500 mr-2" /> };
      case 'diproses':
        return { color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle className="text-blue-500 mr-2" /> };
      case 'selesai':
        return { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="text-green-500 mr-2" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <FaTimesCircle className="text-gray-500 mr-2" /> };
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Bagian Gambar */}
          {pengaduanDetail.foto && (
            <div className="bg-cover bg-center md:h-auto md:w-full">
              <img
                src={pengaduanDetail.foto}
                alt="Foto Pengaduan"
                className="object-cover w-full h-96 rounded-t-lg md:rounded-none md:rounded-l-lg"
              />
            </div>
          )}
          {/* Bagian Detail */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{pengaduanDetail.judul}</h1>
            <div className="flex items-center mb-4">
              <FaTag className="text-blue-500 mr-2" />
              <p className="text-sm text-gray-600 font-semibold">{pengaduanDetail.kategori}</p>
            </div>
            <div className="flex items-center mb-4">
              <FaRegClock className="text-green-500 mr-2" />
              <p className="text-sm text-gray-600">
                Diajukan pada: {new Date(pengaduanDetail.created_at).toLocaleString()}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h2>
              <p className="text-gray-700">{pengaduanDetail.deskripsi}</p>
            </div>
            {/* Status Pengaduan */}
            <div className="mb-4 flex items-center">
              <h2 className="text-lg font-semibold text-gray-800 mr-4">Status Saat Ini:</h2>
              <div className={`inline-flex items-center ${getStatusIndicator(pengaduanDetail.status).color} text-sm font-semibold mr-2 px-4 py-1 rounded-full`}>
                {getStatusIndicator(pengaduanDetail.status).icon}
                {pengaduanDetail.status}
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Status dan Tombol Kembali */}
        <div className="p-6 bg-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Riwayat Status</h2>
          <button
            onClick={() => router.push('/users/riwayat-pengaduan')}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Kembali
          </button>
        </div>

        {/* Daftar Riwayat Status */}
        <div className="p-6 bg-gray-100">
          <ul className="space-y-4">
            {pengaduanDetail.riwayat && pengaduanDetail.riwayat.map((riwayat) => (
              <li key={riwayat.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">
                    {new Date(riwayat.updated_at).toLocaleString()}
                  </p>
                  <span className={`inline-flex items-center ${getStatusIndicator(riwayat.status).color} text-sm font-semibold px-2 py-1 rounded-full`}>
                    {getStatusIndicator(riwayat.status).icon}
                    {riwayat.status}
                  </span>
                </div>
                <p className="text-gray-700">{riwayat.komentar}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPengaduan;
