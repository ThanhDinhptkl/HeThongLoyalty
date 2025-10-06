"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Building2, Users, Activity } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

export default function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)

  // Mock restaurant data
  const restaurants = [
    {
      id: "REST001",
      name: "Golden Flavor",
      slug: "golden-flavor",
      adminEmail: "admin@goldenflavor.com",
      phone: "028 3823 4567",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      status: "active",
      totalCustomers: 1248,
      totalPoints: 45290,
      createdDate: "01/01/2023",
      lastLogin: "10/06/2023 10:30",
    },
    {
      id: "REST002",
      name: "Saigon Bistro",
      slug: "saigon-bistro",
      adminEmail: "admin@saigonbistro.com",
      phone: "028 3456 7890",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      status: "active",
      totalCustomers: 892,
      totalPoints: 32150,
      createdDate: "15/02/2023",
      lastLogin: "09/06/2023 14:15",
    },
    {
      id: "REST003",
      name: "Hanoi Kitchen",
      slug: "hanoi-kitchen",
      adminEmail: "admin@hanoikitchen.com",
      phone: "024 3987 6543",
      address: "789 Hoàn Kiếm, Hà Nội",
      status: "inactive",
      totalCustomers: 567,
      totalPoints: 18900,
      createdDate: "10/03/2023",
      lastLogin: "01/05/2023 11:20",
    },
  ]

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setIsViewDialogOpen(true)
  }

  const handleDeleteRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setIsDeleteDialogOpen(true)
  }

  const generateRestaurantId = () => {
    const prefix = "REST"
    const randomNum = Math.floor(100 + Math.random() * 900)
    return `${prefix}${randomNum.toString().padStart(3, "0")}`
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý nhà hàng</h2>
          <p className="text-muted-foreground">Quản lý các nhà hàng trong hệ thống</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhà hàng
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng nhà hàng</p>
                <h3 className="text-2xl font-bold">{restaurants.length}</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <Building2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng khách hàng</p>
                <h3 className="text-2xl font-bold">
                  {restaurants.reduce((sum, r) => sum + r.totalCustomers, 0).toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nhà hàng hoạt động</p>
                <h3 className="text-2xl font-bold">{restaurants.filter((r) => r.status === "active").length}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách nhà hàng</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm theo tên, mã, email..."
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
                <TableHead className="w-[100px]">Mã</TableHead>
                <TableHead>Tên nhà hàng</TableHead>
                <TableHead>Email quản trị</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRestaurants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Không tìm thấy nhà hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell className="font-medium">{restaurant.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{restaurant.name}</div>
                        <div className="text-sm text-gray-500">/{restaurant.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>{restaurant.adminEmail}</TableCell>
                    <TableCell>{restaurant.phone}</TableCell>
                    <TableCell className="font-medium">{restaurant.totalCustomers.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={restaurant.status === "active" ? "default" : "secondary"}>
                        {restaurant.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewRestaurant(restaurant)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Building2 className="mr-2 h-4 w-4" />
                            Truy cập admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteRestaurant(restaurant)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Restaurant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm nhà hàng mới</DialogTitle>
            <DialogDescription>Nhập thông tin để tạo nhà hàng mới trong hệ thống</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurantId" className="text-right">
                Mã nhà hàng
              </Label>
              <Input id="restaurantId" value={generateRestaurantId()} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurantName" className="text-right">
                Tên nhà hàng
              </Label>
              <Input
                id="restaurantName"
                placeholder="Nhập tên nhà hàng"
                className="col-span-3"
                onChange={(e) => {
                  const slugField = document.getElementById("restaurantSlug") as HTMLInputElement
                  if (slugField) {
                    slugField.value = generateSlug(e.target.value)
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurantSlug" className="text-right">
                Đường dẫn
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-1">/partner/</span>
                  <Input id="restaurantSlug" placeholder="duong-dan-nha-hang" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminEmail" className="text-right">
                Email quản trị
              </Label>
              <Input id="adminEmail" type="email" placeholder="admin@restaurant.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminPassword" className="text-right">
                Mật khẩu quản trị
              </Label>
              <Input id="adminPassword" type="password" placeholder="Mật khẩu mặc định" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input id="phone" placeholder="Nhập số điện thoại" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input id="address" placeholder="Nhập địa chỉ nhà hàng" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Tạo nhà hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Restaurant Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Thông tin nhà hàng</DialogTitle>
            <DialogDescription>Chi tiết thông tin và thống kê của nhà hàng</DialogDescription>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Mã nhà hàng</Label>
                  <p className="font-medium">{selectedRestaurant.id}</p>
                </div>
                <div>
                  <Label>Tên nhà hàng</Label>
                  <p className="font-medium">{selectedRestaurant.name}</p>
                </div>
                <div>
                  <Label>Đường dẫn</Label>
                  <p className="font-medium text-blue-600">/partner/{selectedRestaurant.slug}</p>
                </div>
                <div>
                  <Label>Email quản trị</Label>
                  <p className="font-medium">{selectedRestaurant.adminEmail}</p>
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <p className="font-medium">{selectedRestaurant.phone}</p>
                </div>
                <div>
                  <Label>Ngày tạo</Label>
                  <p className="font-medium">{selectedRestaurant.createdDate}</p>
                </div>
              </div>

              <div>
                <Label>Địa chỉ</Label>
                <p className="font-medium">{selectedRestaurant.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Tổng khách hàng</p>
                  <p className="text-2xl font-bold text-blue-700">{selectedRestaurant.totalCustomers}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Tổng điểm đã cấp</p>
                  <p className="text-2xl font-bold text-green-700">{selectedRestaurant.totalPoints}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Đăng nhập gần nhất</p>
                  <p className="text-sm font-medium text-purple-700">{selectedRestaurant.lastLogin}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Restaurant Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa nhà hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa nhà hàng này? Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
            </DialogDescription>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="font-medium text-red-800">{selectedRestaurant.name}</p>
              <p className="text-sm text-red-600">Mã: {selectedRestaurant.id}</p>
              <p className="text-sm text-red-600">Email: {selectedRestaurant.adminEmail}</p>
              <p className="text-sm text-red-600">Khách hàng: {selectedRestaurant.totalCustomers}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive">Xóa nhà hàng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
