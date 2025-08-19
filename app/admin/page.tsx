"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<{ name: string; role: string } | null>(null)
  const router = useRouter()

  const handleLogin = (userData: { name: string; role: string }) => {
    setAdminUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setAdminUser(null)
    setIsLoggedIn(false)
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <AdminLogin onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <AdminDashboard user={adminUser} onLogout={handleLogout} />
      )}
    </main>
  )
}
