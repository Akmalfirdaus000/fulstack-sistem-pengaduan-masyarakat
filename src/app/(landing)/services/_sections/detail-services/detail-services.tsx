// src/app/landing/services/ServiceDetails/ServiceDetails.tsx

'use client'
import React from 'react';

const ServiceDetails = () => {
  const details = [
    {
      title: 'Layanan A',
      description: 'Detail mendalam tentang Layanan A. Menyediakan informasi rinci tentang fitur, manfaat, dan proses penggunaan.',
    },
    {
      title: 'Layanan B',
      description: 'Detail mendalam tentang Layanan B. Menyediakan informasi rinci tentang fitur, manfaat, dan proses penggunaan.',
    },
    {
      title: 'Layanan C',
      description: 'Detail mendalam tentang Layanan C. Menyediakan informasi rinci tentang fitur, manfaat, dan proses penggunaan.',
    },
  ];

  return (
    <section id="service-details" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Detail Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {details.map((detail, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{detail.title}</h3>
              <p className="text-gray-600">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
