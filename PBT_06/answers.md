# Track A
## Phần A
### Câu A1

**Bảng Phân Tích Bố Cục Layout theo Breakpoints**

| Kích thước                      | `< 768px` | `768px - 991px` | `≥ 992px`      |
| ------------------------------- | --------- | --------------- | -------------- |
| **Số cột hiển thị trên 1 hàng** | 1         | 2               | 4              |
| **Mỗi box chiếm**               | 12/12     | 6/12            | 3/12           |
| **Layout**                      | 4 hàng    | 2 hàng × 2 cột  | 1 hàng × 4 cột |

**Vẽ layout**

1. Mobile (<768px)

col-12 ⇒ mỗi box full width.

[   Box 1   ]
[   Box 2   ]
[   Box 3   ]
[   Box 4   ]

→ 1 box mỗi hàng.

2. Tablet (768px - 991px)

col-md-6 ⇒ mỗi box chiếm 6/12 = 1/2 hàng.

[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]

→ 2 box mỗi hàng.

3. Desktop (≥992px)

col-lg-3 ⇒ mỗi box chiếm 3/12 = 1/4 hàng.

[ Box1 ][ Box2 ][ Box3 ][ Box4 ]

→ 4 box trên cùng 1 hàng.

**Câu hỏi thêm**

- col-md-6 nghĩa là gì?

    Trong Bootstrap Grid System:
    md = medium breakpoint (≥768px)
    6 = chiếm 6/12 cột
    ⇒ Khi màn hình từ 768px trở lên, phần tử rộng 50%.

- Tại sao không cần viết col-sm-12?
    Trong các hệ thống CSS Grid hiện đại (như Bootstrap), mã nguồn được viết theo tư duy Mobile-First (Ưu tiên thiết bị nhỏ). Nghĩa là:

    Class cơ sở col-12 không chứa kí tự thiết bị sẽ tự động áp dụng cho tất cả các kích thước màn hình từ bé nhất (Mobile) hắt lên.

    Thuộc tính này sẽ giữ nguyên hiệu lực cho đến khi nó gặp một class ở breakpoint lớn hơn ghi đè lên nó (ở bài này là col-md-6 ở mốc 768px).
    
    Do khoảng màn hình Small (sm - từ 576px đến 767px) vẫn nằm dưới mốc md (768px), nó sẽ tự động kế thừa (inherit) thuộc tính của class nhỏ hơn gần nhất là col-12. Việc viết col-sm-12 lúc này là hoàn toàn dư thừa vì trình duyệt vốn dĩ đã đang ép nó chạy full 12 cột rồi

### Câu A2

1. Giải thích class .d-none .d-md-block
- Sự kết hợp của hai class này là một kỹ thuật responsive cực kỳ phổ biến để ẩn/hiện phần tử theo màn hình. Do viết theo tư duy Mobile-First (ưu tiên màn hình nhỏ), thuộc tính sẽ chạy từ bé đến lớn:
    - .d-none (Display None): Áp dụng từ màn hình nhỏ nhất (Mobile hắt lên), ra lệnh ẩn hoàn toàn phần tử này khỏi giao diện.
    - .d-md-block (Display Medium Block): Khi màn hình đạt mốc md (Medium $\ge$ 768px), thuộc tính display: block được kích hoạt để hiện lại phần tử dưới dạng khối.

2. Liệt kê 5 Spacing Utilities (Tiện ích khoảng cách)
- Các class này giúp chỉnh nhanh khoảng cách margin (khoảng cách bên ngoài) hoặc padding (khoảng cách đệm bên trong) mà không cần viết CSS thủ công.

- mt-3 (Margin Top 3): Thêm khoảng cách phía trên bên ngoài của phần tử. Mức số 3 thường tương đương với 1rem hoặc 16px (tùy cấu hình root).

- mb-auto (Margin Bottom Auto): Tự động tính toán và chiếm trọn không gian trống còn thừa ở phía dưới bên ngoài. Thường dùng trong Flexbox để ghim nút bấm hoặc footer dính chặt xuống đáy khung chứa.

