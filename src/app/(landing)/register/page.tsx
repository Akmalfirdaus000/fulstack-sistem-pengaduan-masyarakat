"use client"; // Pastikan ini ditambahkan untuk menjadikan komponen client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router Next.js 13+
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
        email,
      });
      
      // Lakukan sesuatu jika berhasil
      console.log(response.data);
    } catch (err: any) {
      // Tambahkan pengecekan apakah err.response ada atau tidak
      if (err.response) {
        console.error('Error Response:', err.response.data);
        alert(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        console.error('Error Request:', err.request);
        alert('Server tidak merespon. Coba lagi nanti.');
      } else {
        console.error('Error:', err.message);
        alert('Terjadi kesalahan. Coba lagi nanti.');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Sudah punya akun?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
