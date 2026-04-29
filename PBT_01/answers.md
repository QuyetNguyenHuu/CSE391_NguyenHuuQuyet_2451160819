## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser

**1.** Nguồn tham chiếu: 01_introduction_html_universe.md phần Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

Khi gõ `https://shopee.vn` vào trình duyệt và nhấn Enter các bước xảy ra từ từ DNS lookup đến render là:

1. Phân giải tên miền (DNS Lookup)

   Trình duyệt không hiểu địa chỉ chữ (shopee.vn), nó cần địa chỉ IP số (ví dụ: 104.18.2.159).

   Trình duyệt kiểm tra bộ nhớ đệm (cache) của chính nó, sau đó đến cache của hệ điều hành.

   Nếu không thấy, nó sẽ gửi yêu cầu đến DNS Resolver (thường là nhà mạng ISP) để tìm kiếm địa chỉ IP tương ứng với tên miền shopee.vn.

2. Thiết lập kết nối TCP và bắt tay TLS (TCP Handshake & TLS Negotiation)

   Vì Shopee sử dụng giao thức https, trình duyệt phải thiết lập một kết nối an toàn.

   TCP Handshake: Trình duyệt và máy chủ Shopee thực hiện quy trình "bắt tay 3 bước" (SYN, SYN-ACK, ACK) để thiết lập kết nối truyền tải dữ liệu.

   TLS/SSL Handshake: Sau khi có kết nối TCP, hai bên sẽ thỏa thuận các phương thức mã hóa và kiểm tra chứng chỉ bảo mật để đảm bảo dữ liệu truyền đi không bị đánh cắp.

3. Gửi yêu cầu HTTP (HTTP Request)

   Sau khi kênh truyền thông an toàn được thiết lập, trình duyệt sẽ gửi một HTTP GET Request đến máy chủ của Shopee. Yêu cầu này chứa các thông tin như loại trình duyệt (User-Agent), các cookie đã lưu trước đó và các loại tệp tin mà trình duyệt có thể xử lý.

4. Máy chủ phản hồi (Server Response)

   Máy chủ của Shopee nhận yêu cầu, xử lý (có thể truy vấn cơ sở dữ liệu, chạy mã backend) và gửi trả lại một HTTP Response. Phản hồi này bao gồm mã trạng thái (ví dụ: 200 OK) và nội dung chính của trang web, thường là tệp mã HTML.

5. Trình duyệt hiển thị trang web (Rendering)

   Đây là giai đoạn trình duyệt biến các dòng mã thành giao diện hình ảnh:

   Xây dựng DOM & CSSOM: Trình duyệt đọc mã HTML để tạo cấu trúc cây (DOM Tree) và đọc mã CSS để tạo cây phong cách (CSSOM).

   Render Tree: Kết hợp DOM và CSSOM để biết cái gì cần hiển thị và hiển thị ở đâu.

   Layout & Painting: Tính toán vị trí chính xác của từng phần tử trên màn hình và cuối cùng là "vẽ" các điểm ảnh (pixel) để bạn thấy giao diện Shopee hoàn chỉnh.

**2.** Nguồn tham chiếu: 01_introduction_html_universe.md phần 1.3. Browser Rendering

Tab Network trong Chrome DevTools ghi lại mọi yêu cầu (request) và phản hồi (response) dữ liệu giữa trình duyệt và máy chủ.

![alt text](<Screenshot 2026-04-22 205411.png>)

### Câu A2 — Semantic HTML

Nguồn tham chiếu: 04_visible_part_html.md phần Semantic HTML5 — "Thẻ có ý nghĩa"

- Trang web bị Google đánh giá SEO thấp vì toàn bộ các thẻ đều dùng <div> -> Google không hiểu nên đánh giá SEO thấp

- 4 lỗi semantic là:

  `<div class="header">` nên dùng thẻ `<header>` thay cho thẻ `<div>`

  `<div class="menu">` nên dùng thẻ `<nav>` thay cho thẻ `<div>`

  `<div class="main">` nên dùng thẻ `<main>` thay cho thẻ `<div>`

  `<div class="footer">` nên dùng thẻ `<footer>` thay cho thẻ `<div>`

### Câu A3 — Block vs Inline

**Kết quả hiển thị của đoạn HTML là:**

Hộp 1

Text A Text B

Hộp 2

Text C **Text D**

Hộp 3

### Câu A4 — Table

Nguồn tham chiếu: 05_tables_hyperlinks.md phần Table — Bảng dữ liệu

