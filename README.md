# 🍅 Pomodoro Focus Timer

Ứng dụng Pomodoro Focus Timer là một công cụ quản lý thời gian hiện đại, tối giản và hiệu quả cao, giúp người dùng tập trung tối đa vào công việc và học tập. Ứng dụng được thiết kế theo phương pháp Pomodoro nổi tiếng, tích hợp âm thanh chuông báo sinh động, tùy chỉnh thời gian linh hoạt và lưu trữ lịch sử phiên tập trung trực tiếp trên trình duyệt.

---

## 🎯 Kịch Bản Nghiệp Vụ (User Scenarios)

- **[SC-01] Đếm ngược Pomodoro tiêu chuẩn & Âm thanh thông báo**: Giao diện hiển thị mặc định thời gian đếm ngược là 25:00. Người dùng nhấn "Bắt đầu" (Start) để đếm ngược, "Tạm dừng" (Pause) để dừng và "Đặt lại" (Reset) để đưa thời gian về ban đầu. Khi đếm ngược về 00:00, âm thanh chuông báo sẽ tự động phát lên và hệ thống tự động ghi nhận một phiên hoàn thành vào lịch sử.
- **[SC-02] Tùy chỉnh thời gian & Trạng thái rỗng (Edge Cases)**: Người dùng có thể tùy chỉnh thời gian cho phiên tập trung (Focus), nghỉ ngắn (Short Break), và nghỉ dài (Long Break) thông qua bảng cấu hình (Settings). Nếu nhập giá trị không hợp lệ (số âm, chữ cái, hoặc để trống), hệ thống sẽ tự động khôi phục về giá trị mặc định và hiển thị thông báo lỗi trực quan. Khi danh sách lịch sử chưa có dữ liệu, giao diện sẽ hiển thị trạng thái rỗng (Empty State) kèm thông điệp khuyến khích.
- **[SC-03] Lưu trữ lịch sử & Quản lý trạng thái (State Management)**: Mỗi khi một phiên Pomodoro hoàn thành, hệ thống tự động lưu thông tin phiên đó (Loại phiên, Thời lượng, Thời gian hoàn thành) vào `localStorage`. Người dùng có thể xem danh sách lịch sử được sắp xếp theo thời gian mới nhất, xem tổng số phiên đã hoàn thành trong ngày, và có nút "Xóa lịch sử" (Clear History) để xóa toàn bộ dữ liệu đã lưu.
- **[SC-04] Responsive UI & Trải nghiệm di động**: Giao diện được thiết kế theo phong cách hiện đại, tối giản (Minimalist) với hiệu ứng chuyển động mượt mà (CSS Transitions). Giao diện tự động tối ưu hóa hiển thị (Responsive) trên cả máy tính (Desktop), máy tính bảng (Tablet) và điện thoại di động (Mobile). Các nút bấm điều khiển trên thiết bị di động có kích thước vùng chạm tối thiểu 44x44px để đảm bảo trải nghiệm vuốt chạm dễ dàng.

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (Phiên bản khuyến nghị: v16 trở lên)
- Đã cài đặt **npm** (đi kèm với Node.js)

### 2. Cài đặt các gói phụ thuộc
Mở terminal tại thư mục gốc của dự án và chạy lệnh sau:
```bash
npm install
```

### 3. Khởi chạy ứng dụng
Chạy lệnh sau để khởi động máy chủ Node.js:
```bash
npm start
```
Sau khi khởi chạy thành công, mở trình duyệt và truy cập địa chỉ:
👉 **http://localhost:3000**

### 4. Chạy kiểm thử tự động (Playwright)
Để chạy bộ kiểm thử tự động giả lập hành trình người dùng và kiểm tra tính năng:
```bash
npm test
```

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
pomodoro-focus-timer/
├── package.json
├── server.js
├── README.md
├── playright.config.js
├── tests/
│   └── app.spec.js
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```
```

---