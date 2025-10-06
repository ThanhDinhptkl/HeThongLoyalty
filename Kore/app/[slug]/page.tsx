"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import LoginModal from "@/components/login-modal"
import Dashboard from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

export default function CustomerLoginPage() {
  const params = useParams()
  const restaurantSlug = params.slug as string

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; id: string; points: number } | null>(null)

  const handleLogin = (userData: { name: string; id: string; points: number }) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-pink-600 mr-2" />
            <span className="text-xl font-bold text-gray-800 capitalize">
              {restaurantSlug.replace("-", " ")} - Loyalty
            </span>
          </div>
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
            ← Quay lại
          </Button>
        </div>
      </header>

      {/* Login Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <h1 className="font-bold text-pink-600 mb-2 text-2xl">Welcome Thành Viên</h1>
            <p className="text-gray-600 capitalize font-bold">{restaurantSlug.replace("-", " ")}</p>
          </div>
          <LoginModal onLogin={handleLogin} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-pink-400 mr-2" />
            <span className="text-lg font-bold">F&B Loyalty</span>
          </div>
          <p className="text-gray-400">© 2025 F&B Loyalty. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
