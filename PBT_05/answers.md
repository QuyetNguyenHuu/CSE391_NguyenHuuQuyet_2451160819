# PHẦN A

## Câu A1 - Viewport & Mobile-First

Dưới đây là câu trả lời chi tiết và chuẩn xác cho câu hỏi lý thuyết Viewport & Mobile-First.

1. Thẻ <meta name="viewport"> chuẩn và giải thích thuộc tính

<meta name="viewport" content="width=device-width, initial-scale=1.0">

- Giải thích các thuộc tính bên trong cặp content="":

- width=device-width: Đặt độ rộng của vùng hiển thị (viewport) trên trình duyệt bằng đúng với độ rộng thực tế của màn hình thiết bị (tính theo pixel logic/CSS pixel, không phải pixel phần cứng).

- initial-scale=1.0: Đặt mức độ phóng to (zoom) ban đầu là 100% khi trang web vừa tải xong, ngăn trình duyệt tự động phóng to hay thu nhỏ nội dung.

2. Hiện tượng xảy ra trên iPhone nếu THIẾU thẻ này

- Nếu không có thẻ viewport, các trình duyệt di động (như Safari trên iPhone) sẽ tự động giả định rằng trang web này được thiết kế dành riêng cho màn hình máy tính lớn (Desktop).

- Cách hiển thị: iPhone sẽ ép toàn bộ trang web hiển thị trong một viewport ảo có độ rộng mặc định khoảng 980px, sau đó tự động thu nhỏ (zoom out) toàn cục để nhét vừa khít giao diện 980px đó vào màn hình điện thoại tí hon.

- Trải nghiệm người dùng: Trang web nhìn từ xa trông giống như một bức ảnh thu nhỏ. Chữ nghĩa, hình ảnh và các nút bấm sẽ trở nên bé tí tin hin, buộc người dùng phải dùng hai ngón tay phóng to (pinch-to-zoom) liên tục và cuộn ngang cuộn dọc mới có thể đọc được nội dung.

3. Phân biệt Mobile-First và Desktop-First

- Sự khác biệt cốt lõi nằm ở tư duy thiết kế và thứ tự ưu tiên viết mã CSS:

- Mobile-First (Ưu tiên di động): Viết CSS cơ bản cho màn hình nhỏ trước (không nằm trong Media Query). Sau đó, dùng các điều kiện kích thước tăng dần để bổ sung/ghi đè thuộc tính cho màn hình lớn. Dùng từ khóa min-width.

- Desktop-First (Ưu tiên máy tính): Viết CSS cơ bản cho màn hình lớn trước. Sau đó, dùng các điều kiện kích thước giảm dần để bóp nhỏ hoặc ẩn bớt các phần tử khi màn hình co lại. Dùng từ khóa max-width.

**Ví dụ minh họa CSS (Breakpoint 768px):**
Cách 1: Mobile-First (min-width)

```css
/* Mặc định: Áp dụng cho Mobile (Dưới 768px) */
.content-box {
  width: 100%;
  font-size: 14px;
}

/* Khi màn hình RỘNG TỪ 768px trở lên (Tablet/Desktop) */
@media (min-width: 768px) {
  .content-box {
    width: 50%;
    font-size: 16px;
  }
}
Cách 2: Desktop-First (max-width)

CSS
/* Mặc định: Áp dụng cho Desktop (Trên 768px) */
.content-box {
  width: 50%;
  font-size: 16px;
}

/* Khi màn hình CO LẠI DƯỚI 768px (Mobile) */
@media (max-width: 767.98px) {
  .content-box {
    width: 100%;
    font-size: 14px;
  }
}
```

4. Tại sao Mobile-First được khuyên dùng rộng rãi?

- Chiến lược Mobile-First trở thành quy chuẩn ngành nhờ 3 lý do thực tế sau:

