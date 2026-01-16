import { User, Mail, MapPin, Calendar } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Profile</h1>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <User className="w-5 h-5" />
                    <span>Sample User</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-5 h-5" />
                    <span>user@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-5 h-5" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-5 h-5" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
                <p className="text-slate-600 leading-relaxed">
                  This is a sample profile description. In the actual implementation, this would be populated with real user data from your backend services.
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
