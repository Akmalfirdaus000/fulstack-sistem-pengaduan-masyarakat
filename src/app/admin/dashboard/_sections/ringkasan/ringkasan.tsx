// src/pages/admin/dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBullhorn, FaTools, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<{ new: number; inProgress: number; completed: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center space-y-4">
          <div className="text-6xl text-red-500">
            <FaBullhorn />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Pengaduan Baru</h2>
            <p className="text-3xl font-bold mx-auto flex justify-center">{stats.new}</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center space-y-4">
          <div className="text-6xl text-yellow-500">
            <FaTools />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Pengaduan Dalam Proses</h2>
            <p className="text-3xl font-bold flex justify-center">{stats.inProgress}</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center space-y-4">
          <div className="text-6xl text-green-500">
            <FaCheckCircle />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Pengaduan Selesai</h2>
            <p className="text-3xl font-bold flex justify-center">{stats.completed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
