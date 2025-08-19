"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp, Eye, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const [trialInfo] = useState({
    isTrial: true,
    customerCount: 18,
    customerLimit: 30,
    daysLeft: 5,
  })

  // Mock customer data
  const customers = [
    {
      id: "MEM12345",
      name: "Nguyễn Văn A",
      phone: "0912345678",
      email: "nguyenvana@example.com",
      points: 1250,
      joinDate: "01/01/2023",
    },
    {
      id: "MEM12346",
      name: "Trần Thị B",
      phone: "0923456789",
      email: "tranthib@example.com",
      points: 850,
      joinDate: "15/02/2023",
    },
    {
      id: "MEM12347",
      name: "Lê Văn C",
      phone: "0934567890",
      email: "levanc@example.com",
      points: 2100,
      joinDate: "10/03/2023",
    },
    {
      id: "MEM12348",
      name: "Phạm Thị D",
      phone: "0945678901",
      email: "phamthid@example.com",
      points: 1500,
      joinDate: "05/04/2023",
    },
    {
      id: "MEM12349",
      name: "Hoàng Văn E",
      phone: "0956789012",
      email: "hoangvane@example.com",
      points: 750,
      joinDate: "20/05/2023",
    },
  ]

  // Mock point history - only show 3 most recent
  const pointHistory = [
    { id: 1, date: "01/06/2023", amount: -200, type: "redeem", description: "Đổi voucher VC12346" },
    { id: 2, date: "25/05/2023", amount: 300, type: "earn", description: "Hóa đơn #INV12347" },
    { id: 3, date: "20/05/2023", amount: -100, type: "redeem", description: "Đổi voucher VC12345" },
  ]

  // Mock voucher history
  const voucherHistory = [
    { id: "VC12345", title: "Giảm 50K", issueDate: "20/05/2023", expiryDate: "20/06/2023", status: "used" },
    {
      id: "VC12346",
      title: "Tặng món tráng miệng",
      issueDate: "01/06/2023",
      expiryDate: "01/07/2023",
      status: "active",
    },
    { id: "VC12347", title: "Giảm 20%", issueDate: "10/06/2023", expiryDate: "10/07/2023", status: "active" },
  ]

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField as keyof typeof a] > b[sortField as keyof typeof b] ? 1 : -1
    } else {
      return a[sortField as keyof typeof a] < b[sortField as keyof typeof b] ? 1 : -1
    }
  })

  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const generateCustomerId = () => {
    const prefix = "MEM"
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `${prefix}${randomNum}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý khách hàng</h2>
          <p className="text-muted-foreground">
            Danh sách khách hàng và thông tin thành viên
            {trialInfo.isTrial && (
              <span className="text-yellow-600 font-medium">
                {" "}
                • Dùng thử: {trialInfo.customerCount}/{trialInfo.customerLimit} khách hàng
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          disabled={trialInfo.isTrial && trialInfo.customerCount >= trialInfo.customerLimit}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      {trialInfo.isTrial && trialInfo.customerCount >= trialInfo.customerLimit && trialInfo.daysLeft <= 7 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-yellow-800">Đã đạt giới hạn khách hàng</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Tài khoản dùng thử chỉ cho phép tối đa {trialInfo.customerLimit} khách hàng.
            <Button variant="link" className="p-0 h-auto text-yellow-700 underline ml-1">
              Nâng cấp tài khoản
            </Button>{" "}
            để thêm khách hàng không giới hạn.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách khách hàng</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm theo tên, mã, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                    Mã KH
                    {sortField === "id" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                    Họ và tên
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end cursor-pointer" onClick={() => handleSort("points")}>
                    Điểm
                    {sortField === "points" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Không tìm thấy khách hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell className="text-right font-medium text-pink-600">{customer.points}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Sửa
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
            <DialogDescription>Nhập thông tin khách hàng để tạo tài khoản thành viên mới</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerCode" className="text-right">
                Mã KH
              </Label>
              <Input id="customerCode" value={generateCustomerId()} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input id="name" placeholder="Nhập họ và tên" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input id="phone" placeholder="Nhập số điện thoại" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" placeholder="Nhập email" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Tạo khách hàng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thông tin khách hàng</DialogTitle>
            <DialogDescription>Chi tiết thông tin và lịch sử hoạt động của khách hàng</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Mã khách hàng</Label>
                  <p className="font-medium">{selectedCustomer.id}</p>
                </div>
                <div>
                  <Label>Họ và tên</Label>
                  <p className="font-medium">{selectedCustomer.name}</p>
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <p className="font-medium">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label>Điểm tích lũy</Label>
                  <p className="font-medium text-pink-600">{selectedCustomer.points}</p>
                </div>
                <div>
                  <Label>Ngày tham gia</Label>
                  <p className="font-medium">{selectedCustomer.joinDate}</p>
                </div>
              </div>

              <div className="pt-2">
                <Tabs defaultValue="points">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="points">Lịch sử điểm</TabsTrigger>
                    <TabsTrigger value="vouchers">Voucher</TabsTrigger>
                  </TabsList>
                  <TabsContent value="points" className="pt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">3 giao dịch gần nhất</h4>
                        <Button variant="link" size="sm" className="text-blue-600">
                          Xem tất cả
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {pointHistory.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-sm font-medium">{item.description}</p>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                            <span className={`font-medium ${item.type === "earn" ? "text-green-600" : "text-red-600"}`}>
                              {item.type === "earn" ? "+" : ""}
                              {item.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="vouchers" className="pt-2">
                    <div className="space-y-2">
                      {voucherHistory.map((voucher) => (
                        <div key={voucher.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{voucher.title}</p>
                            <p className="text-xs text-gray-500">
                              {voucher.issueDate} - {voucher.expiryDate}
                            </p>
                          </div>
                          <Badge
                            variant={
                              voucher.status === "active"
                                ? "default"
                                : voucher.status === "used"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {voucher.status === "active"
                              ? "Còn hiệu lực"
                              : voucher.status === "used"
                                ? "Đã sử dụng"
                                : "Hết hạn"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin khách hàng</DialogTitle>
            <DialogDescription>Cập nhật thông tin khách hàng</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-customerCode" className="text-right">
                  Mã KH
                </Label>
                <Input id="edit-customerCode" value={selectedCustomer.id} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Họ và tên
                </Label>
                <Input id="edit-name" defaultValue={selectedCustomer.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Số điện thoại
                </Label>
                <Input id="edit-phone" defaultValue={selectedCustomer.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" defaultValue={selectedCustomer.email} className="col-span-3" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa khách hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{selectedCustomer.name}</p>
              <p className="text-sm text-gray-500">Mã: {selectedCustomer.id}</p>
              <p className="text-sm text-gray-500">SĐT: {selectedCustomer.phone}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive">Xóa khách hàng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
