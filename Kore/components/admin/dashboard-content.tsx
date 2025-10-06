"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Gift, Ticket, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export default function DashboardContent() {
  // Mock data for charts
  const pointsData = [
    { name: "T2", points: 400 },
    { name: "T3", points: 300 },
    { name: "T4", points: 500 },
    { name: "T5", points: 280 },
    { name: "T6", points: 590 },
    { name: "T7", points: 800 },
    { name: "CN", points: 400 },
  ]

  const vouchersData = [
    { name: "T2", issued: 20, used: 12 },
    { name: "T3", issued: 15, used: 8 },
    { name: "T4", issued: 25, used: 15 },
    { name: "T5", issued: 18, used: 10 },
    { name: "T6", issued: 30, used: 22 },
    { name: "T7", issued: 40, used: 30 },
    { name: "CN", issued: 25, used: 15 },
  ]

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: "point", customer: "Nguyễn Văn A", action: "Tích điểm", value: "+150 điểm", time: "10:30 AM" },
    { id: 2, type: "voucher", customer: "Trần Thị B", action: "Sử dụng voucher", value: "Giảm 50K", time: "11:15 AM" },
    { id: 3, type: "point", customer: "Lê Văn C", action: "Tích điểm", value: "+200 điểm", time: "12:45 PM" },
    { id: 4, type: "voucher", customer: "Phạm Thị D", action: "Sử dụng voucher", value: "Tặng món", time: "2:30 PM" },
    { id: 5, type: "point", customer: "Hoàng Văn E", action: "Tích điểm", value: "+100 điểm", time: "3:20 PM" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng khách hàng</p>
                <h3 className="text-2xl font-bold">1,248</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+5.2%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng điểm đã cấp</p>
                <h3 className="text-2xl font-bold">45,290</h3>
              </div>
              <div className="p-2 bg-pink-100 rounded-full">
                <Gift className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+12.3%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng voucher đã phát</p>
                <h3 className="text-2xl font-bold">892</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Ticket className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span className="font-medium">+8.7%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tỷ lệ sử dụng voucher</p>
                <h3 className="text-2xl font-bold">68.5%</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-red-600">
              <span className="font-medium">-2.1%</span> so với tháng trước
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Lịch sử tích điểm và sử dụng voucher</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-3 ${activity.type === "point" ? "bg-pink-100" : "bg-purple-100"}`}
                    >
                      {activity.type === "point" ? (
                        <Gift className={`h-4 w-4 text-pink-600`} />
                      ) : (
                        <Ticket className={`h-4 w-4 text-purple-600`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.customer}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.value}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Thống kê</CardTitle>
            <CardDescription>Biểu đồ điểm và voucher theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="points">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="points">Điểm tích lũy</TabsTrigger>
                <TabsTrigger value="vouchers">Voucher</TabsTrigger>
              </TabsList>
              <TabsContent value="points" className="pt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={pointsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="points" stroke="#ec4899" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="vouchers" className="pt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={vouchersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="issued" fill="#9333ea" />
                    <Bar dataKey="used" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
