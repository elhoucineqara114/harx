import Link from 'next/link'
import { Bell, User, Menu } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-slate-900">
              Platform
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/matching"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Matching
              </Link>
              <Link
                href="/profile"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors md:hidden">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
