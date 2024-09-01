// src/app/landing/faq/FAQList/FAQList.tsx

'use client'
import React from 'react';
import useToggle from '@/hooks/useToggle';

const FAQList = () => {
  const [isExpanded, toggleExpand] = useToggle(false);

  const faqs = [
    { question: 'Apa itu layanan pengaduan masyarakat kami?', answer: 'Layanan pengaduan masyarakat kami adalah platform yang memungkinkan warga untuk mengajukan pengaduan mengenai berbagai isu seperti pelayanan publik, keamanan, dan fasilitas umum. Kami berkomitmen untuk memastikan setiap pengaduan ditangani dengan cepat dan profesional.' },
    { question: 'Bagaimana cara mendaftar untuk menggunakan layanan ini?', answer: 'Untuk mendaftar, kunjungi halaman pendaftaran dan lengkapi formulir dengan informasi yang diperlukan seperti nama, email, dan kata sandi. Setelah mendaftar, Anda akan menerima email konfirmasi dan dapat mulai menggunakan layanan kami.' },
    { question: 'Apa saja jenis pengaduan yang bisa diajukan?', answer: 'Anda dapat mengajukan pengaduan mengenai berbagai isu seperti layanan publik, kondisi jalan, masalah keamanan, dan fasilitas umum. Jika Anda memiliki pengaduan mengenai hal lain, jangan ragu untuk menghubungi kami.' },
    { question: 'Berapa lama waktu yang diperlukan untuk menanggapi pengaduan?', answer: 'Kami berusaha untuk menanggapi setiap pengaduan dalam waktu 48 jam setelah diterima. Waktu penyelesaian akhir akan bergantung pada kompleksitas isu yang diajukan dan koordinasi dengan pihak terkait.' },
    { question: 'Apakah layanan ini gratis?', answer: 'Ya, layanan pengaduan masyarakat kami sepenuhnya gratis untuk digunakan oleh semua warga. Tidak ada biaya pendaftaran atau biaya tambahan untuk mengajukan pengaduan.' },
    { question: 'Bagaimana cara menghubungi layanan pelanggan?', answer: 'Anda dapat menghubungi layanan pelanggan kami melalui email di support@contoh.com atau telepon di (021) 123-4567. Tim kami siap membantu Anda dengan pertanyaan atau masalah yang mungkin Anda hadapi.' },
    { question: 'Bisakah saya melacak status pengaduan saya?', answer: 'Ya, setelah Anda mengajukan pengaduan, Anda akan menerima nomor referensi yang dapat digunakan untuk melacak status pengaduan Anda. Anda juga dapat memeriksa status pengaduan melalui akun Anda di platform kami.' },
    { question: 'Apa yang harus dilakukan jika pengaduan saya tidak ditanggapi?', answer: 'Jika Anda merasa pengaduan Anda tidak mendapatkan tanggapan yang memadai, Anda dapat menghubungi layanan pelanggan kami untuk mendapatkan pembaruan. Kami akan memastikan bahwa setiap pengaduan mendapatkan perhatian yang layak.' }
  ];

  return (
    <section id="faq-list" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Daftar Pertanyaan Populer</h2>
        <div className="space-y-4">
          {faqs.slice(0, isExpanded ? faqs.length : 3).map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleExpand()}
                className="w-full text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium focus:outline-none"
              >
                {faq.question}
              </button>
              {isExpanded && (
                <div className="py-3 px-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => toggleExpand()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {isExpanded ? 'Tutup Semua' : 'Lihat Semua'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQList;
