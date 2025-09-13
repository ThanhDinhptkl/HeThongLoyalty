// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Building2, Lock, Mail, Hash, AlertCircle } from "lucide-react"

// interface PartnerLoginModalProps {
//   onLogin: (partnerData: {
//     restaurantCode: string
//     restaurantName: string
//     ownerName: string
//     role: string
//     slug: string
//   }) => void
// }

// export default function PartnerLoginModal({ onLogin }: PartnerLoginModalProps) {
//   const [restaurantCode, setRestaurantCode] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   // Mock partner data - in real app, this would come from API
//   const mockPartners = [
//     {
//       restaurantCode: "PHO001",
//       email: "admin@pho-co-hanoi.com",
//       password: "123456",
//       restaurantName: "Nhà hàng Phở Cổ Hà Nội",
//       slug: "pho-co-hanoi",
//       role: "owner",
//       ownerName: "Nguyễn Văn A",
//     },
//     {
//       restaurantCode: "COM002",
//       email: "owner@com-tam-saigon.com",
//       password: "123456",
//       restaurantName: "Cơm Tấm Sài Gòn",
//       slug: "com-tam-saigon",
//       role: "owner",
//       ownerName: "Trần Thị B",
//     },
//     {
//       restaurantCode: "BUN003",
//       email: "admin@bun-bo-hue.com",
//       password: "123456",
//       restaurantName: "Bún Bò Huế Authentic",
//       slug: "bun-bo-hue",
//       role: "owner",
//       ownerName: "Lê Văn C",
//     },
//   ]

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Find matching partner with all 3 fields
//       const partner = mockPartners.find(
//         (p) => p.restaurantCode === restaurantCode && p.email === email && p.password === password,
//       )

//       if (partner) {
//         // Store session data in localStorage
//         localStorage.setItem("partnerSession", JSON.stringify(partner))
//         // Call onLogin to switch to admin CMS directly
//         onLogin({
//           restaurantCode: partner.restaurantCode,
//           restaurantName: partner.restaurantName,
//           ownerName: partner.ownerName,
//           role: partner.role,
//           slug: partner.slug,
//         })
//       } else {
//         setError("Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại mã nhà hàng, email và mật khẩu.")
//       }
//     } catch (err) {
//       setError("Có lỗi xảy ra. Vui lòng thử lại sau.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Building2 className="h-8 w-8 text-pink-600" />
//         </div>
//         <CardTitle className="text-2xl font-bold text-gray-800">Đăng nhập đối tác</CardTitle>
//         <CardDescription>Dành cho chủ thương hiệu đã được Super Admin cấp quyền</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="restaurantCode" className="text-sm font-medium">
//               Mã nhà hàng <span className="text-red-500">*</span>
//             </Label>
//             <div className="relative">
//               <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="restaurantCode"
//                 type="text"
//                 placeholder="PHO001"
//                 value={restaurantCode}
//                 onChange={(e) => setRestaurantCode(e.target.value.toUpperCase())}
//                 className="pl-10 uppercase"
//                 required
//               />
//             </div>
//             <p className="text-xs text-gray-500">Mã được cấp bởi Super Admin</p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm font-medium">
//               Email đăng nhập <span className="text-red-500">*</span>
//             </Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="admin@restaurant.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password" className="text-sm font-medium">
//               Mật khẩu <span className="text-red-500">*</span>
//             </Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10"
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
//             {isLoading ? "Đang xác thực..." : "Đăng nhập với vai trò Chủ thương hiệu"}
//           </Button>
//         </form>

//         <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//           <h4 className="font-medium text-blue-800 mb-2">Tài khoản demo:</h4>
//           <div className="text-sm text-blue-600 space-y-2">
//             <div className="border-b border-blue-200 pb-2">
//               <p>
//                 <strong>Mã nhà hàng:</strong> PHO001
//               </p>
//               <p>
//                 <strong>Email:</strong> admin@pho-co-hanoi.com
//               </p>
//               <p>
//                 <strong>Mật khẩu:</strong> 123456
//               </p>
//             </div>
//             <div className="border-b border-blue-200 pb-2">
//               <p>
//                 <strong>Mã nhà hàng:</strong> COM002
//               </p>
//               <p>
//                 <strong>Email:</strong> owner@com-tam-saigon.com
//               </p>
//               <p>
//                 <strong>Mật khẩu:</strong> 123456
//               </p>
//             </div>
//             <div>
//               <p>
//                 <strong>Mã nhà hàng:</strong> BUN003
//               </p>
//               <p>
//                 <strong>Email:</strong> admin@bun-bo-hue.com
//               </p>
//               <p>
//                 <strong>Mật khẩu:</strong> 123456
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//           <p className="text-xs text-amber-700">
//             <strong>Lưu ý:</strong> Mã nhà hàng được cấp bởi Super Admin khi phê duyệt đăng ký. Đăng nhập thành công sẽ
//             có quyền Chủ thương hiệu với đầy đủ quyền quản lý.
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Lock, Mail, Hash, AlertCircle } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000"

interface PartnerLoginModalProps {
  onLogin: (partnerData: {
    restaurantCode: string
    restaurantName: string
    ownerName: string
    role: string
    slug: string
  }) => void
}

export default function PartnerLoginModal({ onLogin }: PartnerLoginModalProps) {
  const [restaurantCode, setRestaurantCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier: email, password, restaurantCode }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Sai thông tin đăng nhập")

      if (json.user?.role === "partner") {
        onLogin(json.user)
        window.location.href = "/partner"
      } else {
        setError("Bạn không có quyền Đối tác")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="h-8 w-8 text-pink-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">Đăng nhập đối tác</CardTitle>
        <CardDescription>Dành cho chủ thương hiệu đã được Super Admin cấp quyền</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantCode">Mã nhà hàng</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="restaurantCode"
                value={restaurantCode}
                onChange={(e) => setRestaurantCode(e.target.value.toUpperCase())}
                className="pl-10 uppercase"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
            {isLoading ? "Đang xác thực..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
