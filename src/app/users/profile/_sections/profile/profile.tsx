import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEdit, FaSave } from 'react-icons/fa';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  image?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get<UserProfile>('/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Terjadi kesalahan tak terduga.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedProfile(profile || {});
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await axios.put('/api/profile', updatedProfile, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfile(response.data);
      setError(null);
      setEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Gagal memperbarui profil.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {profile ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-4">
            <img
              className="w-24 h-24 mb-4 rounded-full"
              src={profile.image || '/default-profile.png'}
              alt="Profile"
            />
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          {editing ? (
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={updatedProfile.username || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={updatedProfile.email || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSaveClick}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      ) : (
        <p>Profil tidak ditemukan.</p>
      )}
    </div>
  );
};

export default ProfilePage;