- Tối ưu hiệu năng (Performance): Thiết bị di động thường có cấu hình phần cứng yếu hơn và sử dụng mạng di động (3G/4G/5G) kém ổn định hơn máy tính. Viết CSS Mobile-First giúp trình duyệt điện thoại tải trực tiếp các dòng mã gọn nhẹ ngay từ đầu mà không phải tốn tài nguyên xử lý hay ghi đè các bộ khung nặng nề của bản Desktop.

- Tư duy tinh gọn nội dung (Content Strategy): Thiết kế cho màn hình nhỏ ép nhà phát triển và designer phải tập trung vào những tính năng cốt lõi và nội dung quan trọng nhất của doanh nghiệp. Bạn không thể nhồi nhét những thứ "rác giao diện" vào một màn hình rộng 375px. Khi mở rộng lên bản Desktop, giao diện sẽ phát triển một cách tự nhiên và mạch lạc.

- Tốt cho SEO (Google PageRank): Từ lâu, Google đã áp dụng thuật toán Mobile-First Indexing — nghĩa là Google sẽ ưu tiên sử dụng phiên bản di động của trang web để lập chỉ mục và xếp hạng trên công cụ tìm kiếm. Một trang web chuẩn Mobile-First sẽ ghi điểm tuyệt đối trong mắt Google.

## Câu A2

Các Breakpoint phổ biến (theo Bootstrap)
| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
| ---------- | ---------- | ----------------- | ------------------- |
| **xs** | `< 576px` | Điện thoại nhỏ | 1 cột |
| **sm** | `≥ 576px` | Điện thoại lớn | 2 cột |
| **md** | `≥ 768px` | Tablet | 2–3 cột |
| **lg** | `≥ 992px` | Laptop nhỏ | 3–4 cột |
| **xl** | `≥ 1200px` | Desktop | 4 cột |
| **xxl** | `≥ 1400px` | Màn hình lớn / TV | 5–6 cột |

## Câu A3

| Chiều rộng màn hình   | Media query áp dụng        | `.container width` |
| --------------------- | -------------------------- | ------------------ |
| **375px (iPhone SE)** | Không media query nào khớp | `100%`             |
| **600px**             | `min-width: 576px`         | `540px`            |
| **800px**             | `min-width: 768px`         | `720px`            |
| **1000px**            | `min-width: 992px`         | `960px`            |
| **1400px**            | `min-width: 1200px`        | `1140px`           |

## Câu A4

**4 tính năng chính của SCSS và ví dụ**

1. Variables (Biến số)

- Giải thích: Tính năng này cho phép bạn lưu trữ các giá trị được sử dụng lặp đi lặp lại nhiều lần (như mã màu, font chữ, kích thước, khoảng cách border) vào trong một cái tên gợi nhớ bắt đầu bằng ký tự $. Khi muốn đổi màu toàn bộ hệ thống, bạn chỉ cần sửa đúng một nơi duy nhất tại vị trí khai báo biến.

- Ví dụ:

```scss
$primary-color: #007bff;
$spacing-lg: 20px;

.btn-submit {
  background-color: $primary-color;
  padding: $spacing-lg;
}
```

2. Nesting (Cú pháp lồng nhau)

- Giải thích: Thay vì phải viết đi viết lại bộ chọn cha (Selector) theo cách viết CSS truyền thống, SCSS cho phép bạn viết các bộ chọn con lồng trực tiếp vào bên trong bộ chọn cha. Cách viết này mô phỏng chính xác cấu trúc hình cây của phân cấp HTML, giúp code gọn gàng và dễ quản lý hơn. Đặc biệt, ký tự & được dùng để đại diện cho chính bộ chọn cha đó (thường dùng cho pseudo-class như :hover, :focus).

- Ví dụ:

```scss
.navbar {
  background: #fff;

  .nav-item {
    color: #333;
    &:hover {
      color: blue;
    } // Tương đương .navbar .nav-item:hover
  }
}
```

3. Mixins (`@mixin` và `@include`)

- Giải thích: Mixin giống như một "hàm" trong lập trình. Nó cho phép gom một tập hợp nhiều dòng thuộc tính CSS lại thành một khối để tái sử dụng ở bất kỳ đâu. Hơn nữa, Mixin có thể nhận các tham số truyền vào để linh hoạt thay đổi giá trị đầu ra. Ta định nghĩa khối bằng `@mixin` và gọi nó ra bằng `@include`.

