"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Gift, Edit, Trash2, MoreHorizontal, Calendar, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Promotion {
  id: string
  title: string
  description: string
  voucherType: string
  voucherValue: string
  quantity: number
  collected: number
  startDate: string
  endDate: string
  isActive: boolean
  eventType: string
  createdAt: string
}

export default function PromotionManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      title: "Giảm giá 30% - Khai trương chi nhánh mới",
      description: "Voucher giảm giá 30% cho đơn hàng từ 200K, áp dụng tại chi nhánh mới",
      voucherType: "Giảm giá",
      voucherValue: "30%",
      quantity: 100,
      collected: 45,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      isActive: true,
      eventType: "Khai trương",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Tặng 1 ly nước miễn phí",
      description: "Voucher tặng 1 ly nước miễn phí khi đánh giá 5 sao Google Maps",
      voucherType: "Miễn phí",
      voucherValue: "1 ly nước",
      quantity: 50,
      collected: 12,
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      isActive: true,
      eventType: "Đánh giá",
      createdAt: "2024-01-01",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    voucherType: "",
    voucherValue: "",
    quantity: "",
    startDate: "",
    endDate: "",
    eventType: "",
  })

  const handleSubmit = () => {
    if (editingPromotion) {
      setPromotions(
        promotions.map((promo) =>
          promo.id === editingPromotion.id
            ? {
                ...promo,
                ...formData,
                quantity: Number.parseInt(formData.quantity) || 0,
              }
            : promo,
        ),
      )
      setEditingPromotion(null)
    } else {
      const newPromotion: Promotion = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        voucherType: formData.voucherType,
        voucherValue: formData.voucherValue,
        quantity: Number.parseInt(formData.quantity) || 0,
        collected: 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: true,
        eventType: formData.eventType,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setPromotions([...promotions, newPromotion])
    }

    setFormData({
      title: "",
      description: "",
      voucherType: "",
      voucherValue: "",
      quantity: "",
      startDate: "",
      endDate: "",
      eventType: "",
    })
    setShowAddDialog(false)
  }

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      title: promotion.title,
      description: promotion.description,
      voucherType: promotion.voucherType,
      voucherValue: promotion.voucherValue,
      quantity: promotion.quantity.toString(),
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      eventType: promotion.eventType,
    })
    setShowAddDialog(true)
  }

  const handleDelete = (id: string) => {
    setPromotions(promotions.filter((promo) => promo.id !== id))
  }

  const toggleActive = (id: string) => {
    setPromotions(promotions.map((promo) => (promo.id === id ? { ...promo, isActive: !promo.isActive } : promo)))
  }

  const openAddDialog = () => {
    setEditingPromotion(null)
    setFormData({
      title: "",
      description: "",
      voucherType: "",
      voucherValue: "",
      quantity: "",
      startDate: "",
      endDate: "",
      eventType: "",
    })
    setShowAddDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Chương trình Khuyến mãi</h2>
          <p className="text-gray-600">Tạo voucher theo sự kiện để khách hàng thu thập</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo chương trình
        </Button>

        {showAddDialog && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingPromotion ? "Chỉnh sửa chương trình" : "Tạo chương trình khuyến mãi"}</DialogTitle>
                <DialogDescription>Tạo voucher theo sự kiện để khách hàng có thể thu thập và sử dụng</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Tiêu đề chương trình *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="VD: Giảm giá 30% - Khai trương chi nhánh mới"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Mô tả chương trình</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Loại sự kiện *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại sự kiện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Khai trương">Khai trương</SelectItem>
                      <SelectItem value="Sinh nhật">Sinh nhật nhà hàng</SelectItem>
                      <SelectItem value="Lễ hội">Lễ hội/Ngày lễ</SelectItem>
                      <SelectItem value="Đánh giá">Đánh giá 5 sao</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="voucherType">Loại voucher *</Label>
                  <Select
                    value={formData.voucherType}
                    onValueChange={(value) => setFormData({ ...formData, voucherType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại voucher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Giảm giá">Giảm giá</SelectItem>
                      <SelectItem value="Miễn phí">Miễn phí</SelectItem>
                      <SelectItem value="Combo">Combo đặc biệt</SelectItem>
                      <SelectItem value="Tặng kèm">Tặng kèm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="voucherValue">Giá trị voucher *</Label>
                  <Input
                    id="voucherValue"
                    value={formData.voucherValue}
                    onChange={(e) => setFormData({ ...formData, voucherValue: e.target.value })}
                    placeholder="VD: 30%, 50K, 1 ly nước"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Số lượng *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Ngày kết thúc *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.voucherType || !formData.quantity}
                >
                  {editingPromotion ? "Cập nhật" : "Tạo chương trình"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng chương trình</p>
                <p className="text-2xl font-bold">{promotions.length}</p>
              </div>
              <Gift className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{promotions.filter((p) => p.isActive).length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng voucher</p>
                <p className="text-2xl font-bold">{promotions.reduce((sum, p) => sum + p.quantity, 0)}</p>
              </div>
              <Gift className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã thu thập</p>
                <p className="text-2xl font-bold text-orange-600">
                  {promotions.reduce((sum, p) => sum + p.collected, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chương trình</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chương trình</TableHead>
                <TableHead>Loại sự kiện</TableHead>
                <TableHead>Voucher</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[70px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">{promotion.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{promotion.eventType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.voucherType}</p>
                      <p className="text-sm text-gray-500">{promotion.voucherValue}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {promotion.collected}/{promotion.quantity}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(promotion.collected / promotion.quantity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{promotion.startDate}</p>
                      <p className="text-gray-500">đến {promotion.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={promotion.isActive}
                        onCheckedChange={() => toggleActive(promotion.id)}
                        size="sm"
                      />
                      <Badge variant={promotion.isActive ? "default" : "secondary"}>
                        {promotion.isActive ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(promotion)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(promotion.id)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {promotions.length === 0 && (
            <div className="text-center py-8">
              <Gift className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Chưa có chương trình khuyến mãi nào</p>
              <p className="text-gray-400 text-sm">Tạo chương trình đầu tiên để bắt đầu</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
