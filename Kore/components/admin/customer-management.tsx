"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance"; // ✅ dùng axios custom
import { Search, Plus, Edit, Trash2, Eye, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [trialInfo] = useState({
    isTrial: true,
    customerCount: 18,
    customerLimit: 30,
    daysLeft: 5,
  });

  const API_URL = "/admin/customers";

  // ✅ Load danh sách khách hàng từ BE
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_URL);
        setCustomers(res.data || []);
      } catch (err: any) {
        console.error("❌ Lỗi tải danh sách khách hàng:", err);
        if (err.response?.status === 401) alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // ✅ Sắp xếp danh sách
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const filteredCustomers = sortedCustomers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm)
  );

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  // ✅ Sinh mã khách hàng không trùng
  const generateUniqueCustomerCode = (): string => {
    let code = "";
    const existingCodes = new Set(customers.map((c) => c.customerCode));
    do {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      code = `KH${randomNum}`;
    } while (existingCodes.has(code));
    return code;
  };

  // ✅ Gọi API tạo khách hàng
  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Vui lòng nhập đầy đủ họ tên và email");
      return;
    }

    const customerCode = generateUniqueCustomerCode();

    try {
      const res = await axiosInstance.post(API_URL, {
        customerCode,
        name: newCustomer.name,
        phone: newCustomer.phone,
        email: newCustomer.email,
        password: "123456", // mật khẩu mặc định
        active: true,
      });

      alert("✅ Tạo khách hàng thành công!");
      setIsAddDialogOpen(false);
      setNewCustomer({ name: "", phone: "", email: "" });
      setCustomers((prev) => [...prev, res.data]);
    } catch (error: any) {
      console.error("❌ Lỗi tạo khách hàng:", error);
      alert(error.response?.data?.message || "Lỗi khi tạo khách hàng!");
    }
  };

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
          {loading ? (
            <p className="text-center text-gray-500 py-8">Đang tải dữ liệu...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã KH</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Email</TableHead>
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
                    <TableRow key={customer.customerCode}>
                      <TableCell>{customer.customerCode}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
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
          )}
        </CardContent>
      </Card>

      {/* Dialog thêm khách hàng */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
            <DialogDescription>Nhập thông tin khách hàng để tạo tài khoản mới</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input
                id="name"
                placeholder="Nhập họ và tên"
                className="col-span-3"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                placeholder="Nhập số điện thoại"
                className="col-span-3"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Nhập email"
                className="col-span-3"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateCustomer}>Tạo khách hàng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
