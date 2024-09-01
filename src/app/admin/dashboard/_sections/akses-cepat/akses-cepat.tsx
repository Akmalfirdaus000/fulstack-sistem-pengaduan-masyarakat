// src/pages/admin/dashboard/section/quick-access.tsx
import { FaUsers, FaQuestionCircle, FaCog } from 'react-icons/fa';

const QuickAccess: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6 shadow-lg rounded-lg mb-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Akses Cepat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 hover:bg-purple-100 transition-colors">
          <FaUsers className="text-3xl text-purple-600" />
          <a href="/admin/users" className="text-lg font-semibold text-gray-800 hover:text-purple-600">Manajemen Pengguna</a>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 hover:bg-indigo-100 transition-colors">
          <FaQuestionCircle className="text-3xl text-indigo-600" />
          <a href="/admin/faq" className="text-lg font-semibold text-gray-800 hover:text-indigo-600">Pengaduan</a>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 hover:bg-blue-100 transition-colors">
          <FaCog className="text-3xl text-blue-600" />
          <a href="/admin/settings" className="text-lg font-semibold text-gray-800 hover:text-blue-600">Pesan</a>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
