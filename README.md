# React + TypeScript + Vite

Mẫu này cung cấp thiết lập tối thiểu để React hoạt động trong Vite với HMR và một số quy tắc ESLint.

Hiện tại, có hai plugin chính thức:

@vitejs/plugin-react sử dụng Babel để làm mới nhanh
@vitejs/plugin-react-swc sử dụng SWC để làm mới nhanh
Mở rộng cấu hình ESLint
Nếu đang phát triển một ứng dụng sản xuất, bạn nên cập nhật cấu hình để bật quy tắc tìm lỗi mã nguồn nhận biết loại:

Định cấu hình thuộc tính ParserOptions cấp cao nhất như thế này:
xuất mặc định {
// các quy tắc khác...
tùy chọn phân tích cú pháp: {
ecmaVersion: 'mới nhất',
sourceType: 'mô-đun',
dự án: ['./tsconfig.json', './tsconfig.node.json'],
tsconfigRootDir: \_\_dirname,
},
}
Thay thế plugin:@typescript-eslint/recommends thành plugin:@typescript-eslint/recommends-type-checked hoặc plugin:@typescript-eslint/strict-type-checked
Tùy chọn thêm plugin:@typescript-eslint/stylistic-type-checked
Cài đặt eslint-plugin-react và thêm plugin:react/recommends & plugin:react/jsx-runtime vào danh sách mở rộng
