# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (5đ) — 3 Cách nhúng CSS

Tài liệu tham chiếu: tuan_2_css_core/08_introduction_css.md

1. Inline CSS (trong thẻ)

```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

- Ưu điểm:
  - Có độ ưu tiên cao nhất, giúp ghi đè các quy tắc CSS khác một cách dễ dàng.
  - Hữu ích khi cần kiểm tra nhanh hoặc thay đổi kiểu dáng cho một phần tử đơn lẻ.

- Nhược điểm:
  - Vi phạm nguyên tắc tách biệt giữa cấu trúc (HTML) và trình bày (CSS).
  - Làm mã nguồn HTML trở nên lộn xộn, khó bảo trì nếu áp dụng cho nhiều phần tử.
  - Không thể tái sử dụng mã CSS cho các trang khác.

- Nên dùng khi:
  - Cần thay đổi kiểu dáng nhanh chóng cho một phần tử duy nhất
  - Trong các email HTML (nơi các file CSS bên ngoài thường không được hỗ trợ tốt).

2. Internal CSS (trong <style>)

```html
<head>
  <style>
    h1 {
      color: red;
      font-size: 24px;
    }
  </style>
</head>
```

- Ưu điểm:
  - Không cần tạo file riêng, phù hợp cho các trang đơn (single-page)
  - Các quy tắc được gom chung vào một vị trí, giúp dễ đọc và quản lý cho một trang cụ thể

- Nhược điểm:
  - Nếu website có nhiều trang, ta sẽ phải sao chép đoạn CSS này vào từng trang, gây khó khăn khi cập nhật
  - Làm tăng kích thước file HTML và làm chậm thời gian tải trang

- Nên dùng khi:
  - Xây dựng một trang web đơn (Landing Page) hoặc một trang duy nhất không có nhiều nội dung phức tạp.
  - Muốn kiểm tra toàn bộ giao diện của một trang trước khi tách thành file riêng.

3. External CSS (file riêng)

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

- Ưu điểm:
  - Giữ cho code HTML gọn gàng, tách biệt rõ ràng giữa cấu trúc và thiết kế.
  - Một file CSS có thể dùng chung cho nhiều trang HTML. Khi thay đổi file CSS, toàn bộ trang web sẽ tự động cập nhật.
  - Trình duyệt có thể lưu vào bộ nhớ đệm (cache), giúp tăng tốc độ tải trang ở những lần truy cập sau.

- Nhược điểm:
  - Trình duyệt cần gửi thêm một yêu cầu HTTP để tải file CSS, có thể làm chậm tải trang lần đầu tiên.

- Nên dùng:
  - Trong Các dự án thực tế, đặc biệt là các trang web có nhiều trang hoặc một dự án lớn cần duy trì lâu dài.

4. Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"?

- Thứ tự ưu tiên từ cao xuống thấp như sau:
  - Inline CSS (Thắng): Do nằm trực tiếp trên thẻ, trình duyệt ưu tiên cao nhất.

  - Internal & External CSS (Hòa): Hai cách này có độ ưu tiên ngang nhau. Cái nào được trình duyệt đọc sau cùng (nằm thấp hơn trong file HTML) sẽ thắng.

- Nguyên tắc chung: Càng gần phần tử HTML nhất thì càng mạnh (trừ khi có từ khóa !important sẽ chiếm quyền tối cao).

## Câu A2 — CSS Selectors — Dự đoán kết quả

1. h1 → Chọn: ShopTLU
2. .price → Chọn: cả 2 thẻ p có class="price" (25.990.000đ và 45.990.000đ)
3. #app header → Chọn: thẻ header mà cha của nó có id="app" (toàn bộ nội dung thẻ header và các thẻ con của nó)
4. nav a:first-child → Chọn: thẻ a là con đầu tiên của thẻ nav (Home)
5. .product.featured h2 → Chọn: thẻ h2 có cả 2 class là product và featured (MacBook Pro)
6. article > p → Chọn: tất cả thẻ p là con trực tiếp của thẻ article
7. a[href="/"] → Chọn: thẻ a có href="/" (Home)
8. .top-bar.dark h1 → Chọn: thẻ h1 có class là top-bar và dark
