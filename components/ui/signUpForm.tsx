"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

interface SignupModalProps {
  onSignup: (userData: { name: string; id: string; points: number }) => void
}

export default function SignupModal({ onSignup }: SignupModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }, // metadata
        },
      })

      if (error) {
        console.error("Đăng ký lỗi:", error.message)
        alert("Không thể đăng ký, vui lòng thử lại")
        return
      }

      if (data.user) {
        const userData = {
          name: data.user.user_metadata?.full_name || "Khách hàng",
          id: data.user.id,
          points: 0, // TODO: sau này query từ bảng loyalty_points
        }
        onSignup(userData)
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Đăng ký</CardTitle>
        <CardDescription className="text-center">Tạo tài khoản để bắt đầu tích điểm và nhận ưu đãi</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-gray-500">
          Đã có tài khoản?{" "}
          <a href="#" className="text-pink-600 hover:underline">
            Đăng nhập ngay
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
