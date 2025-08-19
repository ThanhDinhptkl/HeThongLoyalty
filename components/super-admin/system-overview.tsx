"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Gift, TrendingUp, Activity, AlertTriangle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function SystemOverview() {
  // Mock data for charts
  const systemGrowthData = [
    { month: "T1", restaurants: 5, customers: 2500 },
    { month: "T2", restaurants: 8, customers: 4200 },
    { month: "T3", restaurants: 12, customers: 6800 },
    { month: "T4", restaurants: 15, customers: 8900 },
    { month: "T5", restaurants: 18, customers: 11200 },
    { month: "T6", restaurants: 22, customers: 14500 },
  ]

  const restaurantStatusData = [
    { name: "Hoạt động", value: 18, color: "#10b981" },
    { name: "Tạm dừng", value: 3, color: "#f59e0b" },
    { name: "Không hoạt động", value: 1, color: "#ef4444" },
  ]

  const recentActivities = [
    { id: 1, type: "restaurant", message: "Nhà hàng Golden Flavor đã đăng ký", time: "2 giờ trước" },
    { id: 2, type: "customer", message: "1,250 khách hàng mới đăng ký hôm nay", time: "4 giờ trước" },
    { id: 3, type: "system", message: "Cập nhật hệ thống v2.1.0", time: "1 ngày trước" },
    { id: 4, type: "alert", message: "Nhà hàng ABC cần hỗ trợ kỹ thuật", time: "2 ngày trước" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tổng quan hệ thống</h2>
        <p className="text-muted-foreground">Thống kê tổng quan về toàn bộ hệ thống loyalty</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng nhà hàng</p>
                <h3 className="text-2xl font-bold">22</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <Building2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+18.2%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng khách hàng</p>
                <h3 className="text-2xl font-bold">14,500</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+29.4%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng điểm đã cấp</p>
                <h3 className="text-2xl font-bold">2.8M</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+15.7%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tỷ lệ hoạt động</p>
                <h3 className="text-2xl font-bold">81.8%</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-red-600">
              <span className="font-medium">-2.1%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tăng trưởng hệ thống</CardTitle>
            <CardDescription>Số lượng nhà hàng và khách hàng theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="restaurants" stroke="#dc2626" name="Nhà hàng" />
                <Line type="monotone" dataKey="customers" stroke="#2563eb" name="Khách hàng (x100)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Restaurant Status */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Trạng thái nhà hàng</CardTitle>
            <CardDescription>Phân bố trạng thái hoạt động của các nhà hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={restaurantStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {restaurantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>Các sự kiện và hoạt động mới nhất trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      activity.type === "restaurant"
                        ? "bg-red-100"
                        : activity.type === "customer"
                          ? "bg-blue-100"
                          : activity.type === "system"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                    }`}
                  >
                    {activity.type === "restaurant" && <Building2 className="h-4 w-4 text-red-600" />}
                    {activity.type === "customer" && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === "system" && <Activity className="h-4 w-4 text-green-600" />}
                    {activity.type === "alert" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