- Ví dụ:

```scss
// Định nghĩa mixin căn giữa bằng Flexbox
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}

// Sử dụng mixin
.hero-content {
  @include flex-center(column); /* Truyền tham số trục dọc */
}
```

4. `@extend` / Inheritance (Kế thừa)

- Giải thích: Tính năng này cho phép một bộ chọn chia sẻ hoặc "sao chép ké" lại toàn bộ các thuộc tính CSS của một bộ chọn khác. Nó giúp giảm thiểu việc lặp lại code, tạo ra các class có tính chất tương tự nhau nhưng biến tấu một chút ở phần đuôi (như các loại nút bấm báo lỗi, nút thành công dựa trên một khung nút cơ bản).

- Ví dụ:

```scss
.btn-base {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
}

.btn-success {
  @extend .btn-base;
  background-color: green; /* Kế thừa nút cơ bản và chỉ đổi màu nền */
}
```

**Tại sao trình duyệt KHÔNG đọc được file `.scss`? Quy trình chuyển đổi**

- Nguyên nhân:Các trình duyệt web (như Chrome, Safari, Edge, Firefox) được lập trình để chỉ hiểu và phân tích cú pháp chuẩn của ngôn ngữ \*\*CSS gốc (CSS thuần túy). Cú pháp của SCSS (với các ký hiệu `$`, lồng nhau, `@mixin`,...) nằm ngoài bộ quy tắc xử lý của lõi trình duyệt, nếu bạn nạp trực tiếp file `.scss` vào thẻ `<link>`, trình duyệt sẽ báo lỗi cú pháp hoặc phớt lờ hoàn toàn.

- Giải pháp (Bước chuyển đổi): Để trình duyệt chạy được, cần thực hiện một bước gọi là Biên dịch (Compilation) để chuyển đổi tệp `.scss` thành tệp `.css` thông qua các công cụ hỗ trợ.

**Các cách chuyển đổi phổ biến trong thực tế:**

1. Dùng Extension Cài đặt tiện ích mở rộng Live Sass Compiler trực tiếp trên VS Code. Mỗi khi nhấn `Ctrl + S` lưu file `.scss`, nó sẽ tự động biên dịch ra file `.css` song song ngay lập tức.

2. Dùng Node-Sass / Dart-Sass: Chạy câu lệnh qua Terminal bằng npm: `sass style.scss style.css`.

3. Dùng Bundler tự động: Tích hợp vào các công cụ đóng gói mã nguồn như Vite, Webpack,

# Phần C

## Câu C1 — Phân tích trang web thực VnExpress

**Kết quả quan sát trên 3 kích thước màn hình**

1. Màn hình Mobile (375px)

- Navigation: Thanh menu ngang của bản Desktop biến mất hoàn toàn. Thay vào đó là một nút bấm Hamburger (☰) gọn gàng nằm ở góc trên cùng. Khi nhấn vào nút này, một danh mục đầy đủ các chuyên mục (Thời sự, Thế giới, Kinh doanh...) sẽ trượt ra chiếm toàn màn hình hoặc một góc màn hình.

- Lưới Content: Chuyển hoàn toàn về cấu trúc 1 cột duy nhất. Các bài viết không còn xếp song song mà được xếp chồng lên nhau từ trên xuống dưới để tối ưu hóa không gian cuộn dọc trên điện thoại.

- Elements bị ẩn: Các banner quảng cáo lớn ở hai bên sườn (Ads), block "Xem nhiều nhất" ở cột phụ, và một số widget tiện ích phức tạp (Bảng giá vàng, Thời tiết chi tiết) bị ẩn hoàn toàn để giảm dung lượng tải trang và tránh làm loãng nội dung.

- Font size: Tiêu đề bài viết lớn (H1/H2) được thu nhỏ lại (khoảng 18px - 20px) để không bị tràn dòng hoặc ngắt chữ xuống dòng quá vụn vặt.

