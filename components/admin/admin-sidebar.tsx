"use client"

import { Home, Gift, Ticket, Users, Settings, Award, UserCog, ImageIcon, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
}

export default function AdminSidebar({ activeSection, onSectionChange, isOpen }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { id: "points", label: "Tích điểm", icon: <Gift className="h-5 w-5" /> },
    { id: "vouchers", label: "Claim voucher", icon: <Ticket className="h-5 w-5" /> },
    { id: "customers", label: "Khách hàng", icon: <Users className="h-5 w-5" /> },
    { id: "issuance", label: "Cấp voucher", icon: <Award className="h-5 w-5" /> },
    { id: "banners", label: "Banner", icon: <ImageIcon className="h-5 w-5" /> },
    { id: "promotions", label: "Khuyến mãi", icon: <Megaphone className="h-5 w-5" /> },
    { id: "settings", label: "Cài đặt", icon: <Settings className="h-5 w-5" /> },
    { id: "users", label: "Nhân viên", icon: <UserCog className="h-5 w-5" /> },
  ]

  return (
    <aside className={cn("bg-gray-800 text-white transition-all duration-300 ease-in-out", isOpen ? "w-64" : "w-16")}>
      <div className="p-4 flex items-center justify-center">
        <div className="bg-pink-600 text-white p-2 rounded-lg">
          {isOpen ? (
            <span className="font-bold text-lg">Nhà hàng Phố Cổ</span>
          ) : (
            <span className="font-bold text-lg">NHÀ</span>
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
                  activeSection === item.id ? "bg-pink-600 text-white" : "text-gray-300 hover:bg-gray-700",
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
