"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { LogOut, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

interface HeaderProps {
  userName?: string
  onLogout: () => void
}

export default function Header({ userName, onLogout }: HeaderProps) {
  const { toast } = useToast()

  const avatars = [
    "/image/avatar1.jpg",
    "/image/avatar2.jpg",
    "/image/avatar3.jpg",
    "/image/avatar4.jpg",
    "/image/avatar5.jpg",
    "/image/avatar6.jpg",
    "/image/avatar7.jpg",
    "/image/avatar8.jpg",
    "/image/avatar9.jpg",
  ]

  const [currentAvatar, setCurrentAvatar] = useState<string>(
    () => localStorage.getItem("userAvatar") || avatars[0]
  )
  const [displayName, setDisplayName] = useState<string>("")

  // ✅ Khi load Header, nếu không có props thì lấy tên từ localStorage
  useEffect(() => {
    if (userName) {
      setDisplayName(userName)
    } else {
      const storedUser = localStorage.getItem("userData")
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser)
          setDisplayName(parsed.name || "Khách hàng")
        } catch {
          setDisplayName("Khách hàng")
        }
      }
    }
  }, [userName])

  // ✅ Lưu avatar
  useEffect(() => {
    localStorage.setItem("userAvatar", currentAvatar)
  }, [currentAvatar])

  const handleImageError = () => {
    setCurrentAvatar("/image/default-avatar.png")
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentAvatar(event.target.result as string)
          toast({
            title: "Đổi avatar thành công",
            description: "Avatar của bạn đã được cập nhật!",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container flex items-center justify-between p-4 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          {/* Avatar + Chọn ảnh */}
          <Popover>
            <PopoverTrigger asChild>
              <img
                src={currentAvatar}
                alt="Avatar"
                onError={handleImageError}
                className="h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-transform object-cover"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {avatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt={`Avatar ${idx + 1}`}
                    className={`h-12 w-12 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform ${
                      avatar === currentAvatar ? "ring-2 ring-pink-500" : ""
                    }`}
                    onClick={() => {
                      setCurrentAvatar(avatar)
                      toast({
                        title: "Đổi avatar thành công",
                        description: `Bạn đã chọn avatar số ${idx + 1}`,
                      })
                    }}
                  />
                ))}
              </div>
              <label className="flex items-center justify-center gap-2 text-sm text-pink-600 cursor-pointer hover:underline">
                <Upload className="h-4 w-4" />
                Tải ảnh lên
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </PopoverContent>
          </Popover>

          {/* ✅ Hiển thị tên người dùng */}
          <div>
            <span className="text-lg font-medium">Xin chào, </span>
            <span className="ml-1 text-lg font-bold text-pink-600">
              {displayName || "Khách hàng"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Hướng dẫn
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-gray-500 hover:text-pink-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="sr-only">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
