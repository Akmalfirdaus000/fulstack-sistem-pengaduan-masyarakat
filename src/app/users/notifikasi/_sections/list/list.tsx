// src/pages/notifikasi/_section/isi/isi.tsx

'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';

interface Notification {
  id: number;
  pesan: string;
  tipe: 'info' | 'warning' | 'error';
  status: 'belum dibaca' | 'dibaca';
  created_at: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifikasi', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await axios.patch(`/api/notifikasi/${id}`, { status: 'dibaca' }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, status: 'dibaca' } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter((notif) =>
    notif.pesan.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Notifikasi
        </h1>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Cari notifikasi..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-4 w-full"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Memuat...</p>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg shadow-sm ${notif.status === 'belum dibaca' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400'} border-2`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className={`flex items-center text-sm font-medium ${notif.tipe === 'info' ? 'text-blue-600' : notif.tipe === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                      <FaBell className="mr-2" />
                      {notif.tipe.charAt(0).toUpperCase() + notif.tipe.slice(1)}
                    </div>
                    {notif.status === 'belum dibaca' && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  <p className="mb-2">{notif.pesan}</p>
                  <span className="text-xs text-gray-500">
                    {format(new Date(notif.created_at), 'dd MMM yyyy HH:mm')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Tidak ada notifikasi.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
