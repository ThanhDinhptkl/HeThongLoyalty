"use client"

import { useState } from "react"
import SuperAdminHeader from "@/components/super-admin/super-admin-header"
import SuperAdminSidebar from "@/components/super-admin/super-admin-sidebar"
import RestaurantManagement from "@/components/super-admin/restaurant-management"
import SystemOverview from "@/components/super-admin/system-overview"
import SystemSettings from "@/components/super-admin/system-settings"
import SystemLogs from "@/components/super-admin/system-logs"
import TrialManagement from "@/components/super-admin/trial-management"

interface SuperAdminDashboardProps {
  user: {
    name: string
    role: string
  } | null
  onLogout: () => void
}

export default function SuperAdminDashboard({ user, onLogout }: SuperAdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SuperAdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <SuperAdminHeader userName={user?.name || ""} onLogout={onLogout} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeSection === "overview" && <SystemOverview />}
          {activeSection === "restaurants" && <RestaurantManagement />}
          {activeSection === "trials" && <TrialManagement />}
          {activeSection === "settings" && <SystemSettings />}
          {activeSection === "logs" && <SystemLogs />}
        </main>
      </div>
    </div>
  )
}
