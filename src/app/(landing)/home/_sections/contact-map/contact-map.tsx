import React from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Pastikan Anda telah menginstal @heroicons/react

const contactData = [
  {
    type: 'location',
    title: 'Alamat:',
    description: 'Kantor Kepolisian Jakarta, Jl. Jenderal Sudirman No.55, Jakarta',
    icon: <MapPinIcon className="h-6 w-6 text-blue-600" />
  },
  {
    type: 'phone',
    title: 'Telepon:',
    description: '+62 21 12345678',
    icon: <PhoneIcon className="h-6 w-6 text-blue-600" />
  },
  {
    type: 'email',
    title: 'Email:',
    description: 'info@jakartapolice.com',
    icon: <EnvelopeIcon className="h-6 w-6 text-blue-600" />
  }
];

const ContactMap = () => {
  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Kontak & Lokasi Kami</h2>
        
        <div className="flex flex-col lg:flex-row lg:space-x-8 items-start">
          {/* Konten Kontak */}
          <div className="lg:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hubungi Kami</h3>
            <p className="text-gray-600 text-lg mb-6">
              Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut, jangan ragu untuk menghubungi kami melalui detail di bawah ini.
            </p>
            <div className="space-y-6">
              {contactData.map((item, index) => (
                <div key={index} className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md space-x-4">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peta Google */}
          <div className="lg:w-1/2 w-full h-[450px] rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3156677407346!2d106.80610788885498!3d-6.222041899999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f151b2877389%3A0x8875c0838820a822!2sPolda%20Metro%20Jaya!5e0!3m2!1sen!2sid!4v1723976049890!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor Kepolisian Jakarta"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
