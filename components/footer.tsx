"use client"

import { Home, Gift, Ticket, Info, User } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface FooterProps {
  activeTab: string
  onTabChange: (tab: string) => void
  voucherCount?: number 
}

export default function Footer({ activeTab, onTabChange, voucherCount = 0 }: FooterProps) {
  const tabs = [
    { id: "home", label: "Trang chủ", icon: <Home className="w-5 h-5" /> },
    { id: "points", label: "Tích điểm", icon: <Gift className="w-5 h-5" /> },
    { id: "vouchers", label: "Ví voucher", icon: <Ticket className="w-5 h-5" /> },
    { id: "info", label: "Thông tin", icon: <Info className="w-5 h-5" /> },
    { id: "account", label: "Tài khoản", icon: <User className="w-5 h-5" /> },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorPos, setIndicatorPos] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab)
    const container = containerRef.current
    if (container && index >= 0) {
      const tabEl = container.children[index] as HTMLElement
      setIndicatorPos({ left: tabEl.offsetLeft, width: tabEl.offsetWidth })
    }
  }, [activeTab])

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="container mx-auto max-w-4xl relative">
        <div className="grid grid-cols-5 md:grid-cols-5 md:gap-4 md:py-2 relative" ref={containerRef}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex flex-col md:flex-row items-center justify-center py-3 md:py-2 md:px-4 md:rounded-lg md:hover:bg-gray-100 transition-colors relative ${
                activeTab === tab.id
                  ? "text-pink-600 md:bg-pink-50"
                  : "text-gray-500 hover:text-pink-500"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon}
              <span className="mt-1 md:mt-0 md:ml-2 text-xs md:text-sm">{tab.label}</span>

              {tab.id === "vouchers" && voucherCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {voucherCount}
                </span>
              )}
            </motion.button>
          ))}
          <motion.div
            className="absolute bottom-0 h-1 bg-pink-600 rounded-full"
            animate={{ left: indicatorPos.left, width: indicatorPos.width }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
      </div>
    </footer>
  )
}
