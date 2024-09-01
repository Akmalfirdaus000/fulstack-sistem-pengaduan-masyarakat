'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddData = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    active: true,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
  
    if (type === 'checkbox') {
      // Ensure that e.target is an HTMLInputElement when type is 'checkbox'
      const { checked } = e.target as HTMLInputElement;
      setFormData(prevData => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // For other types (e.g., text, email, select), use value
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post('/api/users', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Data added successfully');
        router.push('/admin/manajemen-pengguna'); // Redirect after successful submission
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Data Pengguna</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Peran</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              className="mr-2"
            />
            Aktif
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Tambah Data
        </button>
      </form>
    </div>
  );
};

export default AddData;
