'use client'; // Menandai file ini sebagai client-side
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ambil token dari localStorage
          },
        });

        if (response.status !== 200) {
          router.push('/login'); // Redirect ke halaman login jika tidak terautentikasi
        }
      } catch (error) {
        router.push('/login'); // Redirect ke halaman login jika terjadi kesalahan
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
