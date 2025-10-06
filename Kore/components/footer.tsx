"use client"

import { Home, Gift, Ticket, Info, User } from "lucide-react"

interface FooterProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
  const tabs = [
    { id: "home", label: "Trang chủ", icon: <Home className="w-5 h-5" /> },
    { id: "points", label: "Tích điểm", icon: <Gift className="w-5 h-5" /> },
    { id: "vouchers", label: "Ví voucher", icon: <Ticket className="w-5 h-5" /> },
    { id: "info", label: "Thông tin", icon: <Info className="w-5 h-5" /> },
    { id: "account", label: "Tài khoản", icon: <User className="w-5 h-5" /> },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-5 md:grid-cols-5 md:gap-4 md:py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-col md:flex-row items-center justify-center py-3 md:py-2 md:px-4 md:rounded-lg md:hover:bg-gray-100 transition-colors ${
                activeTab === tab.id ? "text-pink-600 md:bg-pink-50" : "text-gray-500 hover:text-pink-500"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon}
              <span className="mt-1 md:mt-0 md:ml-2 text-xs md:text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
