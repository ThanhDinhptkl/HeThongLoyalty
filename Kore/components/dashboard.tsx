"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import MemberCard from "@/components/member-card"
import VoucherList from "@/components/voucher-list"
import BannerSlider from "@/components/banner-slider"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Globe,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Gift,
  ShoppingBag,
  Star,
  Users,
  Edit,
  Lock,
  HelpCircle,
  Calendar,
  Percent,
  AlertTriangle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardProps {
  user: {
    name: string
    id: string
    points: number
  } | null
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showHelpChat, setShowHelpChat] = useState(false)
  const [helpMessage, setHelpMessage] = useState("")

  // Mock data for user details
  const userDetails = {
    phone: "0912 345 678",
    email: "nguyenvana@example.com",
    registrationDate: "01/01/2023",
  }

  // Mock vouchers data
  const mockVouchers = [
    {
      id: "1",
      code: "WELCOME10",
      discount: 10,
      description: "Giảm 10% cho đơn hàng đầu tiên",
      expiryDate: "2024-12-31",
      type: "percentage",
    },
    {
      id: "2",
      code: "SAVE20K",
      discount: 20000,
      description: "Giảm 20,000đ cho đơn hàng từ 200,000đ",
      expiryDate: "2024-12-25",
      type: "fixed",
    },
  ]

  // Expiring vouchers for home tab
  const expiringVouchers = [
    {
      id: "exp1",
      code: "BIRTHDAY50",
      discount: 50,
      description: "Giảm 50% nhân dịp sinh nhật",
      expiryDate: "2024-08-20",
      type: "percentage",
      daysLeft: 3,
    },
    {
      id: "exp2",
      code: "WEEKEND30",
      discount: 30000,
      description: "Giảm 30K cho đơn cuối tuần",
      expiryDate: "2024-08-18",
      type: "fixed",
      daysLeft: 1,
    },
  ]

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic here
    setShowPasswordChange(false)
    // Show success message
  }

  const handleVoucherClaim = (voucherId: string) => {
    console.log("Voucher claimed:", voucherId)
    // Handle voucher claim logic here
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userName={user?.name || ""} onLogout={onLogout} />

      <main className="flex-1 pb-24 md:pb-6">
        {activeTab === "home" && (
          <div className="container px-4 py-6 mx-auto space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <MemberCard memberId={user?.id || ""} points={user?.points || 0} />
              </div>
              <div className="md:col-span-7">
                <VoucherList vouchers={mockVouchers} onClaim={handleVoucherClaim} />
              </div>
            </div>

            {/* Expiring Vouchers Section */}
            {expiringVouchers.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Voucher sắp hết hạn
                  </CardTitle>
                  <CardDescription className="text-orange-700">Sử dụng ngay để không bỏ lỡ ưu đãi!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringVouchers.map((voucher) => (
                      <div
                        key={voucher.id}
                        className="bg-white border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant={voucher.type === "percentage" ? "default" : "secondary"}>
                                <Percent className="w-3 h-3 mr-1" />
                                {voucher.type === "percentage"
                                  ? `${voucher.discount}%`
                                  : `${voucher.discount.toLocaleString()}đ`}
                              </Badge>
                              <span className="font-mono text-sm font-semibold text-purple-600">{voucher.code}</span>
                              <Badge variant="outline" className="text-red-600 border-red-300">
                                <Clock className="w-3 h-3 mr-1" />
                                Còn {voucher.daysLeft} ngày
                              </Badge>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">{voucher.description}</p>

                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              Hết hạn: {voucher.expiryDate}
                            </div>
                          </div>

                          <div className="ml-4">
                            <Button
                              onClick={() => handleVoucherClaim(voucher.id)}
                              size="sm"
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                              Sử dụng ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <BannerSlider />
          </div>
        )}

        {activeTab === "points" && (
          <div className="container px-4 py-6 mx-auto max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Tích điểm</h2>

            {/* Box điểm tích lũy với thanh tiến độ */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm opacity-90">Điểm tích lũy của bạn</p>
                  <p className="text-3xl font-bold">{user?.points || 0}</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <Gift className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ lên cấp</span>
                  <span>Còn 500 điểm để đạt voucher Giảm 100K</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div
                    className="bg-white h-2.5 rounded-full"
                    style={{ width: `${Math.min(((user?.points || 0) / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs opacity-80">
                  <span>{user?.points || 0} điểm</span>
                  <span>1000 điểm</span>
                </div>
              </div>
            </div>

            {/* Cách thức tích điểm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Cách thức tích điểm</h3>

              <div className="space-y-6">
                {/* Mua hàng */}
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <ShoppingBag className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mua hàng</h4>
                    <p className="text-gray-600 mt-1">Nhận 1 điểm cho mỗi 10,000đ chi tiêu tại nhà hàng</p>
                    <div className="mt-2 flex items-center">
                      <Button variant="outline" size="sm" className="text-pink-600 border-pink-200">
                        Quét mã QR
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Đánh giá Google */}
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Đánh giá 5 sao trên Google</h4>
                    <p className="text-gray-600 mt-1">Nhận ngay 100 điểm khi đánh giá 5 sao cho nhà hàng trên Google</p>
                    <p className="text-xs text-gray-500 mt-1">*Chỉ áp dụng 1 lần duy nhất với mỗi tài khoản</p>
                    <div className="mt-2 flex items-center">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                        Đánh giá ngay
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Giới thiệu bạn bè */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Giới thiệu bạn bè</h4>
                    <p className="text-gray-600 mt-1">Nhận 50 điểm cho mỗi người bạn giới thiệu đăng ký thành công</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input value="FRIEND50" readOnly className="w-32 bg-gray-50" />
                      <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                        Sao chép mã
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                        Chia sẻ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vouchers" && (
          <div className="container px-4 py-6 mx-auto max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Ví voucher</h2>
            <VoucherList vouchers={mockVouchers} onClaim={handleVoucherClaim} extended={true} showNewVouchers={true} />
          </div>
        )}

        {activeTab === "info" && (
          <div className="container px-4 py-6 mx-auto max-w-4xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold">Nhà hàng Golden Flavor</h2>
                <p className="mt-1">Hương vị truyền thống - Phong cách hiện đại</p>
              </div>

              {/* Liên hệ */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Hotline</p>
                      <p>1900 6789</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Website</p>
                      <a href="http://www.goldenflavor.vn" className="text-blue-600 hover:underline">
                        www.goldenflavor.vn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Địa điểm */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Địa điểm</h3>
                <div className="space-y-6">
                  {/* Chi nhánh Trung tâm */}
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Chi nhánh Trung tâm</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2" />
                        <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <p>028 3823 4567</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <p>09:00 - 22:30</p>
                      </div>
                    </div>
                  </div>

                  {/* Chi nhánh Thủ Đức */}
                  <div>
                    <h4 className="font-medium mb-2">Chi nhánh Thủ Đức</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2" />
                        <p>789 Võ Văn Ngân, TP. Thủ Đức, TP.HCM</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <p>028 7654 3210</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <p>09:00 - 22:30</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-purple-50 text-purple-600 border-purple-200"
                      >
                        Chỉ đường
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theo dõi chúng tôi */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex items-center bg-blue-50 text-blue-600 border-blue-200">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex items-center bg-pink-50 text-pink-600 border-pink-200">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>

              {/* Về chúng tôi */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
                <p className="text-gray-600">
                  Golden Flavor tự hào mang đến những trải nghiệm ẩm thực tuyệt vời với vị truyền thống kết hợp phong
                  cách phục vụ hiện đại. Chúng tôi cam kết sử dụng nguyên liệu tươi ngon, chế biến theo công thức độc
                  quyền để tạo nên những món ăn đậm đà bản sắc.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="container px-4 py-6 mx-auto max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Tài khoản</h2>

            {/* Box 1: Thông tin thành viên với nền màu và chữ trắng */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={user?.name} />
                  <AvatarFallback className="text-xl">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <div className="flex items-center mt-1">
                    <Gift className="w-4 h-4 mr-1" />
                    <span>{user?.points || 0} điểm tích lũy</span>
                  </div>
                  <div className="text-sm opacity-80 mt-1">Thành viên từ: {userDetails.registrationDate}</div>
                </div>
              </div>
            </div>

            {/* Box 2: Thông tin cá nhân và Bảo mật */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Thông tin cá nhân & Bảo mật</h3>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>

              <div className="space-y-6">
                {/* Thông tin cá nhân */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-700">Thông tin cá nhân</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{userDetails.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày sinh</p>
                      <p className="font-medium">15/08/1990</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giới tính</p>
                      <p className="font-medium">Nam</p>
                    </div>
                  </div>
                </div>

                {/* Đường phân cách */}
                <hr className="border-gray-200" />

                {/* Bảo mật */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">Bảo mật</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </div>

                  {showPasswordChange && (
                    <form onSubmit={handlePasswordChange} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu hiện tại
                        </label>
                        <Input id="currentPassword" type="password" required />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu mới
                        </label>
                        <Input id="newPassword" type="password" required />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Xác nhận mật khẩu mới
                        </label>
                        <Input id="confirmPassword" type="password" required />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setShowPasswordChange(false)}>
                          Hủy
                        </Button>
                        <Button type="submit">Cập nhật</Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Nút cần hỗ trợ */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center mx-auto bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                  onClick={() => setShowHelpChat(!showHelpChat)}
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Cần hỗ trợ?
                </Button>

                {showHelpChat && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Phone className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Hotline hỗ trợ</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-2">1900 6789</p>
                    <p className="text-sm text-blue-600">Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
