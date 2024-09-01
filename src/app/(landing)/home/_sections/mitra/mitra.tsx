'use client'
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '@/styles/embla.css'; // Import file CSS custom

const partners = [
  { id: 1, src: '/images/partner1.png', alt: 'Partner 1' },
  { id: 2, src: '/images/partner2.png', alt: 'Partner 2' },
  { id: 3, src: '/images/partner3.png', alt: 'Partner 3' },
  { id: 4, src: '/images/partner4.png', alt: 'Partner 4' },
  { id: 5, src: '/images/partner5.png', alt: 'Partner 5' },
  { id: 6, src: '/images/partner6.png', alt: 'Partner 6' },
  { id: 7, src: '/images/partner7.png', alt: 'Partner 7' },
  { id: 8, src: '/images/partner8.png', alt: 'Partner 8' },
  { id: 9, src: '/images/partner9.png', alt: 'Partner 9' },
  { id: 10, src: '/images/partner10.png', alt: 'Partner 10' },
  { id: 11, src: '/images/partner11.png', alt: 'Partner 11' },
];

const PartnersCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });
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

  return (
    <section id="partners" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Kemitraan dan Dukungan</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {partners.map(partner => (
              <div key={partner.id} className="embla__slide">
                <div className="flex justify-center items-center p-4">
                  <img src={partner.src} alt={partner.alt} className="h-24 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