- px-4 (Padding X 4): Thêm khoảng cách đệm bên trong đồng thời cho cả Trái (Left) và Phải (Right) theo trục hoành X. Mức số 4 thường tương đương 1.5rem hoặc 24px.

- py-0 (Padding Y 0): Triệt tiêu hoàn toàn (bằng 0) khoảng cách đệm bên trong ở cả Trên (Top) và Dưới (Bottom) theo trục tung Y.

- ms-2 (Margin Start 2): Thêm khoảng cách bên trái bên ngoài (Trong các phiên bản mới, start thay thế cho left để hỗ trợ các ngôn ngữ đọc từ phải sang trái).

3. Sự khác nhau giữa .container, .container-fluid, và .container-md

| Class | Cơ chế co giãn & Độ rộng | Trải nghiệm thực tế |
|---|---|---|
| `.container` | Cố định theo từng breakpoint, có `max-width` và tự căn giữa. | Có khoảng trắng 2 bên, giao diện gọn gàng trên Desktop. |
| `.container-fluid` | Luôn rộng `100%` màn hình, không có `max-width`. | Nội dung kéo dài từ mép trái sang mép phải màn hình. |
| `.container-md` | `<768px` full width, `>=768px` fixed width như `.container`. | Mobile hiển thị full màn hình, Desktop thì gom gọn ở giữa. |

## Phần C

### Câu C1

1. Quy trình đổi màu $primary sang #E63946
Để thay đổi tận gốc màu sắc chủ đạo của Bootstrap, bạn không sửa trực tiếp vào file mã nguồn của thư viện (vì khi cập nhật phiên bản mới sẽ bị ghi đè mất), mà thực hiện qua quy trình biên dịch Sass.

**Các công cụ cần thiết:**
- Node.js & npm để cài đặt trình biên dịch.

- Bộ biên dịch Sass (Sass Compiler): Thường dùng thư viện sass (Dart Sass).

- Mã nguồn Bootstrap Sass: Được cài đặt qua lệnh npm i bootstrap (thư mục nằm trong node_modules/bootstrap/scss/).

**Các file cần tạo và chỉnh sửa:**

- Cần tạo một file stylesheet riêng cho dự án, ví dụ: scss/custom.scss. Cấu trúc code viết trong file này phải tuân theo thứ tự sau:

```scss
// 1. Khai báo mã màu mới
$custom-primary: #E63946;

// 2. Ghi đè vào biến hệ thống $primary của Bootstrap
$primary: $custom-primary;

// 3. Tiến hành import file cấu hình tổng của Bootstrap vào sau
// Đường dẫn trỏ vào thư mục node_modules nơi cài đặt Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";
```

**Bước biên dịch:**

- Chạy lệnh Terminal để biên dịch file SCSS tùy biến thành file CSS thuần cho trình duyệt đọc:

```bash
    sass scss/custom.scss dist/css/bootstrap.custom.css
```

- Sau đó nhúng file bootstrap.custom.css này vào HTML là toàn bộ hệ thống đã chuyển sang màu đỏ mới.

2. Tại sao KHÔNG nên override trực tiếp bằng CSS thuần?

**Vì:**

- Hiệu ứng dây chuyền (Hệ sinh thái biến số)
Trong Bootstrap, biến $primary không chỉ nuôi duy nhất một mình cái nút .btn-primary. Màu sắc này được liên kết tự động qua các hàm Sass để tạo ra hàng loạt thành phần khác:

- Các trạng thái tương tác: Màu khi :hover, :active, :focus (nút bấm sẽ tự đậm lên hoặc nhạt đi).

- Các biến thể component: Nút dạng viền .btn-outline-primary, màu nền thông báo .bg-primary, màu chữ định dạng .text-primary, viền khung .border-primary.

- Các thành phần giao diện khác: Thanh tiến trình (progress-bar), thẻ màu (card), các icon điều hướng (nav-link).

### Câu C2

1. Bản đối chiếu kỹ thuật tổng quan

