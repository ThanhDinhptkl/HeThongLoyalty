"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Mock banner data
  const banners = [
    {
      id: 1,
      title: "Khuyến mãi mùa hè",
      description: "Giảm 30% cho tất cả món ăn vào thứ 3 hàng tuần",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Sinh nhật vui vẻ",
      description: "Tặng bánh sinh nhật miễn phí cho khách có ngày sinh nhật",
      color: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      id: 3,
      title: "Thành viên mới",
      description: "Tặng 500 điểm cho thành viên mới đăng ký",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <h2 className="mb-3 text-lg font-bold">Chương trình ưu đãi</h2>

      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className={`p-6 md:p-8 text-white ${banner.color}`}>
                  <div className="md:flex md:justify-between md:items-center">
                    <div className="md:w-2/3">
                      <h3 className="text-xl md:text-2xl font-bold">{banner.title}</h3>
                      <p className="mt-2">{banner.description}</p>
                      <Button variant="outline" className="mt-4 text-white border-white hover:bg-white/20">
                        Xem chi tiết
                      </Button>
                    </div>
                    <div className="hidden md:block md:w-1/3">
                      {/* Placeholder for banner image on desktop */}
                      <div className="w-full h-32 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-white/70">Banner Image</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
