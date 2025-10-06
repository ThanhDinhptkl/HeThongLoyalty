"use client"

import { useState } from "react"
import { Search, Plus, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function VoucherIssuance() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedVoucherType, setSelectedVoucherType] = useState("discount")
  const [selectedCustomerType, setSelectedCustomerType] = useState("specific")
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  // Mock voucher templates
  const voucherTemplates = [
    { id: 1, title: "Giảm 50K cho hóa đơn từ 200K", type: "discount", value: "50000" },
    { id: 2, title: "Giảm 20% tổng hóa đơn", type: "percent", value: "20" },
    { id: 3, title: "Tặng 1 phần tráng miệng", type: "gift", value: "Tráng miệng" },
    { id: 4, title: "Mua 1 tặng 1 đồ uống", type: "bogo", value: "Đồ uống" },
  ]

  const handleIssueVoucher = () => {
    setIsIssueDialogOpen(false)

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)
      setIsSuccessDialogOpen(true)

      //Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setIsSuccessDialogOpen(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cấp voucher</h2>
          <p className="text-muted-foreground">Tạo và cấp voucher cho khách hàng</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo voucher mới
          </Button>
          <Button onClick={() => setIsIssueDialogOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            Cấp voucher
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách mẫu voucher</CardTitle>
          <CardDescription>Các mẫu voucher có sẵn để cấp cho khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voucherTemplates.map((template) => (
              <Card key={template.id} className="border-2 hover:border-pink-200 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-pink-100">
                      {template.type === "discount" && <span className="text-pink-600 font-bold">₫</span>}
                      {template.type === "percent" && <span className="text-pink-600 font-bold">%</span>}
                      {template.type === "gift" && <span className="text-pink-600 font-bold">🎁</span>}
                      {template.type === "bogo" && <span className="text-pink-600 font-bold">2=1</span>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsIssueDialogOpen(true)}>
                      Cấp
                    </Button>
                  </div>
                  <h3 className="mt-3 font-medium">{template.title}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    {template.type === "discount" && `Giảm ${Number.parseInt(template.value).toLocaleString()}₫`}
                    {template.type === "percent" && `Giảm ${template.value}%`}
                    {template.type === "gift" && `Tặng ${template.value}`}
                    {template.type === "bogo" && `Mua 1 tặng 1 cho ${template.value}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* {isSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Cấp voucher thành công!</AlertTitle>
          <AlertDescription className="text-green-700">Đã cấp voucher cho khách hàng đã chọn.</AlertDescription>
        </Alert>
      )} */}

      {/* Create Voucher Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tạo voucher mới</DialogTitle>
            <DialogDescription>Tạo mẫu voucher mới để cấp cho khách hàng</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="voucherTitle" className="text-right">
                Tiêu đề
              </Label>
              <Input id="voucherTitle" placeholder="Nhập tiêu đề voucher" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="voucherType" className="text-right">
                Loại voucher
              </Label>
              <Select value={selectedVoucherType} onValueChange={setSelectedVoucherType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn loại voucher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Giảm giá cố định</SelectItem>
                  <SelectItem value="percent">Giảm giá phần trăm</SelectItem>
                  <SelectItem value="gift">Tặng quà</SelectItem>
                  <SelectItem value="bogo">Mua 1 tặng 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="voucherValue" className="text-right">
                Giá trị
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="voucherValue"
                  placeholder={
                    selectedVoucherType === "discount"
                      ? "Nhập số tiền"
                      : selectedVoucherType === "percent"
                        ? "Nhập phần trăm"
                        : selectedVoucherType === "gift"
                          ? "Nhập tên quà tặng"
                          : "Nhập loại sản phẩm"
                  }
                  className="flex-1"
                />
                {selectedVoucherType === "discount" && <span className="ml-2">VNĐ</span>}
                {selectedVoucherType === "percent" && <span className="ml-2">%</span>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minPurchase" className="text-right">
                Đơn tối thiểu
              </Label>
              <div className="col-span-3 flex items-center">
                <Input id="minPurchase" placeholder="Nhập giá trị đơn tối thiểu" className="flex-1" />
                <span className="ml-2">VNĐ</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validDays" className="text-right">
                Thời hạn
              </Label>
              <div className="col-span-3 flex items-center">
                <Input id="validDays" placeholder="Số ngày có hiệu lực" type="number" className="flex-1" />
                <span className="ml-2">ngày</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Tạo voucher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Voucher Dialog */}
      <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cấp voucher cho khách hàng</DialogTitle>
            <DialogDescription>Chọn voucher và khách hàng để cấp</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="mb-2 block">Chọn voucher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn voucher" />
                </SelectTrigger>
                <SelectContent>
                  {voucherTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <Label className="mb-2 block">Cấp cho</Label>
              <RadioGroup value={selectedCustomerType} onValueChange={setSelectedCustomerType} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific">Khách hàng cụ thể</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">Tất cả khách hàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="filtered" id="filtered" />
                  <Label htmlFor="filtered">Khách hàng theo điều kiện</Label>
                </div>
              </RadioGroup>
            </div>

            {selectedCustomerType === "specific" && (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input placeholder="Tìm kiếm khách hàng..." />
                </div>
                <div className="max-h-20 overflow-y-auto border rounded-md">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center space-x-2 py-1 border-b last:border-0 px-2">
                      <Checkbox id={`customer-${i}`} />
                      <Label htmlFor={`customer-${i}`} className="flex-1 text-sm">
                        <div>Nguyễn Văn {String.fromCharCode(64 + i)}</div>
                        <div className="text-xs text-gray-500">MEM1234{i}</div>
                      </Label>
                      <div className="text-sm text-pink-600 font-medium">{i * 200} điểm</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Hiển thị 2 trong 15 khách hàng. Sử dụng tìm kiếm để lọc.</p>
              </div>
            )}

            {selectedCustomerType === "filtered" && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minPoints" className="mb-1 block text-sm">
                      Điểm tối thiểu
                    </Label>
                    <Input id="minPoints" type="number" placeholder="0" className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="joinedBefore" className="mb-1 block text-sm">
                      Tham gia trước
                    </Label>
                    <Input id="joinedBefore" type="date" className="text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="mb-1 block text-sm">Đã sử dụng voucher</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Chọn điều kiện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Bất kỳ</SelectItem>
                      <SelectItem value="yes">Có</SelectItem>
                      <SelectItem value="no">Không</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Voucher sẽ có hiệu lực từ ngày cấp và hết hạn sau 30 ngày</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIssueDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleIssueVoucher}>Cấp voucher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thành công</DialogTitle>
            <DialogDescription>Đã cấp voucher cho khách hàng đã chọn.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
