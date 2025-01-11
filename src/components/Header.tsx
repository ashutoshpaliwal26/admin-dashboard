import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[#0B1120] border-b border-gray-800">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Carter</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;