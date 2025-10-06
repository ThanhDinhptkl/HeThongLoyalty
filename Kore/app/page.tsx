"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Gift, Star, ArrowRight, Check } from "lucide-react"
import PartnerLoginModal from "@/components/partner-login-modal"

export default function Home() {
  const [isPartnerLoggedIn, setIsPartnerLoggedIn] = useState(false)
  const [partnerData, setPartnerData] = useState<{
    restaurantCode: string
    restaurantName: string
    ownerName: string
    role: string
    slug: string
  } | null>(null)
  const [showPartnerLogin, setShowPartnerLogin] = useState(false)
  const router = useRouter()

  // Check for existing session on component mount
  useEffect(() => {
    const storedSession = localStorage.getItem("partnerSession")
    if (storedSession) {
      const parsedData = JSON.parse(storedSession)
      setPartnerData(parsedData)
      setIsPartnerLoggedIn(true)
      // Redirect to admin dashboard if already logged in
      router.push(`/partner/${parsedData.slug}/admin`)
    }
  }, [router])

  const handlePartnerLogin = (data: {
    restaurantCode: string
    restaurantName: string
    ownerName: string
    role: string
    slug: string
  }) => {
    setPartnerData(data)
    setIsPartnerLoggedIn(true)
    setShowPartnerLogin(false)
    // Redirect to the partner's admin dashboard
    router.push(`/partner/${data.slug}/admin`)
  }

  const handlePartnerLogout = () => {
    setPartnerData(null)
    setIsPartnerLoggedIn(false)
    localStorage.removeItem("partnerSession") // Clear session on logout
  }

  if (showPartnerLogin) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
            <Button variant="ghost" onClick={() => setShowPartnerLogin(false)} className="mb-4">
              ← Quay lại
            </Button>
            <PartnerLoginModal onLogin={handlePartnerLogin} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-pink-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">F&B Loyalty</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setShowPartnerLogin(true)}>
              Đăng Nhập
            </Button>
            <Button onClick={() => router.push("/register")} className="bg-pink-600 hover:bg-pink-700">
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Hệ Thống Loyalty
            <span className="text-pink-600"> Cho Nhà Hàng</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tăng lòng trung thành khách hàng với hệ thống tích điểm và voucher hiện đại. Dễ sử dụng, hiệu quả cao, phù
            hợp với mọi quy mô nhà hàng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3"
            >
              Dùng thử miễn phí 30 ngày
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowPartnerLogin(true)} className="text-lg px-8 py-3">
              Đăng Nhập
            </Button>
          </div>

          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✨ Không cần thẻ tín dụng • Tối đa 30 khách hàng • Tất cả tính năng
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tính năng nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hệ thống đầy đủ tính năng giúp bạn quản lý khách hàng và tăng doanh thu hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Tích điểm thông minh</CardTitle>
                <CardDescription>
                  Hệ thống tích điểm linh hoạt theo giá trị hóa đơn, với các chương trình thưởng đặc biệt
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Quản lý khách hàng</CardTitle>
                <CardDescription>
                  Theo dõi thông tin khách hàng, lịch sử giao dịch và phân tích hành vi lựa chọn khuyến mãi
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Voucher & Khuyến mãi</CardTitle>
                <CardDescription>
                  Theo dõi thông tin khách hàng, lịch sử giao dịch và phân tích hành vi lựa chọn khuyến mãi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trial Benefits */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sử dụng miễn phí cho đến khi bạn có nhiều khách hàng hơn! </h2>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Trải nghiệm đầy đủ tính năng mà không cần cam kết. Bắt đầu ngay hôm nay!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Không giới hạn thời gian</h3>
              <p className="text-pink-100 text-sm">Không cần thẻ tín dụng</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">30 khách hàng</h3>
              <p className="text-pink-100 text-sm">Đủ để trải nghiệm tính hiệu quả</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Tất cả tính năng</h3>
              <p className="text-pink-100 text-sm">Không giới hạn chức năng</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Hỗ trợ trực tuyến</h3>
              <p className="text-pink-100 text-sm">Qua Zalo và Email </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Bắt đầu dùng thử ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-pink-400 mr-2" />
                <span className="text-lg font-bold">F&B Loyalty</span>
              </div>
              <p className="text-gray-400">
                Hệ thống loyalty hiện đại chuyên biệt cho ngành F&amp;B, giúp tăng tần suất khách hàng quay lại, tối ưu
                doanh thu điểm bán.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Tích điểm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Voucher
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Báo cáo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Hướng dẫn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@fbloyalty.com</li>
                <li>Hotline: 1900 6789</li>
                <li>Địa chỉ: TP.HCM, Việt Nam</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 F&amp;B Loyalty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
