// src/pages/users/dashboard/_section/summary/summary.tsx

import React from 'react';
import { FaRegFileAlt, FaSyncAlt, FaCheckCircle } from 'react-icons/fa';

interface SummaryProps {
  complaintSummary: {
    new: number;
    inProgress: number;
    completed: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ complaintSummary }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mt-6 flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Ringkasan Pengaduan</h2>
      <div className="w-full flex justify-around">
        <div className="text-center flex flex-col items-center">
          <FaRegFileAlt className="text-blue-500 text-5xl mb-2" />
          <p className="text-lg font-medium">Baru</p>
          <p className="text-3xl font-bold text-blue-600">{complaintSummary.new}</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <FaSyncAlt className="text-yellow-500 text-5xl mb-2" />
          <p className="text-lg font-medium">Diproses</p>
          <p className="text-3xl font-bold text-yellow-600">{complaintSummary.inProgress}</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-5xl mb-2" />
          <p className="text-lg font-medium">Selesai</p>
          <p className="text-3xl font-bold text-green-600">{complaintSummary.completed}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
