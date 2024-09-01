// src/app/landing/_sections/Features.tsx

import { FaBullhorn, FaClock, FaEye } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Fitur Utama Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-blue-500 text-4xl mb-4">
              <FaBullhorn />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Pengaduan Cepat</h3>
            <p>Laporkan masalah Anda dengan mudah melalui platform kami yang intuitif dan responsif.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-green-500 text-4xl mb-4">
              <FaClock />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Respon Cepat</h3>
            <p>Tim kami akan merespons pengaduan Anda dalam waktu singkat dan memberikan solusi yang efektif.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-purple-500 text-4xl mb-4">
              <FaEye />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Transparansi</h3>
            <p>Ikuti perkembangan pengaduan Anda dengan sistem pelacakan yang transparan dan akurat.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
