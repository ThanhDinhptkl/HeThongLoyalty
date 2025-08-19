"use client"

import { useState } from "react"
import { Search, Plus, Trash2, Shield, MoreHorizontal, User, CheckCircle, XCircle } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isEditInfoDialogOpen, setIsEditInfoDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [currentUserRole, setCurrentUserRole] = useState("owner") // Demo: Current user role

  // Mock user data with updated roles
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "owner@example.com",
      role: "owner",
      status: "active",
      lastLogin: "10/06/2023 10:30",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "manager@example.com",
      role: "manager",
      status: "active",
      lastLogin: "09/06/2023 14:15",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "staff1@example.com",
      role: "staff",
      status: "active",
      lastLogin: "10/06/2023 09:45",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "staff2@example.com",
      role: "staff",
      status: "inactive",
      lastLogin: "01/05/2023 11:20",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "staff3@example.com",
      role: "staff",
      status: "active",
      lastLogin: "10/06/2023 08:30",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const canPerformAction = (action: string, targetUserRole: string) => {
    if (currentUserRole === "owner") {
      return true // Owner can do anything
    }
    if (currentUserRole === "manager") {
      if (targetUserRole === "owner") return false
      return true // Manager can manage staff
    }
    return false // Staff can't do anything
  }

  const handleEditInfo = (user: any) => {
    setSelectedUser(user)
    setIsEditInfoDialogOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleToggleUserStatus = (user: any) => {
    // In a real application, you would make an API call to update the user's status
    // For this example, we'll just toggle the status in the local state
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u,
    )
    // You would likely update your state management here with the updatedUsers
    console.log("Toggling user status - not fully implemented in this example")
  }

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "staff":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "owner":
        return "Chủ thương hiệu"
      case "manager":
        return "Quản lý"
      case "staff":
        return "Nhân viên"
      default:
        return role
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý nhân viên</h2>
          <p className="text-muted-foreground">Quản lý tài khoản và phân quyền nhân viên</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách nhân viên</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm theo tên, email, vai trò..."
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
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Không tìm thấy nhân viên nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
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
                          {canPerformAction("editInfo", user.role) && (
                            <>
                              <DropdownMenuItem onClick={() => handleEditInfo(user)}>
                                <User className="mr-2 h-4 w-4" />
                                Sửa thông tin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {canPerformAction("editPermissions", user.role) && (
                            <>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Shield className="mr-2 h-4 w-4" />
                                Sửa quyền
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {canPerformAction("toggleStatus", user.role) && (
                            <>
                              <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                                {user.status === "active" ? (
                                  <>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Tắt hoạt động
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Kích hoạt
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {canPerformAction("delete", user.role) && user.role !== "owner" && (
                            <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          )}
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

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm nhân viên mới</DialogTitle>
            <DialogDescription>Nhập thông tin để tạo tài khoản nhân viên mới</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input id="name" placeholder="Nhập họ và tên" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Nhập email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Mật khẩu
              </Label>
              <Input id="password" type="password" placeholder="Nhập mật khẩu" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Chủ thương hiệu</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Tạo nhân viên</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sửa quyền nhân viên</DialogTitle>
            <DialogDescription>Cập nhật vai trò và trạng thái nhân viên</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Họ và tên
                </Label>
                <Input id="edit-name" defaultValue={selectedUser.name} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Vai trò
                </Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Chủ thương hiệu</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Trạng thái
                </Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Edit Info Dialog */}
      <Dialog open={isEditInfoDialogOpen} onOpenChange={setIsEditInfoDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sửa thông tin nhân viên</DialogTitle>
            <DialogDescription>Cập nhật thông tin cá nhân của nhân viên</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-info-name" className="text-right">
                  Họ và tên
                </Label>
                <Input id="edit-info-name" defaultValue={selectedUser.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-info-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-info-email" type="email" defaultValue={selectedUser.email} className="col-span-3" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditInfoDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa nhân viên</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa nhân viên này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{selectedUser.name}</p>
              <p className="text-sm text-gray-500">Email: {selectedUser.email}</p>
              <p className="text-sm text-gray-500">Vai trò: {getRoleDisplayName(selectedUser.role)}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive">Xóa nhân viên</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
