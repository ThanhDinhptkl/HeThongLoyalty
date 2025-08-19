"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsManagement() {
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
        <p className="text-muted-foreground">Quản lý cài đặt và chính sách điểm thưởng</p>
      </div>

      <Tabs defaultValue="points">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="points">Chính sách điểm</TabsTrigger>
          <TabsTrigger value="vouchers">Voucher</TabsTrigger>
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt tích điểm</CardTitle>
              <CardDescription>Cấu hình cách tính điểm dựa trên giá trị hóa đơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pointRate">Tỷ lệ điểm (VNĐ/điểm)</Label>
                  <div className="flex items-center">
                    <Input id="pointRate" type="number" defaultValue="10000" />
                    <span className="ml-2">VNĐ = 1 điểm</span>
                  </div>
                  <p className="text-sm text-gray-500">Khách hàng sẽ nhận được 1 điểm cho mỗi 10,000 VNĐ chi tiêu</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minInvoice">Hóa đơn tối thiểu</Label>
                  <div className="flex items-center">
                    <Input id="minInvoice" type="number" defaultValue="50000" />
                    <span className="ml-2">VNĐ</span>
                  </div>
                  <p className="text-sm text-gray-500">Hóa đơn phải đạt giá trị tối thiểu này để được tích điểm</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Điểm thưởng bổ sung</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="birthdayBonus">Thưởng sinh nhật khách hàng</Label>
                    <p className="text-sm text-gray-500">
                      Tự động cấp voucher giảm giá cho khách hàng vào ngày sinh nhật
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="50">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">Giảm 30%</SelectItem>
                        <SelectItem value="50">Giảm 50%</SelectItem>
                        <SelectItem value="70">Giảm 70%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="firstPurchaseBonus">Thưởng mua hàng lần đầu</Label>
                    <p className="text-sm text-gray-500">Tặng điểm bổ sung cho lần mua hàng đầu tiên</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input id="firstPurchaseBonus" type="number" defaultValue="50" className="w-24" />
                    <span>điểm</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="referralBonus">Thưởng giới thiệu</Label>
                    <p className="text-sm text-gray-500">Tặng điểm khi giới thiệu thành viên mới</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input id="referralBonus" type="number" defaultValue="50" className="w-24" />
                    <span>điểm</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="googleReviewBonus">Thưởng đánh giá Google Maps</Label>
                    <p className="text-sm text-gray-500">Tặng điểm khi khách hàng đánh giá 5 sao trên Google Maps</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input id="googleReviewBonus" type="number" defaultValue="100" className="w-24" />
                    <span>điểm</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vouchers" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt voucher</CardTitle>
              <CardDescription>Cấu hình các thông số mặc định cho voucher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultValidity">Thời hạn mặc định</Label>
                  <div className="flex items-center">
                    <Input id="defaultValidity" type="number" defaultValue="30" />
                    <span className="ml-2">ngày</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxVouchersPerCustomer">Số lượng voucher tối đa</Label>
                  <div className="flex items-center">
                    <Input id="maxVouchersPerCustomer" type="number" defaultValue="5" />
                    <span className="ml-2">voucher/khách hàng</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Cài đặt nâng cao</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowStacking">Cho phép dùng nhiều voucher</Label>
                    <p className="text-sm text-gray-500">Cho phép khách hàng sử dụng nhiều voucher trong một hóa đơn</p>
                  </div>
                  <Switch id="allowStacking" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoIssue">Tự động cấp voucher sinh nhật</Label>
                    <p className="text-sm text-gray-500">Tự động cấp voucher cho khách hàng vào ngày sinh nhật</p>
                  </div>
                  <Switch id="autoIssue" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifyExpiry">Thông báo sắp hết hạn</Label>
                    <p className="text-sm text-gray-500">Gửi thông báo khi voucher sắp hết hạn</p>
                  </div>
                  <Switch id="notifyExpiry" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>Cấu hình thông tin chung của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Tên cửa hàng</Label>
                  <Input id="storeName" defaultValue="Nhà hàng ABC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input id="contactEmail" type="email" defaultValue="contact@nhahangarc.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Số điện thoại</Label>
                  <Input id="contactPhone" defaultValue="1900 6789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Cài đặt hệ thống</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Chế độ bảo trì</Label>
                    <p className="text-sm text-gray-500">Kích hoạt chế độ bảo trì, khách hàng không thể truy cập</p>
                  </div>
                  <Switch id="maintenanceMode" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableNotifications">Bật thông báo</Label>
                    <p className="text-sm text-gray-500">Gửi thông báo đến khách hàng về các ưu đãi và cập nhật</p>
                  </div>
                  <Switch id="enableNotifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
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
