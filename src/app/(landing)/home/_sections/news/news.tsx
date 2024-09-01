'use client'
import React from 'react';

const LatestNews = () => {
  const newsItems = [
    {
      title: 'Pengumuman Sistem Baru',
      date: '12 Agustus 2024',
      summary: 'Kami meluncurkan sistem pengaduan baru yang lebih cepat dan efisien. Baca selengkapnya untuk mengetahui fitur-fitur terbaru.',
    },
    {
      title: 'Maintenance Terjadwal',
      date: '10 Agustus 2024',
      summary: 'Sistem akan mengalami maintenance pada tanggal 15 Agustus 2024. Mohon maaf atas ketidaknyamanan yang mungkin terjadi.',
    },
    {
      title: 'Perubahan Kebijakan',
      date: '5 Agustus 2024',
      summary: 'Kami telah memperbarui kebijakan privasi kami. Silakan baca pembaruan terbaru untuk memastikan Anda memahami perubahan tersebut.',
    },
    {
      title: 'Peluncuran Fitur Baru',
      date: '1 Agustus 2024',
      summary: 'Fitur baru kami kini memungkinkan pelaporan langsung melalui aplikasi mobile. Pelajari cara menggunakan fitur ini dalam panduan kami.',
    },
  ];

  return (
    <section id="latest-news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Berita dan Pengumuman Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.map((news, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{news.date}</p>
              <p className="text-gray-700">{news.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
