import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaReply, FaTrash } from 'react-icons/fa';

// Define the Pesan type
interface Pesan {
  id: number;
  pengirim_id: number;
  penerima_id: number;
  isi: string;
  created_at: string;
}

const PesanPage = () => {
  const [pesan, setPesan] = useState<Pesan[]>([]);
  const [selectedPesan, setSelectedPesan] = useState<Pesan | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch pesan data on component mount
    const fetchPesan = async () => {
      try {
        const response = await axios.get<Pesan[]>('/api/pesan');
        setPesan(response.data);
      } catch (error) {
        console.error('Gagal memuat pesan:', error);
      }
    };

    fetchPesan();
  }, []);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPesan) return;

    setLoading(true);

    try {
      await axios.post('/api/pesan/reply', {
        penerima_id: selectedPesan.penerima_id,
        isi: reply,
        pesan_id: selectedPesan.id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setReply('');
      setSelectedPesan(null);
      // Refresh pesan list
      const response = await axios.get<Pesan[]>('/api/pesan');
      setPesan(response.data);
    } catch (error) {
      console.error('Gagal membalas pesan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setLoading(true);

      try {
        await axios.post('/api/pesan/delete', { id }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Refresh pesan list
        const response = await axios.get<Pesan[]>('/api/pesan');
        setPesan(response.data);
      } catch (error) {
        console.error('Gagal menghapus pesan:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pesan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="messages-list border p-4 rounded shadow-lg">
          {pesan.map((msg) => (
            <div
              key={msg.id}
              className="message-item border-b py-2 flex justify-between items-center"
              onClick={() => setSelectedPesan(msg)}
            >
              <div>
                <p className="font-semibold">Pengirim ID: {msg.pengirim_id}</p>
                <p>{msg.isi}</p>
                <p className="text-gray-500 text-sm">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
              <div className="actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg.id);
                  }}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPesan && (
          <div className="message-detail border p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Balas Pesan</h2>
            <div className="message-content mb-4">
              <p><strong>Pengirim ID:</strong> {selectedPesan.pengirim_id}</p>
              <p><strong>Isi:</strong> {selectedPesan.isi}</p>
              <p><strong>Tanggal:</strong> {new Date(selectedPesan.created_at).toLocaleString()}</p>
            </div>
            <form onSubmit={handleReply}>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Tulis balasan Anda..."
                className="w-full p-2 border rounded mb-2"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? 'Mengirim...' : 'Kirim Balasan'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PesanPage;
