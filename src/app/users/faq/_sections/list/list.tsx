'use client'
// src/pages/faq/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

interface FAQ {
  id: number;
  pertanyaan: string;
  jawaban: string;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('/api/faq');
        setFaqs(response.data);
      } catch (error) {
        console.error('Gagal mengambil data FAQ:', error);
      }
    };

    fetchFAQs();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(
        faqs.filter(faq =>
          faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, faqs]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari FAQ..."
            className="w-full py-2 px-4 border rounded-lg shadow-sm"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500" />
        </div>
      </div>
      <ul>
        {filteredFaqs.map((faq) => (
          <li key={faq.id} className="mb-4">
            <h2 className="text-xl font-semibold">{faq.pertanyaan}</h2>
            <p className="mt-2">{faq.jawaban}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;
