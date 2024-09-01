import React from 'react';

const statistics = [
  { value: '10,000+', label: 'Pengaduan Diterima' },
  { value: '8,500+', label: 'Pengaduan Diselesaikan' },
  { value: '500+', label: 'Pengaduan Sedang Diproses' },
  { value: '95%', label: 'Tingkat Kepuasan' }
];

const StatisticsSection = () => {
  return (
    <section id="statistics" className="bg-blue-600 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Statistik & Fakta Menarik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-4xl font-semibold text-blue-600">{stat.value}</p>
              <p className="text-lg font-medium text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
