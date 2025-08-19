"use client"

import { useState } from "react"
import { Save, Shield, Database, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SystemSettings() {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSaveSettings = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cài đặt hệ thống</h2>
        <p className="text-muted-foreground">Quản lý cài đặt tổng thể của hệ thống</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="database">Cơ sở dữ liệu</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
              <CardDescription>Cấu hình thông tin cơ bản của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName">Tên hệ thống</Label>
                  <Input id="systemName" defaultValue="F&B Loyalty System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemVersion">Phiên bản</Label>
                  <Input id="systemVersion" defaultValue="2.1.0" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Email hỗ trợ</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@fbloyalty.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Hotline hỗ trợ</Label>
                  <Input id="supportPhone" defaultValue="1900 6789" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Cài đặt hệ thống</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Chế độ bảo trì</Label>
                    <p className="text-sm text-gray-500">Tạm dừng toàn bộ hệ thống để bảo trì</p>
                  </div>
                  <Switch id="maintenanceMode" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Sao lưu tự động</Label>
                    <p className="text-sm text-gray-500">Tự động sao lưu dữ liệu hàng ngày</p>
                  </div>
                  <Switch id="autoBackup" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debugMode">Chế độ debug</Label>
                    <p className="text-sm text-gray-500">Bật ghi log chi tiết cho việc debug</p>
                  </div>
                  <Switch id="debugMode" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Cài đặt bảo mật
              </CardTitle>
              <CardDescription>Quản lý các chính sách bảo mật của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Thời gian hết phiên (phút)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Số lần đăng nhập tối đa</Label>
                  <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Độ dài mật khẩu tối thiểu</Label>
                  <Input id="passwordMinLength" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Hết hạn mật khẩu (ngày)</Label>
                  <Input id="passwordExpiry" type="number" defaultValue="90" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Chính sách bảo mật</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireStrongPassword">Yêu cầu mật khẩu mạnh</Label>
                    <p className="text-sm text-gray-500">Bắt buộc sử dụng chữ hoa, số và ký tự đặc biệt</p>
                  </div>
                  <Switch id="requireStrongPassword" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Xác thực 2 bước</Label>
                    <p className="text-sm text-gray-500">Bắt buộc xác thực 2 bước cho admin</p>
                  </div>
                  <Switch id="twoFactorAuth" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ipWhitelist">Giới hạn IP</Label>
                    <p className="text-sm text-gray-500">Chỉ cho phép truy cập từ IP được phép</p>
                  </div>
                  <Switch id="ipWhitelist" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Cài đặt cơ sở dữ liệu
              </CardTitle>
              <CardDescription>Quản lý cấu hình và sao lưu cơ sở dữ liệu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input id="dbHost" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbPort">Database Port</Label>
                  <Input id="dbPort" defaultValue="5432" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input id="dbName" defaultValue="fbloyalty_db" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxConnections">Số kết nối tối đa</Label>
                  <Input id="maxConnections" type="number" defaultValue="100" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Sao lưu và khôi phục</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackupDb">Sao lưu tự động</Label>
                    <p className="text-sm text-gray-500">Tự động sao lưu database hàng ngày lúc 2:00 AM</p>
                  </div>
                  <Switch id="autoBackupDb" defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="backupRetention">Lưu trữ sao lưu (ngày)</Label>
                    <Input id="backupRetention" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupLocation">Thư mục sao lưu</Label>
                    <Input id="backupLocation" defaultValue="/backups/db" />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline">Sao lưu ngay</Button>
                  <Button variant="outline">Khôi phục</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
              <CardDescription>Quản lý các loại thông báo và cảnh báo hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" defaultValue="587" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input id="smtpUser" defaultValue="noreply@fbloyalty.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input id="smtpPassword" type="password" defaultValue="••••••••" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Loại thông báo</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemAlerts">Cảnh báo hệ thống</Label>
                    <p className="text-sm text-gray-500">Thông báo khi có lỗi hoặc sự cố hệ thống</p>
                  </div>
                  <Switch id="systemAlerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newRestaurant">Nhà hàng mới</Label>
                    <p className="text-sm text-gray-500">Thông báo khi có nhà hàng mới đăng ký</p>
                  </div>
                  <Switch id="newRestaurant" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dailyReport">Báo cáo hàng ngày</Label>
                    <p className="text-sm text-gray-500">Gửi báo cáo thống kê hàng ngày</p>
                  </div>
                  <Switch id="dailyReport" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Cảnh báo bảo mật</Label>
                    <p className="text-sm text-gray-500">Thông báo khi có hoạt động đăng nhập bất thường</p>
                  </div>
                  <Switch id="securityAlerts" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {isSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Lưu cài đặt thành công!</AlertTitle>
          <AlertDescription className="text-green-700">Các thay đổi của bạn đã được lưu và áp dụng.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
