"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function VoucherClaims() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isClaimSuccessOpen, setIsClaimSuccessOpen] = useState(false)
  const [claimedVoucher, setClaimedVoucher] = useState<any>(null)

  // Mock data for voucher claims
  const voucherClaims = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      customerPhone: "0912345678",
      voucherCode: "DISCOUNT50K",
      voucherTitle: "Giảm 50K cho hóa đơn từ 200K",
      claimDate: "15/06/2024 14:30",
      status: "pending",
      usedDate: null,
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      customerPhone: "0987654321",
      voucherCode: "FREEDESSERT",
      voucherTitle: "Tặng 1 phần tráng miệng",
      claimDate: "14/06/2024 10:15",
      status: "used",
      usedDate: "14/06/2024 19:45",
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      customerPhone: "0901234567",
      voucherCode: "PIZZA20",
      voucherTitle: "Giảm 20% cho món pizza",
      claimDate: "13/06/2024 16:20",
      status: "expired",
      usedDate: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Chờ sử dụng
          </Badge>
        )
      case "used":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đã sử dụng
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Hết hạn
          </Badge>
        )
      default:
        return null
    }
  }

  const handleMarkAsUsed = (claim: any) => {
    // Simulate API call to mark voucher as used
    setClaimedVoucher({
      ...claim,
      usedDate: new Date().toLocaleString("vi-VN"),
    })
    setIsClaimSuccessOpen(true)
  }

  const filteredClaims = voucherClaims.filter(
    (claim) =>
      claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customerPhone.includes(searchTerm) ||
      claim.voucherCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Claim Voucher</h2>
        <p className="text-muted-foreground">Theo dõi và xử lý các yêu cầu sử dụng voucher từ khách hàng</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm Claim Voucher</CardTitle>
          <CardDescription>Tìm kiếm theo tên khách hàng, số điện thoại hoặc mã voucher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="search">Tìm kiếm</Label>
              <Input
                id="search"
                placeholder="Nhập tên khách hàng, số điện thoại hoặc mã voucher"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Claim Voucher</CardTitle>
          <CardDescription>Tổng cộng {filteredClaims.length} yêu cầu</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Voucher</TableHead>
                <TableHead>Ngày claim</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày sử dụng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{claim.customerName}</p>
                      <p className="text-sm text-gray-500">{claim.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{claim.voucherCode}</p>
                      <p className="text-sm text-gray-500">{claim.voucherTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell>{claim.claimDate}</TableCell>
                  <TableCell>{getStatusBadge(claim.status)}</TableCell>
                  <TableCell>{claim.usedDate || "-"}</TableCell>
                  <TableCell>
                    {claim.status === "pending" && (
                      <Button size="sm" onClick={() => handleMarkAsUsed(claim)}>
                        Đánh dấu đã sử dụng
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isClaimSuccessOpen} onOpenChange={setIsClaimSuccessOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-green-600">✅ Xử lý voucher thành công!</DialogTitle>
          </DialogHeader>
          {claimedVoucher && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Khách hàng:</p>
                    <p className="font-medium">{claimedVoucher.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Số điện thoại:</p>
                    <p className="font-medium">{claimedVoucher.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Mã voucher:</p>
                    <p className="font-medium">{claimedVoucher.voucherCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ưu đãi:</p>
                    <p className="font-medium">{claimedVoucher.voucherTitle}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Thời gian sử dụng:</p>
                    <p className="font-medium">{claimedVoucher.usedDate}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Voucher đã được đánh dấu là đã sử dụng và không thể sử dụng lại.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-green-600 hover:bg-green-700">Đóng</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
