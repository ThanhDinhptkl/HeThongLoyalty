"use client"

import { Menu, Bell, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SuperAdminHeaderProps {
  userName: string
  onLogout: () => void
  toggleSidebar: () => void
}

export default function SuperAdminHeader({ userName, onLogout, toggleSidebar }: SuperAdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm z-10 border-b-2 border-red-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-600 mr-2" />
            <h1 className="text-xl font-semibold text-red-600">Super Admin Panel</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-red-600">{userName.charAt(0)}</span>
                </div>
                <span className="hidden md:inline-block">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Super Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt bảo mật</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
