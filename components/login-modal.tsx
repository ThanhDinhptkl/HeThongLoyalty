"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000";

type LoginModalProps = {
  onLogin: (user: { name: string; id: string | number; points?: number }) => void;
};

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // bắt buộc để cookie HttpOnly từ server được gửi về
        body: JSON.stringify({ identifier, password }),
      });

      const text = await res.text();
      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Phản hồi không hợp lệ từ server");
      }

      if (!res.ok) {
        throw new Error(json.error || "Đăng nhập thất bại");
      }

      if (!json.user || !json.profile) {
        throw new Error("Phản hồi thiếu thông tin user hoặc profile");
      }

      // Cập nhật state của app bằng dữ liệu profile
      onLogin({
        name: json.profile?.full_name || "Khách hàng",
        id: json.profile?.id || json.user?.id || "",
        points: json.profile?.points || 0,
      });

      // Điều hướng theo role
      switch (json.profile?.role) {
        case "super-admin":
          router.push("/super-admin");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "partner":
          router.push("/partner");
          break;
        case "customer":
          router.push("/customer");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Đăng nhập</CardTitle>
        <CardDescription className="text-center">
          Đăng nhập để xem điểm tích lũy và ưu đãi
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email hoặc SĐT</Label>
            <Input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 relative">
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2" />
    </Card>
  );
}
