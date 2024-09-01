// src/app/landing/_sections/Testimonials.tsx

const Testimonials = () => {
    const testimonials = [
      {
        name: 'Andi S.',
        title: 'Warga Jakarta',
        feedback: 'Sistem pengaduan ini sangat membantu saya dalam melaporkan masalah di lingkungan sekitar. Responnya cepat dan solusinya efektif.',
      },
      {
        name: 'Dewi R.',
        title: 'Pengguna Terdaftar',
        feedback: 'Saya merasa sangat puas dengan layanan ini. Pengaduan saya langsung ditindaklanjuti tanpa harus menunggu lama.',
      },
      {
        name: 'Budi T.',
        title: 'Admin',
        feedback: 'Sebagai admin, platform ini sangat memudahkan saya dalam mengelola dan memproses pengaduan dari masyarakat.',
      },
    ];
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Apa Kata Pengguna Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-lg italic mb-6">{testimonial.feedback}</p>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  