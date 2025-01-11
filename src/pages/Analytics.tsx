import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import StatsCard from '../components/StatsCard';

const revenueData = [
  { month: 'Jan', revenue: 4000, target: 2400 },
  { month: 'Feb', revenue: 3000, target: 1398 },
  { month: 'Mar', revenue: 2000, target: 9800 },
  { month: 'Apr', revenue: 2780, target: 3908 },
  { month: 'May', revenue: 1890, target: 4800 },
  { month: 'Jun', revenue: 2390, target: 3800 },
];

const trafficSourceData = [
  { name: 'Direct', value: 400, color: '#8B5CF6' },
  { name: 'Social', value: 300, color: '#22D3EE' },
  { name: 'Referral', value: 300, color: '#F472B6' },
  { name: 'Organic', value: 200, color: '#34D399' },
];

const userActivityData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  users: Math.floor(Math.random() * 1000),
}));

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">Analytics Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value="85.4K"
          change={12.5}
          icon={Users}
        />
        <StatsCard
          title="Total Sales"
          value="$124.5K"
          change={8.2}
          icon={ShoppingBag}
        />
        <StatsCard
          title="Revenue"
          value="$45.2K"
          change={5.7}
          icon={DollarSign}
        />
        <StatsCard
          title="Growth"
          value="24.5%"
          change={2.1}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F1631] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Revenue vs Target</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243055" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1631',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#22D3EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0F1631] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Traffic Sources</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1631',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {trafficSourceData.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-sm text-gray-400">{source.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F1631] p-6 rounded-xl lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">User Activity (24h)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243055" />
                <XAxis dataKey="hour" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1631',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;