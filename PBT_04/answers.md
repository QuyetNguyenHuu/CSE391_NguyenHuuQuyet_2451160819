# PHẦN A

## Câu A1

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                                       | Cuộn theo trang?        | Use case                                            |
| ---------- | ------------------------- | ------------------------------------------------------- | ----------------------- | --------------------------------------------------- |
| `static`   | Có                        | Theo flow bình thường của document                      | Có                      | Layout mặc định của phần tử                         |
| `relative` | Có                        | So với vị trí gốc của chính nó                          | Có                      | Dịch nhẹ phần tử, làm mốc cho `absolute`            |
| `absolute` | Không                     | So với phần tử cha gần nhất có `position` khác `static` | Có                      | Popup nhỏ, badge, icon góc, overlay trong container |
| `fixed`    | Không                     | So với viewport (cửa sổ trình duyệt)                    | Không                   | Navbar cố định, nút back-to-top                     |
| `sticky`   | Có (ban đầu)              | Theo flow bình thường rồi dính theo viewport            | Chỉ dính khi đạt ngưỡng | Header dính khi cuộn                                |

1. Khi nào absolute tham chiếu body? Khi nào tham chiếu parent?

- Tham chiếu parent: Khi phần tử cha (hoặc tổ tiên) được thiết lập position khác static (thường dùng relative).

- Tham chiếu body (thẻ html): Khi tất cả các phần tử bao ngoài nó đều mặc định (position: static).

2. Khái niệm "Nearest Positioned Ancestor"
   Là phần tử tổ tiên gần nhất (cha, ông, cố...) có thuộc tính position mang giá trị khác static (relative, absolute, fixed, hoặc sticky). Phần tử absolute sẽ lấy tọa độ của tổ tiên này làm gốc để căn chỉnh (top, bottom, left, right).

## Câu A2

/_ Trường hợp 1 _/
.container { display: flex; }
.item { flex: 1; }
/_ 4 items → Bố cục = ??? _/

- Dự đoán: 1 hàng duy nhất gồm 4 cột. Vì flex: 1 được áp dụng cho cả 4 items nên chúng sẽ tự động chia đều không gian của container, mỗi item chiếm chính xác 25% chiều rộng.
  +---------------------------------------------------------------------+
  | [ Item 1 (25%) ] [ Item 2 (25%) ] [ Item 3 (25%) ] [ Item 4 (25%) ] |
  +---------------------------------------------------------------------+

/_ Trường hợp 2 _/
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/_ 6 items → Bố cục = ??? (mấy hàng, mấy cột?) _/

- Dự đoán: 3 hàng, mỗi hàng 2 cột. Mỗi item chiếm 45% + 2.5% margin trái + 2.5% margin phải = 50% chiều rộng container. Tổng 2 items vừa khít 100%, do có flex-wrap: wrap nên cứ sau 2 items là tự động xuống hàng.
  +-------------------------------------------------------+
  | [ Item 1 (45%) ] [ Item 2 (45%) ] (Hàng 1)|
  | |
  | [ Item 3 (45%) ] [ Item 4 (45%) ] (Hàng 2)|
  | |
  | [ Item 5 (45%) ] [ Item 6 (45%) ] (Hàng 3)|
  +-------------------------------------------------------+

/_ Trường hợp 3 _/
.container { display: flex; justify-content: space-between; align-items: center; }
/_ 3 items → Bố cục = ??? _/

- Dự đoán: 1 hàng gồm 3 items dàn đều sang 2 bên biên và ở giữa. justify-content: space-between đẩy Item 1 sát lề trái, Item 3 sát lề phải, Item 2 nằm chính giữa. align-items: center giúp cả 3 item căn giữa theo chiều dọc.
  +----------------------------------------------------------+
  | [ Item 1 ] [ Item 2 ] [ Item 3 ] | <- (Căn giữa dọc)
  +----------------------------------------------------------+

/_ Trường hợp 4 _/
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/_ 3 items → Bố cục = ??? _/

- Dự đoán: Bố cục dạng Holy Grail (3 cột) trên 1 hàng. Cột trái và cột phải cố định kích thước 200px. Cột giữa dùng 1fr nên sẽ tự co giãn chiếm trọn toàn bộ khoảng trống còn lại ở giữa. Giữa các cột có khoảng cách (gap) 20px.
  +---------------------------------------------------------------------+
  | [Item 1: 200px] |gap| [ Item 2: Co giãn ] |gap| [Item 3: 200px] |
  +---------------------------------------------------------------------+

/_ Trường hợp 5 _/
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/_ 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) _/

- Dự đoán: 3 hàng, 3 cột.
  - Hàng 1: Gồm Item 1, 2, 3 (mỗi item chiếm 1/3 chiều rộng nhờ 1fr).
  - Hàng 2: Gồm Item 4, 5, 6.
  - Hàng 3: Chỉ có duy nhất Item 7 và nó nằm ở cột đầu tiên (bên trái ngoài cùng). Các ô còn lại của hàng 3 để trống.
    +--------------------------------------------------------+
    | [ Item 1 ] [ Item 2 ] [ Item 3 ] | (Hàng 1)
    | |gap| |
    | [ Item 4 ] [ Item 5 ] [ Item 6 ] | (Hàng 2)
    | |gap| |
    | [ Item 7 ] ( trống ) ( trống ) | (Hàng 3)
    +--------------------------------------------------------+

# Phần C

## Câu C1

1. Tình huống 1: Navigation bar ngang (logo + menu + buttons)

