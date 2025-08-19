"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Gift, Calendar, Percent, Search, Plus, Clock } from "lucide-react"

interface Voucher {
  id: string
  code: string
  discount: number
  description?: string
  expiryDate?: string
  type?: string
  isExpiringSoon?: boolean
}

interface VoucherListProps {
  vouchers?: Voucher[]
  onClaim?: (voucherId: string) => void
  extended?: boolean
  showNewVouchers?: boolean
}

const VoucherList: React.FC<VoucherListProps> = ({
  vouchers = [],
  onClaim = () => {},
  extended = false,
  showNewVouchers = false,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [showUseDialog, setShowUseDialog] = useState(false)
  const [usedVouchers, setUsedVouchers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [collectedVouchers, setCollectedVouchers] = useState<string[]>([])

  // Mock data if no vouchers provided
  const defaultVouchers: Voucher[] = [
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
    {
      id: "3",
      code: "BIRTHDAY50",
      discount: 50,
      description: "Giảm 50% nhân dịp sinh nhật",
      expiryDate: "2024-08-15",
      type: "percentage",
      isExpiringSoon: true,
    },
  ]

  // New vouchers available for collection
  const newVouchers: Voucher[] = [
    {
      id: "new1",
      code: "SUMMER25",
      discount: 25,
      description: "Giảm 25% cho mùa hè sôi động",
      expiryDate: "2024-08-31",
      type: "percentage",
    },
    {
      id: "new2",
      code: "FREESHIP",
      discount: 30000,
      description: "Miễn phí giao hàng đơn từ 150K",
      expiryDate: "2024-09-15",
      type: "fixed",
    },
    {
      id: "new3",
      code: "COMBO50",
      discount: 50000,
      description: "Giảm 50K khi mua combo gia đình",
      expiryDate: "2024-09-30",
      type: "fixed",
    },
  ]

  const displayVouchers = vouchers.length > 0 ? vouchers : defaultVouchers
  const filteredNewVouchers = newVouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUseVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher)
    setShowUseDialog(true)
  }

  const handleCloseUseDialog = () => {
    setShowUseDialog(false)
    setSelectedVoucher(null)
  }

  const handleCollectVoucher = (voucherId: string) => {
    setCollectedVouchers([...collectedVouchers, voucherId])
    // Here you would typically call an API to collect the voucher
  }

  if (!displayVouchers || displayVouchers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            Voucher của bạn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Gift className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Chưa có voucher nào</p>
            <p className="text-sm text-gray-400 mt-1">Tích điểm để nhận voucher hấp dẫn!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            {extended ? "Ví voucher" : "Voucher của bạn"}
          </CardTitle>
          <CardDescription>{displayVouchers.length} voucher có sẵn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayVouchers.map((voucher) => {
              const isUsed = usedVouchers.includes(voucher.id)
              return (
                <div
                  key={voucher.id}
                  className={`border rounded-lg p-4 ${
                    isUsed ? "bg-gray-50 opacity-60" : "bg-white hover:shadow-md"
                  } transition-shadow ${voucher.isExpiringSoon ? "border-orange-200 bg-orange-50" : ""}`}
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
                        {voucher.isExpiringSoon && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            <Clock className="w-3 h-3 mr-1" />
                            Sắp hết hạn
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {voucher.description || `Giảm ${voucher.discount}% cho đơn hàng`}
                      </p>

                      {voucher.expiryDate && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          Hết hạn: {voucher.expiryDate}
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      {isUsed ? (
                        <Badge variant="outline" className="text-gray-500">
                          Đã sử dụng
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleUseVoucher(voucher)}
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          Sử dụng
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Vouchers Section - Only show in extended mode */}
      {extended && showNewVouchers && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Tìm voucher mới
            </CardTitle>
            <CardDescription>Khám phá và thu thập voucher mới</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm voucher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredNewVouchers.map((voucher) => {
                const isCollected = collectedVouchers.includes(voucher.id)
                return (
                  <div
                    key={voucher.id}
                    className={`border rounded-lg p-4 ${
                      isCollected ? "bg-green-50 border-green-200" : "bg-white hover:shadow-md"
                    } transition-shadow`}
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
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {voucher.description || `Giảm ${voucher.discount}% cho đơn hàng`}
                        </p>

                        {voucher.expiryDate && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            Hết hạn: {voucher.expiryDate}
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {isCollected ? (
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            Đã thu thập
                          </Badge>
                        ) : (
                          <Button
                            onClick={() => handleCollectVoucher(voucher.id)}
                            size="sm"
                            variant="outline"
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Thu thập
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Use Voucher Dialog - Simplified */}
      <Dialog open={showUseDialog} onOpenChange={setShowUseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Gift className="w-5 h-5 mr-2 text-purple-600" />
              Mã voucher của bạn
            </DialogTitle>
            <DialogDescription>Đưa mã voucher này cho nhân viên tại quầy để được áp dụng ưu đãi</DialogDescription>
          </DialogHeader>

          {selectedVoucher && (
            <div className="space-y-4">
              {/* Voucher Code Display */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold font-mono text-purple-600 mb-2">{selectedVoucher.code}</div>
                <div className="text-lg font-semibold text-gray-700">
                  {selectedVoucher.type === "percentage"
                    ? `Giảm ${selectedVoucher.discount}%`
                    : `Giảm ${selectedVoucher.discount.toLocaleString()}đ`}
                </div>
                {selectedVoucher.description && (
                  <p className="text-sm text-gray-600 mt-2">{selectedVoucher.description}</p>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Hướng dẫn sử dụng:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Đưa mã voucher này cho nhân viên tại quầy</li>
                  <li>• Voucher chỉ sử dụng được 1 lần duy nhất</li>
                  <li>• Không thể hoàn lại sau khi đã sử dụng</li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VoucherList
