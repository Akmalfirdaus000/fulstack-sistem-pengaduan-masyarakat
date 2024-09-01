// src/app/landing/_sections/Services/Hero/hero.tsx

'use client'
import React from 'react';

const Hero = () => {
  return (
    <section id="services-hero" className="relative bg-blue-600 text-white py-16 px-6 lg:px-8 mt-16 ">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background design */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          aria-hidden="true"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#d782bc0b-d6cb-4d09-a542-8e9bdfc3dbb2)"
            fillOpacity="0.3"
            d="M317.291 530.326L59.518 678 0 529.992 315.027 413.112l293.229 115.476L317.291 530.326z"
          />
          <defs>
            <linearGradient
              id="d782bc0b-d6cb-4d09-a542-8e9bdfc3dbb2"
              x1="217.209"
              x2="500.37"
              y1="59.04"
              y2="427.21"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Layanan Kami
        </h1>
        <p className="mt-6 text-lg leading-8">
          Kami menyediakan berbagai layanan untuk membantu Anda dengan cepat dan efisien. Jelajahi layanan kami dan temukan solusi yang Anda butuhkan.
        </p>
        <div className="mt-8 flex justify-center gap-x-4">
          <a
            href="#explore-services"
            className="inline-block px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md border-white border hover:bg-blue-700"
          >
            Jelajahi Layanan
          </a>
          <a
            href="#contact-us"
            className="inline-block px-4 py-2 text-base font-medium text-blue-600 bg-white rounded-lg shadow-md hover:bg-gray-100"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
