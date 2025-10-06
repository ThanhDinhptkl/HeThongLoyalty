"use client"

import { useState } from "react"
import { Search, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

export default function TrialManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTrial, setSelectedTrial] = useState<any>(null)
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false)

  // Mock trial accounts data - bao gồm dữ liệu từ đăng ký tự động
  const trialAccounts = [
    {
      id: "TRIAL001",
      restaurantName: "Golden Flavor",
      slug: "golden-flavor",
      ownerName: "Nguyễn Văn A",
      email: "admin@goldenflavor.com",
      phone: "028 3823 4567",
      startDate: "15/05/2023",
      expiryDate: "15/06/2023",
      daysLeft: 7,
      customerCount: 28,
      customerLimit: 30,
      status: "active",
      lastLogin: "10/06/2023 10:30",
      source: "manual", // manual hoặc registration
    },
    {
      id: "TRIAL002",
      restaurantName: "Saigon Bistro",
      slug: "saigon-bistro",
      ownerName: "Trần Thị B",
      email: "admin@saigonbistro.com",
      phone: "028 3456 7890",
      startDate: "01/06/2023",
      expiryDate: "01/07/2023",
      daysLeft: 23,
      customerCount: 15,
      customerLimit: 30,
      status: "active",
      lastLogin: "09/06/2023 14:15",
      source: "registration", // Từ đăng ký tự động
    },
    {
      id: "TRIAL003",
      restaurantName: "Hanoi Kitchen",
      slug: "hanoi-kitchen",
      ownerName: "Lê Văn C",
      email: "admin@hanoikitchen.com",
      phone: "024 3987 6543",
      startDate: "10/04/2023",
      expiryDate: "10/05/2023",
      daysLeft: -30,
      customerCount: 25,
      customerLimit: 30,
      status: "expired",
      lastLogin: "01/05/2023 11:20",
      source: "registration", // Từ đăng ký tự động
    },
    {
      id: "TRIAL004",
      restaurantName: "Ocean View",
      slug: "ocean-view",
      ownerName: "Phạm Thị D",
      email: "admin@oceanview.com",
      phone: "028 7654 3210",
      startDate: "20/03/2023",
      expiryDate: "20/04/2023",
      daysLeft: -52,
      customerCount: 30,
      customerLimit: 30,
      status: "converted",
      lastLogin: "08/06/2023 16:45",
      source: "registration", // Từ đăng ký tự động
    },
    // Thêm tài khoản mới từ đăng ký gần đây
    {
      id: "TRIAL005",
      restaurantName: "Fresh Garden",
      slug: "fresh-garden",
      ownerName: "Hoàng Thị E",
      email: "admin@freshgarden.com",
      phone: "028 9876 5432",
      startDate: "12/06/2023",
      expiryDate: "12/07/2023",
      daysLeft: 30,
      customerCount: 0,
      customerLimit: 30,
      status: "active",
      lastLogin: "12/06/2023 09:15",
      source: "registration", // Mới đăng ký
    },
  ]

  const filteredTrials = trialAccounts.filter(
    (trial) =>
      trial.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string, daysLeft: number) => {
    if (status === "expired") {
      return <Badge variant="destructive">Hết hạn</Badge>
    }
    if (status === "converted") {
      return <Badge className="bg-green-600">Đã nâng cấp</Badge>
    }
    if (daysLeft <= 7) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Sắp hết hạn
        </Badge>
      )
    }
    return <Badge variant="default">Đang dùng thử</Badge>
  }

  const getCustomerProgress = (current: number, limit: number) => {
    return (current / limit) * 100
  }

  const handleExtendTrial = (trial: any) => {
    setSelectedTrial(trial)
    setIsExtendDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý tài khoản dùng thử</h2>
          <p className="text-muted-foreground">Theo dõi và quản lý các tài khoản dùng thử</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng tài khoản dùng thử</p>
                <h3 className="text-2xl font-bold">{trialAccounts.length}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đang hoạt động</p>
                <h3 className="text-2xl font-bold">{trialAccounts.filter((t) => t.status === "active").length}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sắp hết hạn</p>
                <h3 className="text-2xl font-bold">
                  {trialAccounts.filter((t) => t.status === "active" && t.daysLeft <= 7).length}
                </h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã nâng cấp</p>
                <h3 className="text-2xl font-bold">{trialAccounts.filter((t) => t.status === "converted").length}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách tài khoản dùng thử</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm theo tên, email..."
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
                <TableHead>Nhà hàng</TableHead>
                <TableHead>Chủ sở hữu</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Thời gian còn lại</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Không tìm thấy tài khoản dùng thử nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrials.map((trial) => (
                  <TableRow key={trial.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{trial.restaurantName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          /{trial.slug}
                          {trial.source === "registration" && (
                            <Badge variant="outline" className="text-xs">
                              Tự đăng ký
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trial.ownerName}</TableCell>
                    <TableCell>{trial.email}</TableCell>
                    <TableCell>
                      {trial.status === "active" ? (
                        <div className={`text-sm ${trial.daysLeft <= 7 ? "text-red-600" : "text-green-600"}`}>
                          {trial.daysLeft > 0 ? `${trial.daysLeft} ngày` : "Hết hạn"}
                        </div>
                      ) : trial.status === "expired" ? (
                        <div className="text-sm text-red-600">Đã hết hạn</div>
                      ) : (
                        <div className="text-sm text-green-600">Đã nâng cấp</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {trial.customerCount}/{trial.customerLimit}
                        </div>
                        <Progress
                          value={getCustomerProgress(trial.customerCount, trial.customerLimit)}
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(trial.status, trial.daysLeft)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {trial.status === "active" && trial.daysLeft <= 7 && (
                          <Button size="sm" variant="outline" onClick={() => handleExtendTrial(trial)}>
                            Gia hạn
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          Chi tiết
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

      {/* Extend Trial Dialog */}
      <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gia hạn tài khoản dùng thử</DialogTitle>
            <DialogDescription>
              Gia hạn thời gian dùng thử cho nhà hàng {selectedTrial?.restaurantName}
            </DialogDescription>
          </DialogHeader>
          {selectedTrial && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Nhà hàng:</span>
                    <p className="font-medium">{selectedTrial.restaurantName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Hết hạn hiện tại:</span>
                    <p className="font-medium">{selectedTrial.expiryDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Khách hàng:</span>
                    <p className="font-medium">
                      {selectedTrial.customerCount}/{selectedTrial.customerLimit}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Còn lại:</span>
                    <p className="font-medium text-red-600">{selectedTrial.daysLeft} ngày</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gia hạn thêm:</label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    7 ngày
                  </Button>
                  <Button variant="outline" size="sm">
                    15 ngày
                  </Button>
                  <Button variant="outline" size="sm">
                    30 ngày
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExtendDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">Gia hạn</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
