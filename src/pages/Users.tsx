import React, { useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Carter',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Editor',
    status: 'Active',
    lastActive: '5 hours ago',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'User',
    status: 'Inactive',
    lastActive: '2 days ago',
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-[#0F1631] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Role</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'Active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-400">Showing 1-10 of 100 users</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;