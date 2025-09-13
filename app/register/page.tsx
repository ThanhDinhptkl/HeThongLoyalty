"use client"
import RestaurantRegistration from "@/components/registration/restaurant-registration"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Đăng Ký Dùng Thử</h1>
            <p className="text-lg text-gray-600">Tạo tài khoản loyalty miễn phí cho nhà hàng của bạn</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✨ Miễn phí 30 ngày - Không cần thẻ tín dụng
            </div>
          </div>
          <RestaurantRegistration />
        </div>
      </div>
    </main>
  )
}
