"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginModalProps {
  onLogin: (userData: { name: string; id: string; points: number }) => void
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock user data - in a real app, this would come from your backend
      const userData = {
        name: "Nguyễn Văn A",
        id: "MEM12345",
        points: 2500,
      }

      onLogin(userData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Đăng nhập</CardTitle>
        <CardDescription className="text-center">Đăng nhập để xem điểm tích lũy và ưu đãi</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0912345678"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
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
