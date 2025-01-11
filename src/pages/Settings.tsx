import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Palette, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, updateTheme } = useTheme();
  const { showToast } = useToast();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  const handleThemeChange = (newTheme: { primary: string; background: string; card: string }) => {
    updateTheme(newTheme);
    showToast('Theme updated successfully', 'success');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-[#0F1631] rounded-xl p-6">

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                      <User size={32} />
                    </div>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Carter"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-400">Receive emails about new features and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Update Password
                  </button>
                </div>

                <div className="border-t border-gray-800 pt-6 mt-6">
                  <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-400">Secure your account with 2FA</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-4">
                    Theme Colors
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">Primary Color</label>
                      <input
                        type="color"
                        value={theme.primary}
                        onChange={(e) => handleThemeChange({ ...theme, primary: e.target.value })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">Background Color</label>
                      <input
                        type="color"
                        value={theme.background}
                        onChange={(e) => handleThemeChange({ ...theme, background: e.target.value })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-400">
                    Theme Presets
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => handleThemeChange({
                        primary: '#9333EA',
                        background: '#070B16',
                        card: '#0F1631'
                      })}
                      className="p-4 rounded-lg bg-[#070B16] border border-gray-800 hover:border-purple-600"
                    >
                      <div className="w-full h-20 bg-[#0F1631] rounded-lg mb-2" />
                      <span className="text-sm">Dark Purple</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange({
                        primary: '#3B82F6',
                        background: '#0A1929',
                        card: '#132F4C'
                      })}
                      className="p-4 rounded-lg bg-[#0A1929] border border-gray-800 hover:border-blue-600"
                    >
                      <div className="w-full h-20 bg-[#132F4C] rounded-lg mb-2" />
                      <span className="text-sm">Ocean Blue</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange({
                        primary: '#10B981',
                        background: '#064E3B',
                        card: '#065F46'
                      })}
                      className="p-4 rounded-lg bg-[#064E3B] border border-gray-800 hover:border-emerald-600"
                    >
                      <div className="w-full h-20 bg-[#065F46] rounded-lg mb-2" />
                      <span className="text-sm">Emerald</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange({
                        primary: '#F59E0B',
                        background: '#292524',
                        card: '#44403C'
                      })}
                      className="p-4 rounded-lg bg-[#292524] border border-gray-800 hover:border-amber-600"
                    >
                      <div className="w-full h-20 bg-[#44403C] rounded-lg mb-2" />
                      <span className="text-sm">Amber Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content remains the same */}
        </div>
      </div>
    </div>
  );
};

export default Settings;