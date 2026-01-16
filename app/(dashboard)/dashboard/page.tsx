'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Users, Briefcase, BookOpen, Phone, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Active Gigs',
      value: '12',
      change: '+4.5%',
      icon: Briefcase,
      color: 'blue',
    },
    {
      label: 'Total Reps',
      value: '48',
      change: '+12.3%',
      icon: Users,
      color: 'green',
    },
    {
      label: 'Calls Today',
      value: '23',
      change: '+8.1%',
      icon: Phone,
      color: 'purple',
    },
    {
      label: 'Training Completed',
      value: '89%',
      change: '+5.2%',
      icon: BookOpen,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-slate-700">Welcome, {user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/');
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600',
            }[stat.color];

            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                </div>
                <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {[
                { action: 'New gig created', time: '2 hours ago', color: 'blue' },
                { action: 'Rep onboarded', time: '4 hours ago', color: 'green' },
                { action: 'Training completed', time: '6 hours ago', color: 'purple' },
                { action: 'Call logged', time: '8 hours ago', color: 'orange' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 pb-4 border-b border-slate-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium">{item.action}</p>
                    <p className="text-slate-500 text-sm">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
              <Settings className="w-5 h-5 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Create Gig', href: '/wizards/gigs-creation', color: 'blue' },
                { label: 'Add Rep', href: '/wizards/reps-creation', color: 'green' },
                { label: 'View Calls', href: '/dashboard/calls', color: 'purple' },
                { label: 'Training', href: '/training', color: 'orange' },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => router.push(action.href)}
                  className={`p-4 rounded-lg border-2 border-${action.color}-200 hover:bg-${action.color}-50 transition-colors text-center`}
                >
                  <p className={`font-semibold text-${action.color}-700`}>{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