2. Màn hình Tablet (768px)

- Navigation: Thanh menu chính bắt đầu xuất hiện lại dưới dạng nằm ngang nhưng chỉ hiển thị các chuyên mục cốt lõi nhất (Thời sự, Góc nhìn, Thế giới...). Các chuyên mục phụ được giấu gọn vào một nút "Tất cả" hoặc nút ba chấm ở cuối thanh menu.

- Lưới Content: Chuyển sang cấu trúc 2 cột. Cột chính bên trái chiếm khoảng 70% độ rộng để hiển thị danh sách bài viết hot, cột bên phải chiếm 30% hiển thị các tin ngắn, tin video hoặc dòng sự kiện tiêu điểm.

- Elements bị ẩn: Quảng cáo chạy dọc hai bên sườn (Banner dọc) vẫn bị ẩn vì không gian bề ngang chưa đủ rộng, nhưng khối "Xem nhiều nhất" hoặc "Ý kiến bạn đọc" ở cột phụ đã được hiển thị trở lại.

- Font size: Kích thước chữ tiêu đề tăng lên mức trung bình (khoảng 22px - 24px), khoảng cách giữa các dòng (line-height) giãn rộng hơn giúp trải nghiệm đọc trên máy tính bảng rất thông thoáng.

3. Màn hình Desktop (1440px)

- Navigation: Hiển thị đầy đủ 100% thanh menu điều hướng nằm ngang với tất cả các chuyên mục chính. Khi di chuột (hover) vào một chuyên mục, một dropdown menu lớn (Mega Menu) sẽ đổ xuống hiển thị thêm các danh mục con bên trong.

- Lưới Content: Đạt cấu trúc hoàn chỉnh 3 cột hoặc bố cục mạng lưới phức tạp (Macro Layout). Cột 1 là bài viết tiêu điểm lớn nhất, cột 2 là danh sách bài tin mới liên tục, cột 3 (Sidebar) là các hộp thông tin tiện ích, dòng sự kiện và danh sách tin đọc nhiều.

- Elements bị ẩn: Không có phần tử nào bị ẩn. Hai bên rìa trái và phải của trang web xuất hiện khoảng không trống để hiển thị các banner quảng cáo khổng lồ bám theo màn hình khi cuộn chuột (Sticky Ads).

- Font size: Chữ tiêu đề đạt kích thước chuẩn tối đa (khoảng 28px - 32px), định dạng chữ đậm, tạo điểm nhấn thị giác mạnh mẽ giúp người đọc quét nhanh được các tin tức nóng trong ngày.

## Câu C2

1. WIREFRAME — MOBILE (Màn hình dọc, 1 cột chồng)

┌──────────────────────────────────────┐
│ [LOGO]                               │ -> Header xếp dọc gọn gàng
│ [HOTLINE: 090xxxxxxx]                │
├──────────────────────────────────────┤
│                                      │
│             HERO IMAGE               │ -> Chiều cao vừa phải (40vh)
│      "Chào mừng đến với Nhà Hàng"    │
│                                      │
├──────────────────────────────────────┤
│ [Ảnh Món 1]                          │
├──────────────────────────────────────┤
│ [Ảnh Món 2]                          │ -> Lưới món ăn xếp dọc hoàn toàn
│ [Ảnh Món 3]                          │    thành 1 cột để cuộn dọc dễ dàng
│ [Ảnh Món 4]                          │    bằng ngón tay cái.
│ [Ảnh Món 5]                          │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │          FORM ĐẶT BÀN            │ │ -> Form chiếm 100% chiều ngang
│ │ Ngày: [__]     Giờ: [__]         │ │    nằm ngay dưới menu để thúc đẩy
│ │ Số người: [__]                   │ │    khách hàng đặt bàn.
│ │ [ ĐẶT BÀN NGAY ]                 │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│                                      │
│          GOOGLE MAPS EMBED           │ -> Bản đồ co giãn full chiều rộng
│                                      │
├──────────────────────────────────────┤
│               FOOTER                 │
└──────────────────────────────────────┘

