"use client"

import React, { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface LoginModalProps {
  onLogin: (userData: { name: string; id: string; points: number }) => void
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // ✅ Gọi API đăng nhập từ backend
      const res = await axios.post("http://localhost:4000/auth/login", {
        email: phone, // BE nhận email hoặc phone đều được
        password,
      })

      // ✅ Dữ liệu trả về từ backend
      const { token, user } = res.data

      // ✅ Lưu session vào localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(user))

      // ✅ Truyền dữ liệu cho FE để hiển thị
      onLogin({
        name: user.name,
        id: user.customerCode,
        points: user.points || 0,
      })
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Đăng nhập</CardTitle>
        <CardDescription className="text-center">
          Đăng nhập để xem điểm tích lũy và ưu đãi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại hoặc email</Label>
            <Input
              id="phone"
              type="text"
              placeholder="VD: 0912345678 hoặc email@gmail.com"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-gray-500">
          Chưa có tài khoản?{" "}
          <a href="#" className="text-pink-600 hover:underline">
            Đăng ký ngay
          </a>
        </div>
        <div className="text-sm text-center text-gray-500">
          <a href="#" className="text-pink-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
