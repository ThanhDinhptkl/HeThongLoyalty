"use client"

import { BarChart3, Building2, Settings, FileText, Shield, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuperAdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
}

export default function SuperAdminSidebar({ activeSection, onSectionChange, isOpen }: SuperAdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Tổng quan", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "restaurants", label: "Quản lý nhà hàng", icon: <Building2 className="h-5 w-5" /> },
    { id: "trials", label: "Tài khoản dùng thử", icon: <Clock className="h-5 w-5" /> },
    { id: "settings", label: "Cài đặt hệ thống", icon: <Settings className="h-5 w-5" /> },
    { id: "logs", label: "Nhật ký hệ thống", icon: <FileText className="h-5 w-5" /> },
  ]

  return (
    <aside className={cn("bg-red-800 text-white transition-all duration-300 ease-in-out", isOpen ? "w-64" : "w-16")}>
      <div className="p-4 flex items-center justify-center border-b border-red-700">
        <div className="bg-red-600 text-white p-2 rounded-lg">
          {isOpen ? (
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">Super Admin</span>
            </div>
          ) : (
            <Shield className="h-6 w-6" />
          )}
        </div>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex items-center w-full p-2 rounded-lg transition-colors",
                  activeSection === item.id ? "bg-red-600 text-white" : "text-red-200 hover:bg-red-700",
                )}
              >
                <span className="flex items-center justify-center w-5 h-5 mr-3">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
