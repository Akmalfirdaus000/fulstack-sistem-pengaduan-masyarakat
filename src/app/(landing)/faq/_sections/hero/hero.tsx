// src/app/landing/faq/Hero/Hero.tsx

'use client'
import React from 'react';

const Hero = () => {
  return (
    <section id="faq-hero" className="py-16 bg-blue-600 mt-16">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-lg text-white mb-8">
          Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang layanan kami. Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Hubungi Kami
        </button>
      </div>
    </section>
  );
};

export default Hero;
