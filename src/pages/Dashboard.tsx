import React from 'react';
import { Users, Eye, UserPlus, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Page Views"
          value="50.8K"
          change={2.5}
          icon={Eye}
        />
        <StatsCard
          title="Monthly Users"
          value="23.6K"
          change={-12.5}
          icon={Users}
        />
        <StatsCard
          title="New Sign Ups"
          value="756"
          change={3.2}
          icon={UserPlus}
        />
        <StatsCard
          title="Subscriptions"
          value="2.3K"
          change={8.9}
          icon={CreditCard}
        />
      </div>

      <div className="bg-[#0F1631] p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-6">Revenue Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243055" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F1631',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#22D3EE"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;