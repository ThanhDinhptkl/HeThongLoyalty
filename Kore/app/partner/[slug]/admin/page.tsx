"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function RestaurantAdminPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantSlug = params.slug as string

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<{ name: string; role: string; restaurant: string } | null>(null)

  // Check for existing session on component mount
  useEffect(() => {
    const storedSession = localStorage.getItem("partnerSession")
    if (storedSession) {
      const parsedData = JSON.parse(storedSession)
      // Ensure the slug matches the current page's slug
      if (parsedData.slug === restaurantSlug) {
        setAdminUser({
          name: parsedData.ownerName,
          role: parsedData.role,
          restaurant: parsedData.restaurantName,
        })
        setIsLoggedIn(true)
      } else {
        // If slug doesn't match, clear session and redirect to homepage or login
        localStorage.removeItem("partnerSession")
        router.push("/") // Redirect to homepage if session is for a different restaurant
      }
    }
  }, [restaurantSlug, router])

  const handleLogin = (userData: { name: string; role: string }) => {
    const newAdminUser = {
      ...userData,
      restaurant: restaurantSlug,
    }
    setAdminUser(newAdminUser)
    setIsLoggedIn(true)
    // Store this session as well, assuming it's a valid login for this restaurant
    localStorage.setItem(
      "partnerSession",
      JSON.stringify({
        restaurantCode: "", // Not provided by AdminLogin, placeholder
        restaurantName: restaurantSlug.replace("-", " "), // Infer from slug
        ownerName: userData.name,
        role: userData.role,
        slug: restaurantSlug,
      }),
    )
  }

  const handleLogout = () => {
    setAdminUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("partnerSession") // Clear session on logout
    router.push("/") // Redirect to homepage after logout
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {restaurantSlug.replace("-", " ")} - Admin Panel
              </h1>
              <p className="text-gray-600">Đăng nhập vào hệ thống quản trị đối tác</p>
            </div>
            <AdminLogin onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <AdminDashboard user={adminUser} onLogout={handleLogout} />
      )}
    </main>
  )
}
