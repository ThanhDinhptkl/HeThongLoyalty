"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Mail, Phone, User, Lock, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000"

export default function RestaurantRegistration() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<any>({})

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }
//  hàm format số điện thoại về định dạng E.164
const formatPhoneToE164 = (phone: string) => {
  let cleaned = phone.replace(/\D/g, "") 
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1)
  }
  return `+84${cleaned}`
}

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Vui lòng nhập tên nhà hàng"
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Vui lòng nhập tên chủ sở hữu"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Vui lòng đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({}) // Clear previous errors

    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_name: formData.restaurantName,
          owner_name: formData.ownerName,
          address: formData.address,
          email: formData.email,
          phone: formatPhoneToE164(formData.phone),  // Chuyển đổi định dạng số điện thoại về E.164
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle API errors
        if (result.errors) {
          // If backend returns a list of validation errors
          const apiErrors: any = {}
          result.errors.forEach((err: { field: string; message: string }) => {
            // Mapping backend field names to frontend state names
            const fieldName = err.field
              .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
              .replace(/^./, (str) => str.toLowerCase())
            apiErrors[fieldName] = err.message
          })
          setErrors(apiErrors)
        } else {
          // Handle other general errors
          setErrors({ form: result.error || "Đăng ký thất bại. Vui lòng thử lại." })
        }
        throw new Error(result.error || "Đăng ký thất bại.")
      }

      // API call was successful
      setIsSuccess(true)
      setIsLoading(false)

      const slug = generateSlug(formData.restaurantName)
      router.push(`/partner/${slug}`)

    } catch (err) {
      console.error("Registration error:", err)
      if (!errors.form) {
        // Show a general error if no specific errors were set
        setErrors({ form: "Đăng ký thất bại. Vui lòng thử lại sau." })
      }
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }))
    }
  }
  
  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Đăng ký thành công!</h3>
            <p className="text-green-700 mb-4">
              Tài khoản dùng thử của bạn đã được tạo và đã được thêm vào hệ thống quản lý. Bạn sẽ được chuyển hướng đến
              trang quản trị trong giây lát...
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Thông tin tài khoản dùng thử:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Thời gian dùng thử: 30 ngày</li>
                <li>• Giới hạn khách hàng: 30 khách hàng</li>
                <li>• Tất cả tính năng cơ bản</li>
                <li>• Hỗ trợ qua email</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Features Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Star className="mr-2 h-5 w-5" />
            Tính năng dùng thử miễn phí
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Quản lý tối đa 30 khách hàng</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Hệ thống tích điểm đầy đủ</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Cấp và quản lý voucher</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Báo cáo thống kê cơ bản</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Hỗ trợ qua email</span>
            </div>
            <div className="flex items-center text-blue-700">
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-sm">Không cần thẻ tín dụng</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin đăng ký</CardTitle>
          <CardDescription>Vui lòng điền đầy đủ thông tin để tạo tài khoản dùng thử</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Thông tin nhà hàng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">
                    Tên nhà hàng <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="restaurantName"
                    placeholder="VD: Golden Flavor Restaurant"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                    className={errors.restaurantName ? "border-red-500" : ""}
                  />
                  {errors.restaurantName && <p className="text-sm text-red-500">{errors.restaurantName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">
                    Tên chủ sở hữu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange("ownerName", e.target.value)}
                    className={errors.ownerName ? "border-red-500" : ""}
                  />
                  {errors.ownerName && <p className="text-sm text-red-500">{errors.ownerName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  Địa chỉ nhà hàng <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="VD: 123 Nguyễn Huệ, Quận 1, TP.HCM"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="mr-2 h-5 w-5" />
                Thông tin liên hệ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@restaurant.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="0912345678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Bảo mật tài khoản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tối thiểu 6 ký tự"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="agreeTerms" className="text-sm font-normal cursor-pointer">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Chính sách bảo mật
                    </a>
                  </Label>
                </div>
              </div>
              {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}
            </div>
            {errors.form && <p className="text-sm text-red-500 text-center">{errors.form}</p>}
            
            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản dùng thử miễn phí"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <a href="/partner/login" className="text-blue-600 hover:underline">
                Đăng nhập tại đây
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}