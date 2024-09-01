'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaExclamationCircle, FaHistory, FaBell, FaEnvelope, FaQuestionCircle, FaUser, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      // Mengirim permintaan logout ke API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gagal logout: ' + response.statusText);
      }

      // Hapus token dari localStorage
      localStorage.removeItem('token');

      // Arahkan pengguna ke halaman login atau halaman lain
      router.push('/login');
    } catch (error) {
      console.error('Error saat logout:', error);
      alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
    }
  };


  

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-blue-500 max-h-max p-4 transition-width duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 text-white focus:outline-none"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaTimes className="text-xl rotate-45" />}
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4">
        <Link href="/users/dashboard" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaHome className="text-xl" />
          {isOpen && <span className="ml-2">Dashboard</span>}
        </Link>
        <Link href="/users/pengaduan" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaExclamationCircle className="text-xl" />
          {isOpen && <span className="ml-2">Pengaduan</span>}
        </Link>
        <Link href="/users/riwayat-pengaduan" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaHistory className="text-xl" />
          {isOpen && <span className="ml-2">Riwayat Pengaduan</span>}
        </Link>
        <Link href="/users/notifikasi" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaBell className="text-xl" />
          {isOpen && <span className="ml-2">Notifikasi</span>}
        </Link>
        <Link href="/users/pesan" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaEnvelope className="text-xl" />
          {isOpen && <span className="ml-2">Pesan</span>}
        </Link>
        <Link href="/users/faq" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaQuestionCircle className="text-xl" />
          {isOpen && <span className="ml-2">FAQ</span>}
        </Link>
        <Link href="/users/profile" className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md">
          <FaUser className="text-xl" />
          {isOpen && <span className="ml-2">Profile</span>}
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:bg-red-600 p-2 rounded-md"
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
