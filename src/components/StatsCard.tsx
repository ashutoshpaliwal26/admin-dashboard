import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon }) => {
  const isPositive = change > 0;

  return (
    <div className="bg-[#0F1631] p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <Icon className="text-purple-600" size={20} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;