2. WIREFRAME — TABLET (Màn hình vừa, bắt đầu chia cột)

┌──────────────────────────────────────────────────────────────────┐
│ [LOGO]                                    [HOTLINE: 090xxxxxxx]  │ -> Header dạng Ngang
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                           HERO IMAGE                             │ -> Chiều cao trung bình (50vh)
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐│
│  │   [Ảnh Món 1]    │  │   [Ảnh Món 2]    │  │   [Ảnh Món 3]    ││ -> Lưới ảnh món ăn bẻ thành
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤│    3 cột x 1 hàng (hoặc 2 hàng)
│  │   [Ảnh Món 4]    │  │   [Ảnh Món 5]    │  │   [Ảnh Món 6]    ││    cực kỳ cân đối.
│  └──────────────────┘  └──────────────────┘  └──────────────────┘│
├──────────────────────────────────────────────────────────────────┤
│┌───────────────────────────────┐ ┌──────────────────────────────┐│
││         FORM ĐẶT BÀN          │ │                              ││ -> Form và Bản đồ được xếp
││ Ngày: [__]     Giờ: [__]      │ │      GOOGLE MAPS EMBED       ││    song song tỉ lệ 50/50 
││ Số người: [__]                │ │                              ││    để tận dụng bề ngang màn hình.
││ [ ĐẶT BÀN NGAY ]              │ │                              ││
│└───────────────────────────────┘ └──────────────────────────────┘│
├──────────────────────────────────────────────────────────────────┤
│                              FOOTER                              │
└──────────────────────────────────────────────────────────────────┘

3. WIREFRAME — DESKTOP (Màn hình lớn, cấu trúc Main + Sidebar)

┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                  [Trang Chủ]  [Thực Đơn]  [Về Chúng Tôi]            [HOTLINE: 090xxxxxxx] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│                                           HERO IMAGE                                             │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │                     [CỘT TRÁI - MAIN CONTENT]                │ │     [CỘT PHẢI - STICKY]     │ │
│ │                                                              │ │                             │ │
│ │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │ │    ┌───────────────────┐    │ │
│ │  │  [Ảnh Món 1]  │  │  [Ảnh Món 2]  │  │  [Ảnh Món 3]  │     │ │    │   FORM ĐẶT BÀN    │    │ │
│ │  ├───────────────┤  ├───────────────┤  ├───────────────┤     │ │    │                   │    │ │
│ │  │  [Ảnh Món 4]  │  │  [Ảnh Món 5]  │  │  [Ảnh Món 6]  │     │ │    │ Ngày: [__]        │    │ │
│ │  └───────────────┘  └───────────────┘  └───────────────┘     │ │    │ Giờ:  [__]        │    │ │
│ │                                                              │ │    │ Khách: [__]       │    │ │
│ │  ┌────────────────────────────────────────────────────────┐  │ │    │                   │    │ │
│ │  │                                                        │  │ │    │ [ ĐẶT BÀN NGAY ]  │    │ │
│ │  │                   GOOGLE MAPS EMBED                    │  │ │    │                   │    │ │
│ │  │                                                        │  │ │    └───────────────────┘    │ │
│ │  └────────────────────────────────────────────────────────┘  │ │                             │ │
│ └──────────────────────────────────────────────────────────────┘ └─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                              FOOTER                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

# Phần B

## Bài B3

**Báo cáo kết quả Refactor SCSS → CSS**

1. Công cụ sử dụng biên dịch
Hệ thống sử dụng bộ biên dịch chuẩn **Dart Sass** (hoặc Extension **Live Sass Compiler** trên VS Code) để chuyển đổi cấu trúc mã.

2. Câu lệnh biên dịch (Compile Command)
Để biên dịch file `style.scss` nằm trong thư mục `scss` ra tệp `style.css` thuần túy ở thư mục bên ngoài, chạy câu lệnh sau trong Terminal:

```bash
sass scss/style.scss style.css
```