'use client'
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '@/styles/embla.css'; // Import file CSS custom

const HowItWorksCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', containScroll: 'trimSnaps' });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      
      // Auto-slide function
      const autoSlide = () => {
        if (emblaApi) {
          emblaApi.scrollNext();
        }
      };

      intervalRef.current = setInterval(autoSlide, 3000); // Change slide every 3 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [emblaApi]);

  const steps = [
    {
      title: 'Langkah 1: Pengaduan Masuk',
      description: 'Pengguna mengirimkan pengaduan melalui formulir yang disediakan di website.',
      points: [
        'Pengguna melengkapi form pengaduan dengan detail yang diperlukan.',
        'Pengaduan dapat disertai dengan bukti seperti foto atau video.',
        'Setelah dikirim, pengguna akan menerima konfirmasi pengaduan via email.'
      ]
    },
    {
      title: 'Langkah 2: Verifikasi Data',
      description: 'Pengaduan yang masuk akan diverifikasi oleh admin untuk memastikan validitas data.',
      points: [
        'Admin memeriksa kelengkapan data pengaduan.',
        'Verifikasi dilakukan dalam waktu maksimal 24 jam setelah pengaduan diterima.',
        'Pengguna akan dihubungi jika terdapat kekurangan dalam pengaduan.'
      ]
    },
    {
      title: 'Langkah 3: Proses Pengaduan',
      description: 'Setelah pengaduan diverifikasi, pengaduan akan diteruskan kepada pihak terkait untuk diproses.',
      points: [
        'Pengaduan diteruskan ke departemen terkait untuk ditindaklanjuti.',
        'Pengguna dapat memantau status pengaduan melalui dashboard.',
        'Jika diperlukan, pengguna dapat memberikan informasi tambahan.'
      ]
    },
    {
      title: 'Langkah 4: Tindak Lanjut',
      description: 'Pihak terkait akan memberikan tanggapan dan solusi atas pengaduan yang diajukan.',
      points: [
        'Pengguna menerima update mengenai tindakan yang diambil melalui email.',
        'Solusi yang diberikan disesuaikan dengan jenis pengaduan.',
        'Pengguna dapat memberikan feedback mengenai solusi yang diberikan.'
      ]
    },
    {
      title: 'Langkah 5: Penyelesaian',
      description: 'Setelah masalah diselesaikan, pengguna akan mendapatkan notifikasi bahwa pengaduan telah ditangani.',
      points: [
        'Pengaduan ditandai sebagai selesai dalam sistem.',
        'Pengguna menerima laporan penyelesaian pengaduan.',
        'Pengguna dapat mengajukan banding jika merasa pengaduan belum terselesaikan dengan baik.'
      ]
    },
    {
      title: 'Langkah 6: Penyelesaian',
      description: 'Setelah masalah diselesaikan, pengguna akan mendapatkan notifikasi bahwa pengaduan telah ditangani.',
      points: [
        'Pengaduan ditandai sebagai selesai dalam sistem.',
        'Pengguna menerima laporan penyelesaian pengaduan.',
        'Pengguna dapat mengajukan banding jika merasa pengaduan belum terselesaikan dengan baik.'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Cara Kerja Layanan</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex justify-center">
            {steps.map((step, index) => (
              <div key={index} className="embla__slide flex-none w-full sm:w-1/2 lg:w-1/3 px-0">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="list-disc list-inside text-left text-gray-600">
                    {step.points.map((point, idx) => (
                      <li key={idx} className="mb-2">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCarousel;
