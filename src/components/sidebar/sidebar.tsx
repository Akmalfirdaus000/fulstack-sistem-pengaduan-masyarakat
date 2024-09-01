'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaClipboardList, FaQuestionCircle, FaComments, FaBell, FaCog, FaTimes, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
// Fungsi handleLogout di Frontend
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
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 max-h-max p-4 transition-width duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 text-white focus:outline-none"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaTimes className="text-xl rotate-45" />}
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4">
        <Link href="/admin/dashboard" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaTachometerAlt className="text-xl" />
          {isOpen && <span className="ml-2">Dashboard</span>}
        </Link>
        <Link href="/admin/manajemen-pengguna" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaUser className="text-xl" />
          {isOpen && <span className="ml-2">Manajemen Pengguna</span>}
        </Link>
        <Link href="/admin/pengaduan" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaClipboardList className="text-xl" />
          {isOpen && <span className="ml-2">Pengaduan</span>}
        </Link>
        <Link href="/admin/faq" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaQuestionCircle className="text-xl" />
          {isOpen && <span className="ml-2">FAQ</span>}
        </Link>
        <Link href="/admin/pesan" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaComments className="text-xl" />
          {isOpen && <span className="ml-2">Pesan</span>}
        </Link>
        <Link href="/admin/notifikasi" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaBell className="text-xl" />
          {isOpen && <span className="ml-2">Notifikasi</span>}
        </Link>
        <Link href="/admin/settings" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
          <FaCog className="text-xl" />
          {isOpen && <span className="ml-2">Pengaturan Akun</span>}
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
