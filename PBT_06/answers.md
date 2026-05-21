# Phần A
## Câu A1

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

## Câu A2

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