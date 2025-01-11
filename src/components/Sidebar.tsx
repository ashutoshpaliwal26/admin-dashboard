import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  Package,
  CheckSquare,
  Users,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: CreditCard, label: 'Pricing', path: '/pricing' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#0B1120] text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
        <span className="text-xl font-bold">Dashdark X</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;