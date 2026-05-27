# Bài 0.1

## 1. File `.jsx` khác gì file `.js`?

* **`.js`**: File JavaScript thuần.
* **`.jsx`** (JavaScript XML): File JavaScript cho phép viết code giao diện giống HTML trực tiếp bên trong. Công cụ build (Vite) dựa vào đuôi `.jsx` để dịch giao diện này thành JS thuần mà trình duyệt có thể hiểu.

## 2. Tại sao phải `export default App`?

Để **chia sẻ** component `App` này cho file khác sử dụng. File `main.jsx` cần `import` nó vào để render (hiển thị) giao diện lên trình duyệt. Chữ `default` nghĩa là đây là thành phần xuất ra chính của file.

## 3. Thử xóa `export default` → Chuyện gì xảy ra?

* **Hiện tượng:** Ứng dụng bị lỗi lập tức, màn hình trắng xóa.
* **Lý do:** File `main.jsx` không thể tìm thấy component `App` để nạp vào, dẫn đến lỗi hệ thống vì không có gì để hiển thị.