// src/app/landing/services/Certifications/Certifications.tsx

'use client'
import React from 'react';

const certifications = [
  { src: '/images/certification1.png', alt: 'Sertifikasi 1' },
  { src: '/images/certification2.png', alt: 'Sertifikasi 2' },
  { src: '/images/certification3.png', alt: 'Sertifikasi 3' },
  { src: '/images/certification4.png', alt: 'Sertifikasi 4' },
  { src: '/images/certification5.png', alt: 'Sertifikasi 5' },
  { src: '/images/certification6.png', alt: 'Sertifikasi 6' },
  { src: '/images/certification7.png', alt: 'Sertifikasi 7' },
  { src: '/images/certification8.png', alt: 'Sertifikasi 8' },
  { src: '/images/certification9.png', alt: 'Sertifikasi 9' },
  { src: '/images/certification10.png', alt: 'Sertifikasi 10' },
  { src: '/images/certification11.png', alt: 'Sertifikasi 11' },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Sertifikasi dan Penghargaan</h2>
        <div className="flex overflow-x-auto space-x-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex-shrink-0 w-32 h-32 bg-white flex items-center justify-center shadow-md rounded-lg">
              <img src={cert.src} alt={cert.alt} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
