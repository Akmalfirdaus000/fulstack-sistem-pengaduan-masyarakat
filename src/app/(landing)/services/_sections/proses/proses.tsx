// src/app/landing/services/ServiceProcess/ServiceProcess.tsx

'use client'
import React from 'react';

const ServiceProcess = () => {
  const steps = [
    { step: '1', description: 'Daftar akun untuk mulai menggunakan layanan kami.' },
    { step: '2', description: 'Pilih layanan yang sesuai dengan kebutuhan Anda.' },
    { step: '3', description: 'Lengkapi informasi yang diperlukan untuk memproses permintaan.' },
    { step: '4', description: 'Tunggu konfirmasi dan instruksi lebih lanjut dari tim kami.' },
  ];

  return (
    <section id="service-process" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Proses Layanan</h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                <span className="text-lg font-bold">{step.step}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{step.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
