// src/app/landing/services/UserSuccess/UserSuccess.tsx

'use client'
import React from 'react';

const successStories = [
  {
    name: 'Pengguna A',
    story: 'Kisah sukses Pengguna A dalam menggunakan layanan kami. Mereka sangat puas dan mendapatkan hasil yang diharapkan.',
    image: '/images/user-a.jpg',
  },
  {
    name: 'Pengguna B',
    story: 'Kisah sukses Pengguna B dengan layanan kami. Layanan kami membantu mereka mencapai tujuan yang mereka inginkan.',
    image: '/images/user-b.jpg',
  },
  {
    name: 'Pengguna C',
    story: 'Pengguna C memanfaatkan layanan kami dengan efektif dan mendapatkan manfaat yang luar biasa.',
    image: '/images/user-c.jpg',
  },
];

const UserSuccess = () => {
  return (
    <section id="user-success" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Kisah Sukses Pengguna</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <img src={story.image} alt={story.name} className="w-24 h-24 rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.name}</h3>
              <p className="text-gray-600 text-center">{story.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSuccess;
    