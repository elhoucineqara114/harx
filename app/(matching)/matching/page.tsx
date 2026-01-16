import { Heart, X, Star } from 'lucide-react'

export default function MatchingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Find Matches</h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-lg">Profile Image</p>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sample Profile</h2>
            <p className="text-slate-600 mb-4">Location • Interests</p>
            <p className="text-slate-700">
              This is a sample profile description. In the actual implementation, this would contain real user data from your backend services.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 p-6 border-t border-slate-200">
            <button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center text-white shadow-lg">
              <X className="w-8 h-8" />
            </button>
            <button className="w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center text-white shadow-lg">
              <Star className="w-8 h-8" />
            </button>
            <button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center text-white shadow-lg">
              <Heart className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
