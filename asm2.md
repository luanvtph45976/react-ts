Xây dựng ứng dụng react-typescript bao gồm các tính năng sau:

Thực hiện assignment theo hình thức cá nhân ở nhà, chấm tại lớp.

### 1. Trang Home hiển thị danh sách sản phẩm (3đ)

1.  Có banner slide (0.5đ)
2.  Có tính năng lọc, sắp xếp hoặc tìm kiếm: +0.5đ/tính năng (tối đa 2đ)
3.  Danh sách sản phẩm (0.5đ)

### 2. Trang chi tiết: (1đ)

1.  Hiển thị đầy đủ thông tin sản phẩm (0.5đ)
2.  Ấn nút mua hàng thì phải tăng được số lượng trên giỏ hàng ở header. (0.5đ) - Gợi ý: sử dụng useContext và useReducer cho cart

### 3. Trang giỏ hàng (2đ):

1.  Hiển thị danh sách sản phẩm và số lượng tương ứng khi thêm vào giỏ hàng tương ứng với user. (1đ)
2.  Tính năng thanh toán (1đ): Khi ấn thanh toán, hiển thị mã QR thẻ ngân hàng và yêu cầu chuyển khoản, thông báo thành công khi khách hàng ấn “Đã thanh toán”.

### 4. Trang Admin (4đ):

1.  Phân quyền: nếu tài khoản có role===”admin” thì mới vào được trang admin. (1đ)
2.  CRUD sản phẩm (1đ)
3.  Danh sách user đang hoạt động (1đ)
4.  Danh sách đơn hàng (bao gồm các thông tin chi tiết của đơn hàng và admin có thể thay đổi trạng thái đơn hàng: huỷ, đã thanh toán, chưa thanh toán, đang giao, giao thành công) (1đ)

### Yêu cầu thêm:

- Khai báo kiểu dữ liệu là any, unknown: -1đ
- Giao diện xấu: -1đ
