// src/app/landing/_sections/CTA.tsx

import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Siap untuk Berkontribusi?</h2>
        <p className="text-lg mb-8">Bergabunglah dengan komunitas kami dan laporkan masalah di lingkungan Anda sekarang juga.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/register">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200">
              Daftar Sekarang
            </button>
          </Link>
          <Link href="/pengaduan">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200">
              Buat Pengaduan
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
