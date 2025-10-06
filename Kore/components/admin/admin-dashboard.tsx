"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import DashboardContent from "@/components/admin/dashboard-content"
import PointsManagement from "@/components/admin/points-management"
import VoucherClaims from "@/components/admin/voucher-claims"
import CustomerManagement from "@/components/admin/customer-management"
import VoucherIssuance from "@/components/admin/voucher-issuance"
import SettingsManagement from "@/components/admin/settings-management"
import UserManagement from "@/components/admin/user-management"
import BannerManagement from "@/components/admin/banner-management"
import PromotionManagement from "@/components/admin/promotion-management"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminDashboardProps {
  user: {
    name: string
    role: string
  } | null
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [trialInfo] = useState({
    isTrial: true,
    daysLeft: 5, // Changed to 5 to show trial warning
    customerCount: 18,
    customerLimit: 30,
    expiryDate: "15/07/2023",
  })

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader userName={user?.name || ""} onLogout={onLogout} toggleSidebar={toggleSidebar} />

        {trialInfo.isTrial && trialInfo.daysLeft <= 7 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 md:mx-6 mt-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Tài khoản dùng thử - Còn {trialInfo.daysLeft} ngày
                  </p>
                  <p className="text-xs text-yellow-700">
                    Khách hàng: {trialInfo.customerCount}/{trialInfo.customerLimit} | Hết hạn: {trialInfo.expiryDate}
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Nâng cấp ngay
              </Button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "points" && <PointsManagement />}
          {activeSection === "vouchers" && <VoucherClaims />}
          {activeSection === "customers" && <CustomerManagement />}
          {activeSection === "issuance" && <VoucherIssuance />}
          {activeSection === "settings" && <SettingsManagement />}
          {activeSection === "users" && <UserManagement />}
          {activeSection === "banners" && <BannerManagement />}
          {activeSection === "promotions" && <PromotionManagement />}
        </main>
      </div>
    </div>
  )
}
