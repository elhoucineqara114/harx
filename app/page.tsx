import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Welcome to Unified Platform
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          A modern, unified monolith application built with Next.js, TypeScript, and Tailwind CSS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link
            href="/dashboard"
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Dashboard</h3>
            <p className="text-sm text-slate-600 mb-4">View your analytics and insights</p>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/matching"
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Matching</h3>
            <p className="text-sm text-slate-600 mb-4">Find and connect with others</p>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/profile"
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Profile</h3>
            <p className="text-sm text-slate-600 mb-4">Manage your account</p>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
