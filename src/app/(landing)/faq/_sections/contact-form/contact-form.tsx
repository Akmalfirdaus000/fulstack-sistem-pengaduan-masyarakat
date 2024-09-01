// src/app/landing/faq/ContactForm/ContactForm.tsx

'use client'
import React from 'react';

const ContactForm = () => {
  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ajukan Pertanyaan</h2>
        <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nama</label>
            <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Pesan</label>
            <textarea id="message" name="message" rows="4" className="w-full p-3 border border-gray-300 rounded-md"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            Kirim Pertanyaan
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
