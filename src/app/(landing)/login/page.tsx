"use client"; // Tambahkan ini di bagian atas file

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // gunakan 'next/navigation' untuk App Router (Next.js 13+)
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const updateLoginStatus = async (token: string) => {
    try {
      await fetch('/api/admin/user-status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Gagal memperbarui status login:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiEndpoint = isAdmin ? '/api/auth/admin-login' : '/api/auth/login';
      const response = await axios.post(apiEndpoint, { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token); // Simpan token di localStorage
      
      // Update status login
      await updateLoginStatus(token);

      router.push(isAdmin ? '/admin/dashboard' : '/users/dashboard'); // Redirect sesuai peran setelah login berhasil
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span className="ml-2 text-sm text-gray-600">Login as Admin</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
