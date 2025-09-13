// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Eye, EyeOff, Shield } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// interface SuperAdminLoginProps {
//   onLogin: (userData: { name: string; role: string }) => void
// }

// export default function SuperAdminLogin({ onLogin }: SuperAdminLoginProps) {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       // Mock super admin user data
//       const userData = {
//         name: "Super Administrator",
//         role: "super_admin",
//       }

//       onLogin(userData)
//       setIsLoading(false)
//     }, 1000)
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <Card className="w-full shadow-lg border-2 border-red-200">
//       <CardHeader className="space-y-1 text-center">
//         <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
//           <Shield className="w-6 h-6 text-red-600" />
//         </div>
//         <CardTitle className="text-2xl text-red-600">Super Admin</CardTitle>
//         <CardDescription>Đăng nhập hệ thống quản trị tổng</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="username">Tên đăng nhập</Label>
//             <Input
//               id="username"
//               placeholder="superadmin"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Mật khẩu</Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>
//           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
//             {isLoading ? "Đang xử lý..." : "Đăng nhập"}
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <p className="text-sm text-center w-full text-gray-500">Chỉ dành cho quản trị viên hệ thống cấp cao nhất</p>
//       </CardFooter>
//     </Card>
//   )
// }
"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000"

interface SuperAdminLoginProps {
  onLogin: (userData: { name: string; role: string }) => void
}

export default function SuperAdminLogin({ onLogin }: SuperAdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier: username, password }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Sai thông tin đăng nhập")

      onLogin({ name: json.user?.full_name || "Super Admin", role: json.user?.role })

      if (json.user?.role === "super-admin") {
        window.location.href = "/super-admin"
      } else {
        alert("Bạn không có quyền Super Admin")
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-2 border-red-200">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-red-600" />
        </div>
        <CardTitle className="text-2xl text-red-600">Super Admin</CardTitle>
        <CardDescription>Đăng nhập hệ thống quản trị tổng</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full text-gray-500">Chỉ dành cho quản trị viên hệ thống cấp cao nhất</p>
      </CardFooter>
    </Card>
  )
}
