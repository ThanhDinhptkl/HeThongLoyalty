"use client"

import type React from "react"

import { useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function PointsManagement() {
  const [customerCode, setCustomerCode] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState("")
  const [customer, setCustomer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [notes, setNotes] = useState("")
  const [pointsDate, setPointsDate] = useState(new Date().toLocaleString("vi-VN"))
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successData, setSuccessData] = useState<any>(null)

  const formatNumber = (value: string) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "")
    // Add thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const parseNumber = (value: string) => {
    return Number.parseInt(value.replace(/,/g, ""), 10) || 0
  }

  const handleSearch = () => {
    if (!customerCode) return

    setIsLoading(true)

    // Simulate API call to fetch customer
    setTimeout(() => {
      // Mock customer data
      setCustomer({
        id: "CUS12345",
        name: "Nguyễn Văn A",
        phone: "0912345678",
        totalPoints: 1250,
        memberSince: "01/01/2023",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleInvoiceAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatNumber(value)
    setInvoiceAmount(formattedValue)

    // Calculate points based on invoice amount (example: 1 point per 10,000 VND)
    const amount = parseNumber(formattedValue)
    setPointsToAdd(Math.floor(amount / 10000))
  }

  const handleAddPoints = () => {
    if (!customer || !invoiceAmount || !invoiceNumber) return

    setIsLoading(true)
    const currentTime = new Date().toLocaleString("vi-VN")

    // Simulate API call to add points
    setTimeout(() => {
      setSuccessData({
        customerName: customer.name,
        pointsAdded: pointsToAdd,
        invoiceNumber: invoiceNumber,
        amount: parseNumber(invoiceAmount),
        timestamp: currentTime,
        notes: notes,
      })
      setIsSuccessDialogOpen(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleCloseSuccess = () => {
    setIsSuccessDialogOpen(false)
    setCustomer(null)
    setCustomerCode("")
    setInvoiceAmount("")
    setInvoiceNumber("")
    setNotes("")
    setPointsToAdd(0)
    setPointsDate(new Date().toLocaleString("vi-VN"))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tích điểm</h2>
        <p className="text-muted-foreground">Tích điểm cho khách hàng dựa trên giá trị hóa đơn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm khách hàng</CardTitle>
          <CardDescription>Tìm kiếm khách hàng để tích điểm</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customerCode" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customerCode">Mã khách hàng</TabsTrigger>
              <TabsTrigger value="phoneNumber">Số điện thoại</TabsTrigger>
            </TabsList>
            <TabsContent value="customerCode" className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="customerCode">Mã khách hàng</Label>
                  <Input
                    id="customerCode"
                    placeholder="Nhập mã khách hàng"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <Button onClick={handleSearch} disabled={!customerCode || isLoading}>
                    <Search className="mr-2 h-4 w-4" />
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="phoneNumber" className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <Button onClick={handleSearch} disabled={!customerCode || isLoading}>
                    <Search className="mr-2 h-4 w-4" />
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {customer && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Mã khách hàng</Label>
                  <p className="font-medium">{customer.id}</p>
                </div>
                <div>
                  <Label>Họ và tên</Label>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Tổng điểm hiện tại</Label>
                  <p className="font-medium text-pink-600">{customer.totalPoints}</p>
                </div>
                <div>
                  <Label>Thành viên từ</Label>
                  <p className="font-medium">{customer.memberSince}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceAmount">
                    Giá trị đơn hàng (VNĐ) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="invoiceAmount"
                    placeholder="Nhập giá trị đơn hàng"
                    value={invoiceAmount}
                    onChange={handleInvoiceAmountChange}
                    required
                  />
                  {invoiceAmount && (
                    <p className="text-sm text-gray-500 mt-1">
                      {parseNumber(invoiceAmount).toLocaleString("vi-VN")} VNĐ
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="invoiceNumber">
                    Mã hóa đơn <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="invoiceNumber"
                    placeholder="Nhập mã hóa đơn"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú thêm..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Thời gian tích điểm</Label>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{pointsDate}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Điểm tích lũy</p>
                  <p className="text-lg font-bold">{pointsToAdd} điểm</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Tổng điểm sau khi cộng</p>
                  <p className="text-lg font-bold text-pink-600">{customer.totalPoints + pointsToAdd} điểm</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleAddPoints}
              disabled={isLoading || !invoiceAmount || parseNumber(invoiceAmount) <= 0 || !invoiceNumber}
            >
              {isLoading ? "Đang xử lý..." : "Tích điểm"}
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-green-600">🎉 Tích điểm thành công!</DialogTitle>
          </DialogHeader>
          {successData && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Khách hàng:</p>
                    <p className="font-medium">{successData.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Điểm tích lũy:</p>
                    <p className="font-medium text-green-600">{successData.pointsAdded} điểm</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Mã hóa đơn:</p>
                    <p className="font-medium">{successData.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Giá trị đơn hàng:</p>
                    <p className="font-medium">{successData.amount.toLocaleString("vi-VN")} VNĐ</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Thời gian tích điểm:</p>
                    <p className="font-medium">{successData.timestamp}</p>
                  </div>
                  {successData.notes && (
                    <div className="col-span-2">
                      <p className="text-gray-600">Ghi chú:</p>
                      <p className="font-medium">{successData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleCloseSuccess} className="bg-green-600 hover:bg-green-700">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
