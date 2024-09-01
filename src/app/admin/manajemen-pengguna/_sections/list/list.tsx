import React, { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  active: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const userResponse = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData: User[] = await userResponse.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const username = typeof user.username === 'string' ? user.username : '';
    const email = typeof user.email === 'string' ? user.email : '';
    const search = searchTerm.toLowerCase();

    return username.toLowerCase().includes(search) || email.toLowerCase().includes(search);
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-500 font-bold';
      case 'user':
        return 'text-blue-500 font-bold';
      default:
        return 'text-gray-500';
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
    });
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
  
    if (type === 'checkbox') {
      // Ensure that e.target is an HTMLInputElement when type is 'checkbox'
      const { checked } = e.target as HTMLInputElement;
      setFormData(prevData => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // For other types (e.g., text, email, select), use value
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !editingUser) {
        console.error('No token or user found');
        return;
      }

      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setModalOpen(false);
        setEditingUser(null);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Cari pengguna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-2 border-black rounded-lg w-full"
        />
        <FaSearch className="ml-2 text-gray-500" />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Peran</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className={`border p-2 ${getRoleColor(user.role)}`}>{user.role}</td>
                    <td className={`border p-2 ${user.active ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>
                      {user.active ? 'Aktif' : 'Nonaktif'}
                    </td>
                    <td className="border p-2 flex space-x-2">
                      <button className="text-blue-500" onClick={() => handleEditClick(user)}><FaEdit /></button>
                      <button className="text-red-500" onClick={() => handleDelete(user.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border p-2 text-center">Tidak ada pengguna ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modal Edit User */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-2">Edit Pengguna</h2>
                <div className="mb-2">
                  <label className="block mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Peran</label>
                  <select
                    name="role"
                    value={formData.role || ''}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Status</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active || false}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Aktif</span>
                </div>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
