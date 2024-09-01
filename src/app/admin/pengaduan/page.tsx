// /pages/dashboard.tsx atau /pages/admin/pengaduan.tsx (sesuaikan dengan struktur file Anda)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/sidebar/sidebar';
import axios from 'axios';
import { DaftarPengaduan } from './_sections';
import { Ringkasan } from '../dashboard/_sections';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [pengaduan, setPengaduan] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Mengambil data profil pengguna
      axios.get('/api/users/profile')
        .then(response => setUserData(response.data))
        .catch(error => {
          console.error('Gagal mendapatkan data pengguna:', error);
          router.push('/login');
        });

      // Mengambil data pengaduan
      axios.get('/api/pengaduan')
        .then(response => setPengaduan(response.data))
        .catch(error => {
          console.error('Gagal mendapatkan data pengaduan:', error);
        });
    }
  }, [router]);

  const handleEdit = (pengaduan: any) => {
    // Logika untuk edit pengaduan
    console.log('Edit pengaduan:', pengaduan);
  };

  const handleDelete = (id: number) => {
    // Logika untuk hapus pengaduan
    console.log('Hapus pengaduan dengan ID:', id);
  };

  if (!userData) {
    return <p>Memuat...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Dashboard Pengguna</h1>
        <p className="mt-2 text-lg ">Selamat Datang, <b className=''>{userData.username}!</b></p>
        <p className="mt-4">Di sini Anda bisa mengelola pengaduan Anda dan melihat statusnya.</p>
        <Ringkasan/>
        <div className="my-4">
          <DaftarPengaduan
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
