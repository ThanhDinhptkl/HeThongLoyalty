"use client"

import { useState } from "react"
import { Search, Download, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [logLevel, setLogLevel] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  // Mock log data
  const logs = [
    {
      id: 1,
      timestamp: "2023-06-10 10:30:15",
      level: "info",
      category: "auth",
      message: "User admin@goldenflavor.com logged in successfully",
      restaurant: "Golden Flavor",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2023-06-10 10:25:42",
      level: "warning",
      category: "system",
      message: "High memory usage detected: 85%",
      restaurant: "System",
      ip: "localhost",
    },
    {
      id: 3,
      timestamp: "2023-06-10 10:20:33",
      level: "error",
      category: "database",
      message: "Connection timeout to database server",
      restaurant: "System",
      ip: "localhost",
    },
    {
      id: 4,
      timestamp: "2023-06-10 10:15:18",
      level: "success",
      category: "restaurant",
      message: "New restaurant 'Saigon Bistro' registered successfully",
      restaurant: "System",
      ip: "203.162.4.191",
    },
    {
      id: 5,
      timestamp: "2023-06-10 10:10:05",
      level: "info",
      category: "customer",
      message: "Customer MEM12345 earned 150 points",
      restaurant: "Golden Flavor",
      ip: "192.168.1.100",
    },
    {
      id: 6,
      timestamp: "2023-06-10 10:05:22",
      level: "warning",
      category: "security",
      message: "Multiple failed login attempts from IP 45.76.123.45",
      restaurant: "System",
      ip: "45.76.123.45",
    },
    {
      id: 7,
      timestamp: "2023-06-10 09:58:41",
      level: "error",
      category: "payment",
      message: "Payment processing failed for voucher redemption",
      restaurant: "Hanoi Kitchen",
      ip: "192.168.1.200",
    },
    {
      id: 8,
      timestamp: "2023-06-10 09:45:33",
      level: "info",
      category: "backup",
      message: "Daily database backup completed successfully",
      restaurant: "System",
      ip: "localhost",
    },
  ]

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = logLevel === "all" || log.level === logLevel

    return matchesSearch && matchesLevel
  })

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getLogBadgeVariant = (level: string) => {
    switch (level) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "success":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Nhật ký hệ thống</h2>
          <p className="text-muted-foreground">Theo dõi các hoạt động và sự kiện trong hệ thống</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Xuất log
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>Danh sách log</CardTitle>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm log..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="all">Tất cả</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Mức độ</TableHead>
                <TableHead className="w-[150px]">Thời gian</TableHead>
                <TableHead className="w-[100px]">Danh mục</TableHead>
                <TableHead>Thông điệp</TableHead>
                <TableHead className="w-[120px]">Nhà hàng</TableHead>
                <TableHead className="w-[120px]">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Không tìm thấy log nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center">{getLogIcon(log.level)}</div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={getLogBadgeVariant(log.level)}>{log.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate" title={log.message}>
                        {log.message}
                      </p>
                    </TableCell>
                    <TableCell>{log.restaurant}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