| Tiêu chí | Viết bằng CSS thuần | Viết bằng Bootstrap |
|---|---|---|
| Cơ chế triển khai | Phải tự xây dựng layout bằng Flexbox/Grid và tự viết `@media` để responsive. | Dùng các class có sẵn như `.container`, `.row`, `.col-md-4`, `.navbar`. |
| Số dòng CSS cần viết | Nhiều dòng CSS để xử lý layout, khoảng cách, hiệu ứng và responsive. | Gần như không cần viết CSS vì Bootstrap đã cung cấp sẵn. |
| Thời gian phát triển | Chậm hơn vì phải tự căn chỉnh và test trên nhiều kích thước màn hình. | Nhanh hơn do chỉ cần ghép đúng class theo tài liệu Bootstrap. |
| Khả năng tùy biến | Rất linh hoạt, có thể thiết kế độc quyền theo ý muốn. | Bị phụ thuộc vào hệ thống class và phong cách của Bootstrap. |
| Độ khó bảo trì | Khó bảo trì khi dự án lớn vì CSS dễ bị chồng chéo. | Dễ bảo trì hơn nhờ cấu trúc class thống nhất. |
| Tốc độ học | Cần hiểu sâu về CSS, Flexbox, Grid và Responsive Design. | Dễ tiếp cận hơn cho người mới học frontend. |
| Hiệu năng | Nhẹ hơn nếu chỉ viết đúng phần cần dùng. | File CSS lớn hơn vì chứa nhiều class dựng sẵn. |
| Trường hợp phù hợp | Website cần giao diện riêng biệt hoặc tối ưu hiệu năng. | Prototype nhanh, dashboard, admin hoặc website doanh nghiệp. |

2. Đánh giá sâu về các khía cạnh phát triển

**Khả năng tùy biến (Customization)**
- CSS thuần (Thắng thế): Đạt điểm 10/10 về sự tự do. Bạn có thể vẽ bất kỳ hình thù gì, bo góc tùy ý, tạo hiệu ứng chuyển động độc lạ mà không bị gò bó bởi bất kỳ quy chuẩn nào. Code chạy nhẹ vì chỉ chứa đúng những thuộc tính bạn cần.

- Bootstrap (Hạn chế hơn): Đạt 7/10. Giao diện mặc định của Bootstrap mang đậm tính "công nghiệp" (nhìn vào là biết ngay dùng Bootstrap). Để đổi màu hay đổi kiểu bo góc theo ý muốn của Designer, bạn buộc phải học cách ghi đè (override) biến số Sass như đã phân tích ở câu trước, nếu không code sẽ bị phình to và chắp vá.

**Khi nào NÊN dùng Bootstrap?**

- Dự án cần làm nhanh (Deadline gấp): Các dự án xây dựng trang quản trị (Admin Dashboard), trang nội bộ doanh nghiệp, hoặc sản phẩm chạy thử nghiệm (MVP) để gọi vốn.

- Làm việc nhóm đông người (Teamwork): Khi mọi lập trình viên đều tuân theo chuẩn lưới của Bootstrap, người này vào đọc code của người kia sẽ hiểu ngay lập tức mà không mất thời gian làm quen với cách đặt tên class riêng của bạn.

- Kỹ năng CSS ở mức cơ bản: Bootstrap lo hết phần responsive phức tạp, giúp bạn né được các lỗi vỡ layout sơ đẳng trên màn hình di động.

**Khi nào KHÔNG NÊN dùng Bootstrap?**

- Trang web đòi hỏi thiết kế độc bản (Creative/Creative Agency): Những trang Landing Page quảng cáo sản phẩm thời trang cao cấp, portfolio nghệ thuật, hoặc trang web có hiệu ứng phức tạp 3D. Việc ép Bootstrap vào những giao diện này sẽ làm thui chột khả năng sáng tạo.

- Cần tối ưu tốc độ tải trang tuyệt đối (Performance): Bootstrap đi kèm với một tệp CSS và JS tổng khá nặng chứa hàng ngàn class mà bạn không bao giờ dùng tới. Nếu dự án yêu cầu tối ưu SEO core web vitals ở mức cực đoan, tự viết CSS sạch sẽ, tinh gọn là lựa chọn thông minh hơn.

