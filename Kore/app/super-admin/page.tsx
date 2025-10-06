"use client"

import { useState } from "react"
import SuperAdminLogin from "@/components/super-admin/super-admin-login"
import SuperAdminDashboard from "@/components/super-admin/super-admin-dashboard"

export default function SuperAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [superAdminUser, setSuperAdminUser] = useState<{ name: string; role: string } | null>(null)

  const handleLogin = (userData: { name: string; role: string }) => {
    setSuperAdminUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setSuperAdminUser(null)
    setIsLoggedIn(false)
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <SuperAdminLogin onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <SuperAdminDashboard user={superAdminUser} onLogout={handleLogout} />
      )}
    </main>
  )
}
