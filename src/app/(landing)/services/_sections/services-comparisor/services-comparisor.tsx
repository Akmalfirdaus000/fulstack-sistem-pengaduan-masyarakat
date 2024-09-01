// src/app/landing/services/ServiceComparison/ServiceComparison.tsx

'use client'
import React from 'react';

const ServiceComparison = () => {
  const services = [
    {
      name: 'Layanan A',
      features: {
        feature1: 'Akses 24/7',
        feature2: 'Dukungan Langsung',
        feature3: 'Integrasi API',
        feature4: 'Analitik Canggih',
        feature5: 'Customisasi',
      },
    },
    {
      name: 'Layanan B',
      features: {
        feature1: 'Akses 24/7',
        feature2: 'Dukungan Langsung',
        feature3: 'Analitik Canggih',
        feature4: '',
        feature5: '',
      },
    },
    {
      name: 'Layanan C',
      features: {
        feature1: 'Akses 24/7',
        feature2: 'Customisasi',
        feature3: 'Integrasi API',
        feature4: 'Pengelolaan Pengguna',
        feature5: 'Sistem Keamanan',
      },
    },
  ];

  return (
    <section id="service-comparison" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Perbandingan Layanan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 border-b">Fitur</th>
                {services.map((service, index) => (
                  <th key={index} className="p-4 border-b">{service.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(services[0].features).map((feature, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-4 border-b">{feature.replace('feature', 'Fitur ')}</td>
                  {services.map((service, serviceIndex) => (
                    <td key={serviceIndex} className="p-4 border-b">
                      {service.features[feature] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