**1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`**

- `<thead>`: Tiêu đề cột

- `<tbody>`: Dữ liệu chính

- `<tfoot>`: Tổng kết

**2. KHÔNG NÊN dùng table để tạo layout trang web vì**

1. Không thân thiện với thiết bị di động (Responsive kém)
   Bản chất của bảng là cấu trúc cứng nhắc. Một bảng có 5 cột sẽ rất khó để hiển thị đẹp trên một màn hình điện thoại hẹp.

   Vấn đề: Với CSS (Flexbox/Grid), bạn có thể dễ dàng chuyển các cột thành hàng khi xem trên điện thoại. Với <table>, bạn gần như bị "chết cứng" với cấu trúc hàng/cột đó, khiến trang web dễ bị vỡ hoặc người dùng phải kéo ngang rất khó chịu.

2. Ảnh hưởng tiêu cực đến SEO và khả năng tiếp cận (Accessibility)
   Google và các công cụ tìm kiếm sử dụng "bot" để đọc hiểu nội dung trang web của bạn.

   Vấn đề: Khi bạn dùng bảng, bot sẽ hiểu rằng đây là nơi chứa dữ liệu bảng biểu (như bảng lương, bảng điểm). Nếu bạn dùng nó để chia cột nội dung, bot sẽ bị bối rối về thứ tự ưu tiên của thông tin.

   Accessibility: Những người khiếm thị sử dụng trình đọc màn hình (Screen Readers) sẽ gặp thảm họa. Trình đọc sẽ đọc lần lượt từng ô (cell) theo thứ tự máy móc, khiến nội dung bài viết bị cắt vụn và vô nghĩa đối với họ.

3. Hiệu suất tải trang chậm (Rendering Performance)
   Trình duyệt xử lý bảng khác với cách nó xử lý các thẻ `<div>`.

   Vấn đề: Thông thường, trình duyệt cần nhận được toàn bộ dữ liệu của bảng `</table>` thì nó mới bắt đầu tính toán kích thước và hiển thị. Điều này tạo ra cảm giác trang web bị "khựng" lại một lúc.

   Ngược lại, các layout bằng CSS được trình duyệt render dần dần (progressive rendering), giúp người dùng thấy nội dung ngay lập tức khi nó vừa được tải xuống.

## PHẦN C — SUY LUẬN

### Câu C1 — Thiết kế cấu trúc

```html
<header>
  <!-- header vì đây là phần đầu trang -->
  <div class="logo">Logo</div>
  <nav class="main-nav" aria-lable="Menu chính">
    <!-- nav vì đây là điều hướng -->
    <ul>
      <!--ul vì đây danh sách ko có thứ tự -->
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/category">Danh mục</a></li>
    </ul>
  </nav>
</header>

<main>
  <!-- main vì đây là phần thân trang -->
  <nav aria-label="breadcrumb">
    <!-- nav vì đây là điều hướng -->
    <ol>
      <!--ol vì đây danh sách có thứ tự -->
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/mobile">Điện thoại</a></li>
      <li aria-current="page">iPhone 16</li>
    </ol>
  </nav>

  <article class="product-details">
    <!-- article vì đây là bài viết về 1 sp -->
    <div class="product-layout">
      <section class="product-gallery" aria-label="Hình ảnh sản phẩm">
        <!-- section vì đây là phần chứa hình ảnh sp -->
        <figure>
          <!-- figure vì đây là phần hình ảnh sp -->
          <img src="main.jpg" alt="iPhone 16 mặt trước" />
        </figure>
        <div class="thumbnails">
          <img src="thumb1.jpg" alt="Góc nghiêng" />
          <img src="thumb2.jpg" alt="Cạnh bên" />
          <img src="thumb3.jpg" alt="Mặt sau" />
          <img src="thumb4.jpg" alt="Cổng sạc" />
        </div>
      </section>

      <section class="product-info">
        <!-- section vì đây là phần chứa thông tin sp -->
        <h1>Tên sản phẩm</h1>
        <div class="rating" aria-label="Đánh giá 5 sao">
          <span>★★★★★</span>
        </div>

        <p class="price"><strong>20.000.000đ</strong></p>
        <div class="description">
          <h2>Mô tả ngắn</h2>
          <p>Nội dung mô tả tóm tắt sản phẩm...</p>
        </div>

        <button type="button">Thêm vào giỏ hàng</button>
      </section>
    </div>

    <section class="product-specs">
      <!-- section vì đây là phần chứa thông số ký thuật sp -->
      <h2>Thông số kỹ thuật</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Màn hình</th>
            <td>6.1 inch</td>
          </tr>
          <tr>
            <th scope="row">Chipset</th>
            <td>A18 Bionic</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="reviews-section">
      <!-- section vì đây là phần chứa đánh giá -->
      <h2>Đánh giá từ khách hàng</h2>
      <article class="review-item">
        <!-- article vì đây là phần đánh giá sp -->
        <h3>Nguyễn Văn A</h3>
        <p>Sản phẩm rất tốt!</p>
      </article>
    </section>
  </article>

  <aside class="related-products">
    <!-- aside vì đây là phần chứa các sp tương tự -->
    <h2>Sản phẩm tương tự</h2>
    <ul>
      <!-- ul vì đây là danh sách ko có thứ tự -->
      <li><a href="/iphone-15">iPhone 15</a></li>
      <li><a href="/samsung-s24">Samsung S24</a></li>
    </ul>
  </aside>
