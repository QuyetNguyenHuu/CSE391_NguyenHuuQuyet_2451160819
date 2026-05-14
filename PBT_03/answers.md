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

## Câu A3

```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
→ Chiều rộng hiển thị = 450px
→ Không gian chiếm trên trang = 470px

/* Trường hợp 2: border-box */
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/* Trường hợp 3: Margin collapse */
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px
Trong CSS, khi các lề dọc (margins) gặp nhau, chúng không cộng dồn lại mà bị "gộp" (collapse).

Quy tắc là: Giá trị lề lớn hơn sẽ được giữ lại, và giá trị nhỏ hơn sẽ bị triệt tiêu bên trong lề lớn đó.

Ở đây, 40px (margin-top của box-b) lớn hơn 25px (margin-bottom của box-a), vì vậy trình duyệt chọn 40px làm khoảng cách thực tế.

## Câu A4

1. Tính Specificity Score (a, b, c)

- Rude A: p -> Score: (0, 0, 1) -> Giải thích: 1 Element
- Rude B: .price -> Score: (0, 1, 0) -> Giải thích: 1 Class
- Rude C: #main-price -> Score: (1, 0, 0) -> Giải thích: 1 Id
- Rude D: p.price -> Score: (0, 1, 1) -> Giải thích: 1 Class + 1 Element

2. Element sẽ có màu đỏ vì: Trình duyệt sẽ so sánh điểm số từ trái sang phải. Rule C (#main-price) có điểm ở cột a (ID) là 1, cao nhất trong tất cả các rule. Dù Rule D có cả class và element nhưng vẫn không thể vượt qua sức mạnh của một ID selector.

3. Nếu thêm Inline Style (màu orange) thì Element sẽ có màu cam vì: Inline style có độ ưu tiên cao hơn tất cả các selector trong file CSS bên ngoài (điểm số của nó có thể coi là 1, 0, 0, 0 nếu tính cả cột thứ 4).

4. Nếu Rule A thêm !important thì Element sẽ có màu đen vì: Khi một thuộc tính được đánh dấu !important, nó sẽ phá vỡ mọi quy tắc về Specificity thông thường và giành quyền ưu tiên cao nhất (cao hơn cả ID và Inline style). Vì vậy, màu đen của Rule A sẽ được hiển thị.

# PHẦN C — DEBUG & SUY LUẬN

## Câu C1

1. Tính chiều rộng thực tế của sidebar và content (content-box!)

- Sidebar: 300 + 20*2 + 1*2 = 342 px
- Content: 660 + 30*2 + 1*2 = 722 px

2. Layout bị vỡ vì:

- Tổng Chiều rộng thực tế của sidebar và content lớn hơn chiều rộng của container chứa nó nên theo cơ chế của float content sẽ bị đẩy xuống dưới

3. Đưa ra 2 cách sửa:

- Cách 1: Dùng border-box
  Thêm box-sizing = border-box cho cả 2 khi đó chiều rộng của 2 phần tử sẽ là chiều rộng của border, content bị thu nhỏ cho vừa với border

- Cách 2: Không dùng border-box
  Phải tính toán chiều rộng của content sao cho khi cộng thêm padding và border thì bằng với chiều rộng mong muốn
  - Sidebar = 300 - 20*2 - 1*2 = 258 px
  - Content = 660 - 30*2 + 1*2 = 598 px

## Câu C2

1. "Sản phẩm A" (h2)
   font-size = 20px

Giải thích: Có hai selector nhắm vào phần tử này là .card .title (0, 2, 0) và .container (0, 1, 0 - thông qua kế thừa). Tuy nhiên, .card .title nhắm trực tiếp vào class của h2 nên nó thắng các giá trị kế thừa từ cha.

color = green

Giải thích: Có 3 selector tranh chấp màu sắc: .card .title (0, 2, 0), #featured .title (1, 1, 0), và .highlight. Mặc dù #featured .title có điểm ID rất cao, nhưng .highlight sử dụng từ khóa !important, nó ghi đè tất cả các quy tắc về độ cụ thể (specificity) để áp dụng màu xanh lá.

Dưới đây là phân tích chi tiết về kết quả hiển thị của các phần tử dựa trên quy tắc Cascade (Thứ tự ưu tiên) và Inheritance (Kế thừa) trong CSS.

1. "Sản phẩm A" (h2)
   font-size = 20px

Giải thích: Có hai selector nhắm vào phần tử này là .card .title (0, 2, 0) và .container (0, 1, 0 - thông qua kế thừa). Tuy nhiên, .card .title nhắm trực tiếp vào class của h2 nên nó thắng các giá trị kế thừa từ cha.

color = green

Giải thích: Có 3 selector tranh chấp màu sắc: .card .title (0, 2, 0), #featured .title (1, 1, 0), và .highlight. Mặc dù #featured .title có điểm ID rất cao, nhưng .highlight sử dụng từ khóa !important, nó ghi đè tất cả các quy tắc về độ cụ thể (specificity) để áp dụng màu xanh lá.

2. "Mô tả sản phẩm" (p trong card featured)
   color = blue

Giải thích:

Selector .card p (0, 1, 1) có thuộc tính color: inherit.

Từ khóa inherit buộc phần tử <p> phải lấy màu từ phần tử cha trực tiếp của nó là .card.

Phần tử .card có selector .card { color: blue; } (0, 1, 0) quy định màu xanh dương. Vì vậy, thẻ <p> này hiển thị màu xanh dương.

3. "Sản phẩm B" (h2)
   font-size = 20px

Giải thích: Tương tự Sản phẩm A, selector .card .title (0, 2, 0) nhắm trực tiếp vào phần tử này và có độ cụ thể cao hơn các giá trị font-size mặc định hoặc kế thừa từ .container.

color = blue

Giải thích: Thẻ h2 này không có id featured và không có class highlight. Do đó, selector #featured .title và .highlight không áp dụng. Selector duy nhất khớp là .card .title, nhưng selector này không định nghĩa màu sắc. Vì vậy, h2 kế thừa màu sắc từ cha của nó là .card (đang có màu xanh dương).

4. "Mô tả sản phẩm B" (p.highlight)
   color = green

Giải thích:

Mặc dù thẻ <p> nằm trong .card có quy tắc color: inherit (đang cố gắng lấy màu xanh từ .card).

Tuy nhiên, class .highlight trên chính nó có thuộc tính color: green !important;.

Trong CSS Cascade, một thuộc tính được khai báo trực tiếp trên phần tử với !important sẽ luôn chiến thắng các thuộc tính được kế thừa hoặc các selector thông thường khác.

# Phần B

# Bài B2

**Phần 1**
