import { FaPlus, FaHistory, FaQuestionCircle } from 'react-icons/fa';

const QuickLinks = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-6">
      <h2 className="text-xl font-semibold mb-2">Tautan Cepat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/users/pengaduan/form" className="flex items-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <FaPlus className="mr-2" />
          <span>Ajukan Pengaduan Baru</span>
        </a>
        <a href="/users/pengaduan/riwayat" className="flex items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <FaHistory className="mr-2" />
          <span>Riwayat Pengaduan</span>
        </a>
        <a href="/users/pesan" className="flex items-center p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          <FaQuestionCircle className="mr-2" />
          <span>Pesan</span>
        </a>
      </div>
    </div>
  );
};

export default QuickLinks;
