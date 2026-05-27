# Bài 0.1

## 1. File `.jsx` khác gì file `.js`?

- **`.js`**: File JavaScript thuần.
- **`.jsx`** (JavaScript XML): File JavaScript cho phép viết code giao diện giống HTML trực tiếp bên trong. Công cụ build (Vite) dựa vào đuôi `.jsx` để dịch giao diện này thành JS thuần mà trình duyệt có thể hiểu.

## 2. Tại sao phải `export default App`?

Để **chia sẻ** component `App` này cho file khác sử dụng. File `main.jsx` cần `import` nó vào để render (hiển thị) giao diện lên trình duyệt. Chữ `default` nghĩa là đây là thành phần xuất ra chính của file.

## 3. Thử xóa `export default` → Chuyện gì xảy ra?

- **Hiện tượng:** Ứng dụng bị lỗi lập tức, màn hình trắng xóa.
- **Lý do:** File `main.jsx` không thể tìm thấy component `App` để nạp vào, dẫn đến lỗi hệ thống vì không có gì để hiển thị.

# Bài 1.1

## 1. Tại sao component chỉ render 1 lần?

Vì **dữ liệu của component chưa có bất kỳ sự thay đổi nào**.

Khi ứng dụng vừa chạy (hoặc khi bạn F5 refresh trang), React chỉ thực hiện chu trình khởi tạo ban đầu (Mounting): nó gọi hàm `LifecycleDemo()`, lấy đống JSX đem đi vẽ lên màn hình đúng **1 lần duy nhất**, sau đó đứng im chờ đợi.

## 2. Khi nào nó sẽ render lại (Re-render)?

Một React component sẽ tự động được gọi lại (render lại) khi rơi vào 1 trong các trường hợp sau:

- **State (Trạng thái nội bộ) thay đổi:** Khi bạn dùng `useState` và kích hoạt hàm cập nhật trạng thái (ví dụ: bấm nút để tăng biến đếm `count`).
- **Props (Dữ liệu truyền từ ngoài vào) thay đổi:** Khi component cha truyền vào cho nó một giá trị mới.
- **Component cha bị render lại:** Khi component chứa nó bị bắt buộc phải render lại, nó cũng sẽ bị kéo theo (trừ khi được tối ưu hóa bằng `React.memo`).

# Bài 1.2

## Kết quả thử nghiệm

### 1. Chạy `BadCounter` → nhấn nút → thấy gì?

- **Console:** Số tăng dần (1, 2, 3...).
- **Màn hình (UI):** Số vẫn đứng im là **0**. Không có gì thay đổi.

### 2. Chạy `GoodCounter` → nhấn nút → thấy gì?

- **Màn hình (UI):** Số nhảy lên lập tức (1, 2, 3...) theo mỗi lần bấm.

### 3. Mở Console → thấy log "render" mấy lần?

- Với **`BadCounter`**: Chỉ log đúng **1 lần** duy nhất lúc mới tải trang. Khi bấm nút, hàm `BadCounter()` không hề bị chạy lại.
- Với **`GoodCounter`**: Mỗi lần bạn bấm nút, hàm `GoodCounter()` sẽ **bị gọi lại (re-render) thêm 1 lần**. Bấm bao nhiêu lần, log "render" xuất hiện bấy nhiêu lần.

## Cốt lõi vấn đề (Tại sao?)

- **Biến bình thường (`let count`)**: Chỉ là một ô nhớ tạm thời trong bộ nhớ. Khi giá trị của nó thay đổi, React không hề hay biết để vẽ lại giao diện. Hơn nữa, nếu component bị re-render vì lý do khác, biến `let count` sẽ bị reset về lại `0`.
- **`useState`**: Khi bạn gọi `setCount`, bạn đang phát đi một tín hiệu: _"Tôi đã đổi dữ liệu rồi, React hãy chạy lại hàm component này và vẽ lại màn hình cho tôi!"_.
