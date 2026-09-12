'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: {
    id: string;
    name: string;
    permissions: Array<{ name: string }>;
  };
  isActive: boolean;
}

export default function AdminListPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'Manager',
  });

  // Fetch admin list
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/admin');
        if (!res.ok) throw new Error('Failed to fetch admins');
        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading admins');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Create new admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create admin');
      }

      // Refresh list
      const listRes = await fetch('/api/admin');
      const updated = await listRes.json();
      setAdmins(updated);
      setShowForm(false);
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'Manager',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating admin');
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const res = await fetch(`/api/admin?id=${adminId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete admin');

      setAdmins(admins.filter((a) => a.id !== adminId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting admin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Create Admin'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleCreateAdmin}
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Password (min 12 chars)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="px-4 py-2 border rounded-lg"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Create
            </button>
          </form>
        )}

        {/* Admin Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {admin.firstName} {admin.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {admin.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {admin.role.permissions.length} permissions
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        admin.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {admin.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
