'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/sidebar/sidebar';
import axios from 'axios';
import { UserList } from './_sections';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get('/api/users/profile')
        .then(response => setUserData(response.data))
        .catch(error => {
          console.error('Gagal mendapatkan data pengguna:', error);
          router.push('/login');
        })
    }
  }, [router]);

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

        
        <div className='py-5'>
          <a href="/admin/manajemen-pengguna/form">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
              Tambah Data Pengguna
            </button>
          </a>
        </div>
        <UserList/>
      </div>
    </div>
  );
};

export default Dashboard;
