import Link from 'next/link';
import { ArrowRight, Building2, Users, BookOpen, Brain, TrendingUp, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Welcome to Harx Platform
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your unified platform for sales enablement, training, and intelligent matching
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link
            href="/dashboard"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-blue-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Dashboard</h3>
            <p className="text-slate-600 text-sm">
              View analytics, calls, and integrations in one place
            </p>
          </Link>

          <Link
            href="/auth/login"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-green-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Authentication</h3>
            <p className="text-slate-600 text-sm">
              Login or register to access the platform
            </p>
          </Link>

          <Link
            href="/wizards/company-search"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-purple-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Company Search</h3>
            <p className="text-slate-600 text-sm">
              Find and connect with companies using our wizard
            </p>
          </Link>

          <Link
            href="/matching"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-orange-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-orange-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Matching</h3>
            <p className="text-slate-600 text-sm">
              AI-powered matching for reps and opportunities
            </p>
          </Link>

          <Link
            href="/training"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-cyan-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-cyan-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Training Platform</h3>
            <p className="text-slate-600 text-sm">
              Access training materials and courses
            </p>
          </Link>

          <Link
            href="/copilot"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-pink-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Brain className="w-6 h-6 text-pink-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-pink-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Copilot</h3>
            <p className="text-slate-600 text-sm">
              Get AI-powered assistance and recommendations
            </p>
          </Link>

          <Link
            href="/knowledgebase"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-teal-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Knowledge Base</h3>
            <p className="text-slate-600 text-sm">
              Browse documentation and resources
            </p>
          </Link>

          <Link
            href="/wizards/gigs-creation"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-amber-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Settings className="w-6 h-6 text-amber-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Gigs Creation</h3>
            <p className="text-slate-600 text-sm">
              Create and manage gigs with AI assistance
            </p>
          </Link>

          <Link
            href="/wizards/reps-creation"
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-emerald-400"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Reps Creation</h3>
            <p className="text-slate-600 text-sm">
              Create and onboard new sales representatives
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
