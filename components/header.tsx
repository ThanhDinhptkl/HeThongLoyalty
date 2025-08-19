"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  userName: string
  onLogout: () => void
}

export default function Header({ userName, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container flex items-center justify-between p-4 mx-auto max-w-4xl">
        <div className="flex items-center">
          <div className="hidden md:block mr-2">
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10 w-10" />
          </div>
          <div>
            <span className="text-lg font-medium">Xin chào, </span>
            <span className="ml-1 text-lg font-bold text-pink-600">{userName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Hướng dẫn
          </Button>
          <Button variant="ghost" size="icon" onClick={onLogout} className="text-gray-500 hover:text-pink-600">
            <LogOut className="w-5 h-5" />
            <span className="sr-only">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
