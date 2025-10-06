"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Upload, Edit, Trash2, MoreHorizontal, Eye, ExternalLink } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Banner {
  id: string
  title: string
  imageUrl: string
  linkUrl: string
  isActive: boolean
  order: number
  createdAt: string
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Khuyến mãi mùa hè",
      imageUrl: "/placeholder.svg?height=200&width=800",
      linkUrl: "https://example.com/summer-promotion",
      isActive: true,
      order: 1,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Menu mới 2024",
      imageUrl: "/placeholder.svg?height=200&width=800",
      linkUrl: "https://example.com/new-menu",
      isActive: false,
      order: 2,
      createdAt: "2024-01-10",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    linkUrl: "",
  })

  const handleSubmit = () => {
    if (editingBanner) {
      setBanners(banners.map((banner) => (banner.id === editingBanner.id ? { ...banner, ...formData } : banner)))
      setEditingBanner(null)
    } else {
      const newBanner: Banner = {
        id: Date.now().toString(),
        title: formData.title,
        imageUrl: formData.imageUrl || "/placeholder.svg?height=200&width=800",
        linkUrl: formData.linkUrl,
        isActive: true,
        order: banners.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setBanners([...banners, newBanner])
    }

    setFormData({ title: "", imageUrl: "", linkUrl: "" })
    setShowAddDialog(false)
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
    })
    setShowAddDialog(true)
  }

  const handleDelete = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id))
  }

  const toggleActive = (id: string) => {
    setBanners(banners.map((banner) => (banner.id === id ? { ...banner, isActive: !banner.isActive } : banner)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Banner</h2>
          <p className="text-gray-600">Quản lý banner hiển thị trên ứng dụng khách hàng</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm Banner
        </Button>

        {showAddDialog && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingBanner ? "Chỉnh sửa Banner" : "Thêm Banner mới"}</DialogTitle>
                <DialogDescription>Kích thước khuyến nghị: 800x200px. Định dạng: JPG, PNG</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Tiêu đề Banner *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nhập tiêu đề banner"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Hình ảnh Banner</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="URL hình ảnh hoặc upload file"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kích thước khuyến nghị: 800x200px</p>
                </div>
                <div>
                  <Label htmlFor="link">Liên kết (tùy chọn)</Label>
                  <Input
                    id="link"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Để trống nếu không cần liên kết</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.title}>
                  {editingBanner ? "Cập nhật" : "Thêm Banner"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Banner</CardTitle>
          <CardDescription>
            Tổng cộng {banners.length} banner • {banners.filter((b) => b.isActive).length} đang hoạt động
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Liên kết</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="w-[70px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <img
                      src={banner.imageUrl || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-20 h-10 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>
                    {banner.linkUrl ? (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span className="text-xs text-gray-500 truncate max-w-[100px]">{banner.linkUrl}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Không có</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={banner.isActive} onCheckedChange={() => toggleActive(banner.id)} size="sm" />
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>#{banner.order}</TableCell>
                  <TableCell>{banner.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(banner.imageUrl, "_blank")}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem ảnh
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(banner)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(banner.id)} className="text-red-600">
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

          {banners.length === 0 && (
            <div className="text-center py-8">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Chưa có banner nào</p>
              <p className="text-gray-400 text-sm">Thêm banner đầu tiên để bắt đầu</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
