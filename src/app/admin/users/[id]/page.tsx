'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetail = () => {
  const params = useParams();
  const id = params?.id as string; // Pastikan bahwa id adalah string
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Gagal mengambil data pengguna.');
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Detail Pengguna</h1>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Nama: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {/* Anda dapat menambahkan detail pengguna lainnya di sini */}
        </div>
      ) : (
        <p>Pengguna tidak ditemukan.</p>
      )}
    </div>
  );
};

export default UserDetail;
