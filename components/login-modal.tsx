// components/login-modal.tsx (hoặc file bạn đang dùng)
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000";

type LoginModalProps = {
  onLogin: (user: { name: string; id: string | number; points: number }) => void;
};

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [identifier, setIdentifier] = useState("") // email hoặc phone
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
      let payload: any = { password }
      if (identifier.includes("@")) {
      payload.email = identifier
      } else {
      let phone = identifier.replace(/\D/g, "")
      if (phone.startsWith("0")) phone = phone.substring(1)
      payload.phone = `+84${phone}`
      // payload.phone = phone
      }
   try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Login failed")

      onLogin({
        name: json.user?.full_name || "Khách hàng",
        id: json.user?.id,
        points: 0,
      })

      // Redirect theo role
      const role = json.user?.role
      if (role === "admin") window.location.href = "/admin"
      else if (role === "partner") window.location.href = "/partner"
      else if (role === "super-admin") window.location.href = "/super-admin"
      else window.location.href = "/"
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert("Đăng nhập thất bại")
      }
    } finally {
      setIsLoading(false)
    }
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
            <Label htmlFor="identifier">Email hoặc SĐT</Label>
            <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {/* links phụ */}
      </CardFooter>
    </Card>
  )
}