- Lựa chọn: Flexbox
- Giải thích: Giao diện này là layout 1 chiều (1D) theo trục ngang. Flexbox xử lý cực tốt việc phân bổ không gian và canh đều các nhóm phần tử (dùng justify-content: space-between để đẩy logo sang trái, nút sang phải) và căn giữa các mục theo chiều dọc (align-items: center) một cách linh hoạt.

2. Tình huống 2: Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

- Lựa chọn: Grid
- Giải thích: Đây là layout 2 chiều (2D) dạng lưới ma trận (hàng và cột nghiêm ngặt). Sử dụng Grid với thuộc tính grid-template-columns: repeat(3, 1fr) sẽ tự động đưa các ảnh mới vào đúng vị trí hàng/cột mà không cần lo lắng về việc tính toán kích thước hay số lượng ảnh tăng lên.

3. Tình huống 3: Layout blog (main content + sidebar)

- Lựa chọn: Grid (hoặc Flexbox đều được, nhưng Grid tối ưu hơn nếu cấu trúc phức tạp)
- Giải thích: Grid giúp định hình cấu trúc lớn (Macro Layout) của trang web một cách tường minh ngay từ đầu bằng cách chia tỷ lệ cột cố định (ví dụ: grid-template-columns: 3fr 1fr). Điều này giữ cho sidebar và main content luôn thẳng hàng ngay cả khi chiều cao của chúng thay đổi.

4. Tình huống 4: Footer với 4 cột thông tin

- Lựa chọn: Kết hợp cả hai
- Giải thích:
- Dùng Grid cho khung lớn phía ngoài để chia chính xác 4 cột đều nhau (repeat(4, 1fr)) và tự động rớt dòng thành 2 cột hoặc 1 cột khi co nhỏ màn hình (Responsive).
- Dùng Flexbox bên trong từng cột (hướng dọc flex-direction: column) để xếp các link/dòng text từ trên xuống dưới và dễ dàng quản lý khoảng cách giữa chúng.

3. Tình huống 5: Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

- Lựa chọn: Flexbox
- Giải thích: Dùng Flexbox theo chiều dọc (flex-direction: column) cho toàn bộ card. Để giải quyết bài toán "nút luôn dính đáy" bất kể đoạn text ở giữa dài hay ngắn, bạn chỉ cần đặt thuộc tính margin-top: auto cho thẻ chứa nút bấm. Cơ chế tự động tính toán margin của Flexbox sẽ đẩy nút xuống sát mép dưới cùng của card.

## Câu C2

1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

- Nguyên nhân:
  Mặc dù .card-container có display: flex giúp các .card có chiều cao bằng nhau (nhờ cơ chế mặc định align-items: stretch), nhưng bản thân bên trong mỗi .card lại chưa được thiết lập Flexbox. Do đó, các phần tử con bên trong (ảnh, tiêu đề, nút) xếp theo luồng văn bản thông thường. Khi có card có tiêu đề dài 2-3 dòng, nó sẽ đẩy nút xuống thấp, còn card có tiêu đề ngắn 1 dòng thì nút bị kéo lên cao.

- Code sửa:
  Biến chính .card thành một flex container theo chiều dọc (column) và đẩy nút bấm xuống đáy bằng margin-top: auto.

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 30%;
  margin: 1.5%;
  /* SỬA Ở ĐÂY: Biến card thành trục dọc */
  display: flex;
  flex-direction: column;
}
.card img {
  width: 100%;
}
.card h3 {
  font-size: 18px;
}
.card .btn {
  padding: 10px;
  /* SỬA Ở ĐÂY: Tự động tính toán khoảng trống phía trên để đẩy nút dính đáy */
  margin-top: auto;
}
```

2. Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

- Nguyên nhân:
  Ta đã khai báo display: flex cho .hero nhưng lại không cung cấp các lệnh căn chỉnh. Theo mặc định của Flexbox, các phần tử sẽ xếp từ trái sang phải (justify-content: flex-start) và từ trên xuống dưới (align-items: stretch), khiến nội dung bị "bó" ở góc trái trên cùng của màn hình. text-align: center chỉ có tác dụng căn giữa các dòng chữ nội bộ bên trong .hero-content chứ không thể tự căn giữa chính khối .hero-content đó.

- Code sửa:
  Bổ sung hai thuộc tính căn chỉnh cốt lõi của Flexbox vào container .hero.

```css
.hero {
  height: 100vh;
  display: flex;
  /* SỬA Ở ĐÂY */
  justify-content: center; /* Căn giữa theo chiều ngang (trục chính) */
  align-items: center; /* Căn giữa theo chiều dọc (trục phụ) */
}
.hero-content {
  text-align: center;
}
```

3. Lỗi 3: Sidebar bị co lại khi content quá dài

- Nguyên nhân:
  Trong Flexbox, thuộc tính flex-shrink mặc định của các phần tử con luôn là 1. Điều này có nghĩa là khi vùng chứa .layout bị thiếu không gian (do .content chứa quá nhiều chữ hoặc dữ liệu dài không tự ngắt dòng), Flexbox sẽ ép tất cả các phần tử con co lại để vừa với khung hình. Hệ quả là .sidebar bị bóp nghẹt nhỏ hơn mức 250px đã định.

- Code sửa
  Khóa độ rộng của .sidebar lại bằng cách đặt flex-shrink: 0 (không cho phép co) hoặc dùng thuộc tính viết tắt flex: 0 0 250px.

```css
.layout {
  display: flex;
}
.sidebar {
  width: 250px;
  /* SỬA Ở ĐÂY: Ra lệnh cho Flexbox không bao giờ được co nhỏ sidebar này */
  flex-shrink: 0;
}
.content {
  flex: 1;
  /* Thêm thuộc tính này nếu content chứa text quá dài/link không có khoảng trắng */
  min-width: 0;
}
```
