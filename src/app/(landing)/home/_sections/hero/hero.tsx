import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0  opacity-50" />
      <div className="relative z-10 text-center p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span className="block">Selamat Datang di</span>
          <span className="block text-yellow-300">Sistem Pengaduan Masyarakat</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Platform kami menawarkan solusi cepat dan efektif untuk menangani pengaduan Anda. Bergabunglah dengan kami untuk pengalaman yang lebih baik dalam melaporkan dan menyelesaikan masalah.
        </p>
        <Link href="/services" passHref>
          <button className="inline-block bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
            Lihat Layanan Kami
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