</main>

<footer>
  <!-- footer vì đây là phần chân trang -->
  <p>&copy; 2024 Cửa hàng điện thoại</p>
  <address>Địa chỉ: 123 Đường ABC, Hà Nội</address>
  <!-- address vì đây là địa chỉ -->
</footer>
```

### Câu C2 — So sánh & Tranh luận

**Về mặt kỹ thuật, có hai lý do chí mạng mà `<div>` không bao giờ thay thế được Semantic HTML:**

- SEO (Tối ưu hóa công cụ tìm kiếm): Google không "nhìn" trang web như chúng ta. Bot tìm kiếm dựa vào các thẻ như `<main>`, `<article>`, hay `<header>` để hiểu đâu là nội dung quan trọng. Nếu mọi thứ đều là `<div>`, bạn đang ép Google phải đoán xem đâu là tên sản phẩm, đâu là giá tiền. Sử dụng đúng thẻ giúp trang web có thứ hạng tốt hơn một cách tự nhiên mà không cần tiểu xảo.

- Accessibility (Khả năng truy cập): Hãy tưởng tượng một người khiếm thị dùng Screen Reader (trình đọc màn hình). Nếu bạn dùng `<nav>`, trình đọc sẽ thông báo: "Đây là phần điều hướng". Nếu bạn dùng `<div>`, nó chỉ là một khối dữ liệu vô danh. Việc dùng đúng thẻ là cách chúng ta thể hiện sự chuyên nghiệp và đạo đức nghề nghiệp đối với mọi nhóm người dùng.

**Ví dụ cụ thể:**

- Khi dùng thẻ `<button>`, trình duyệt mặc định hỗ trợ việc nhấn "Enter" để kích hoạt và tự động có trạng thái focus. Nếu dùng `<div class="button">`, bạn sẽ phải viết thêm một đống JavaScript chỉ để bắt sự kiện bàn phím và định nghĩa lại thuộc tính `role="button"`. Quá lãng phí thời gian!

Tuy nhiên, tôi đồng ý rằng không cần cực đoan. `<div>` vẫn cực kỳ phù hợp trong trường hợp bạn cần một thẻ bọc (wrapper) chỉ để phục vụ mục đích Layout hoặc Styling (như tạo một container để căn giữa bằng Flexbox) mà không mang ý nghĩa nội dung.

## PHẦN B

# Bài B3

Lỗi 1: Dòng 1 - Thiếu loại tài liệu - `<!DOCTYPE html>`
Lỗi 2: Dòng 2 - Thiếu ngôn ngữ - `<html lang="vi">`
Lỗi 3: Dòng 4 - Thiếu thẻ đóng - `<title>Trang web</title>`
Lỗi 4: Dòng 5 - Sai giá trị của thuộc tính charset - `<meta charset="utf-8">`
Lỗi 5: Dòng 8 - Sai thẻ đóng - `<h1>Welcome to ShopTLU</h1>`
Lỗi 6: Dòng 12 - Sai thẻ đóng - `<a href="home">Trang chủ</a>`
Lỗi 7: Dòng 22 - Sai vị trí thẻ `<b>` và `<p>` - <p>Giá: <b>25.990.000đ</b></p>
Lỗi 8: Dòng 28 - Phải dùng `<thead></thead>` cho tiêu đề bảng - `<thead></thead>`
Lỗi 9: Dòng 29 và 30 - Dùng `<th></th>` cho tiêu đề - `<th></th>`
Lỗi 10: Dòng 44 - 1 trang web chỉ dùng 1 thẻ `<main>` - `<aside></aside>`
Lỗi 11: Dòng 49 - Thiếu thẻ đóng - `<p>Copyright 2026</p>`

# Bài B4

**Ý 2**

- Table đó hiển thị thông tin về Thông tin sản phẩm
- Không dùng `<thead>`, `<tbody>`

  **Ý 3**

- Form đó có action là search, method là get
- Input types được sử dụng là text
