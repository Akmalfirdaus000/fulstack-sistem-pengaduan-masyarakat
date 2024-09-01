'use client'

import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// Tipe untuk data pengaduan
interface RecentComplaint {
  judul: string;
  status: string;
  deskripsi: string;
  kategori: string;
}

// Warna status berdasarkan status pengaduan
const statusColors: Record<string, string> = {
  baru: 'bg-yellow-100 text-yellow-800',
  diproses: 'bg-blue-100 text-blue-800',
  selesai: 'bg-green-100 text-green-800',
};

// Ikon kategori berdasarkan kategori pengaduan
const categoryIcons: Record<string, React.ReactNode> = {
  Kebersihan: <FaInfoCircle />,
  Keamanan: <FaExclamationTriangle />,
  Infrastruktur: <FaCheckCircle />,
};

const RecentComplaintCard = ({ complaint }: { complaint: RecentComplaint }) => {
  if (!complaint) {
    return <p>Memuat status pengaduan terbaru...</p>;
  }

  const { judul, status, deskripsi, kategori } = complaint;
  const statusColor = statusColors[status] || 'bg-gray-100 text-gray-800';
  const categoryIcon = categoryIcons[kategori] || <FaInfoCircle />;

  return (
    <div className={`flex items-center p-4 mb-4 border rounded-md shadow-sm ${statusColor}`}>
      <div className="mr-4 text-2xl">
        {categoryIcon}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{judul}</h2>
        <p className="mt-1"><strong>Status:</strong> {status}</p>
        <p className="mt-1"><strong>Kategori:</strong> {kategori}</p>
        <p className="mt-2">{deskripsi}</p>
      </div>
    </div>
  );
};

export default RecentComplaintCard;
