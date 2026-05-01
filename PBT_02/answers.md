## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1

Nguồn tham chiếu: 07_forms_interactive.md phần Các Input Types HTML5

1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type="text" → Ô nhập text, có thể kiểm tra minlength, maxlength, pattern → Dùng cho form đăng ký, ô tìm kiếm
3. type="password" → ẩn ký tự,tự kiểm tra minlength, pattern → Dùng cho ô nhập mật khẩu
4. type="number" → nút tăng/giảm, có thể set min, max, step → Dùng cho ô nhập dữ liệu số
5. type="tel" → Bàn phím số (mobile), tự kiểm tra pattern → Dùng cho ô nhập số điện thoại
6. type="date" → Date picker, tự kiểm tra min, max → Dùng cho ô chọn ngày, tháng, năm
7. type="color" → Color picker → Dùng cho ô chọn màu sắc
8. type="range" → Slider, có thể set min, max, step → Dùng cho ô nhập số
9. type="file" → Upload file, tự kiểm tra accept, multiple → Dùng cho ô chọn file
10. type="url" → Validate URL, tự kiểm tra http:// → Dùng cho ô nhập url

### Câu A2

1. `<input type="text" required value="">`

- Dự đoán kết quả: Không hợp lệ. Trình duyệt sẽ hiển thị thông báo lỗi
- Giải thích: Thuộc tính required bắt buộc người dùng phải nhập dữ liệu. Vì giá trị đang để trống (""), điều kiện validation không được thỏa mãn.

2. `<input type="email" value="abc">`

- Dự đoán kết quả: Không hợp lệ. Trình duyệt sẽ chặn gửi form và yêu cầu nhập đúng định dạng email
- Giải thích: Trình duyệt kiểm tra cú pháp của type="email". Chuỗi "abc" thiếu ký tự @ và phần tên miền phía sau nên không phải là một địa chỉ email hợp lệ.

3. `<input type="number" min="1" max="10"` value="15">

- Dự đoán kết quả: Không hợp lệ. Trình duyệt sẽ hiển thị thông báo lỗi
- Giải thích: Thuộc tính max="10" giới hạn giá trị tối đa mà người dùng có thể nhập. Giá trị hiện tại là 15, vượt quá giới hạn trên.

4. `<input type="text" pattern="[0-9]{10}" value="abc123">`

- Dự đoán kết quả: Không hợp lệ. Trình duyệt sẽ hiển thị thông báo lỗi
- Giải thích: Thuộc tính pattern yêu cầu chuỗi phải khớp với biểu thức chính quy [0-9]{10} (chính xác 10 chữ số từ 0-9). Chuỗi "abc123" chứa cả chữ cái và không đủ độ dài.

5. `<input type="password" minlength="8" value="123">`

- Dự đoán kết quả: Không hợp lệ. Trình duyệt sẽ hiển thị thông báo lỗi
- Giải thích: Thuộc tính minlength="8" yêu cầu độ dài tối thiểu của chuỗi là 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, không đạt yêu cầu.

### Câu A3

1. <label for="email"> quan trọng cho người dùng screen reader vì nếu Form không có <label> thì người dùng screen reader không biết ô nhập gì
2. Dùng Fieldset + Legend cho nhóm liên quan. VD:

```html
<fieldset>
  <legend>Thông tin giao hàng</legend>
  <label for="addr">Địa chỉ:</label>
  <input type="text" id="addr" name="addr" />
</fieldset>
```

3.

- Nên dùng aria-lable cho các thành phần không có nhãn văn bản trực quan, phổ biến nhất là nút bấm chỉ chứa icon (ví dụ: nút đóng, nút tìm kiếm, menu).

- KHÔNG nên dùng aria-label khi đã có <label> vì:
  - Mất tính tương tác: Click vào <label> sẽ trỏ đến ô input (tăng vùng bấm), trong khi aria-label chỉ là thuộc tính ẩn cho trình đọc màn hình.
  - Giảm trải nghiệm (UX): Người dùng bình thường sẽ không thấy nhãn nếu chỉ dùng aria-label thay vì thẻ <label>.
  - Khó dịch thuật: Nội dung trong thuộc tính khó hỗ trợ đa ngôn ngữ hơn nội dung HTML thông thường.

### Câu A4

1. Thuộc tính `loading="lazy"` trên thẻ `<img>`

- Chức năng: Trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của nó.
- Cải thiện:
  - Tốc độ tải trang ban đầu (Initial Page Load): Giảm dung lượng và số lượng tài nguyên cần tải khi mới mở trang.
  - Băng thông: Tiết kiệm dữ liệu mạng cho người dùng nếu họ không cuộn xuống hết trang.
- Khi nào KHÔNG nên dùng:
  - Ảnh "Above the fold": Các ảnh nằm ở phần đầu trang (nhìn thấy ngay khi tải trang, ví dụ: ảnh banner, logo) vì nó làm chậm quá trình hiển thị nội dung chính.

2. Dùng nhiều `<source>` trong thẻ `<video>`

- Giúp trình duyệt chọn được định dạng video phù hợp nhất với thiết bị và trình duyệt của người dùng, đảm bảo tính tương thích (cross-browser compatibility).

3.  Format video web phổ biến:

- MP4 (`video/mp4` - dùng codec H.264, hỗ trợ rộng rãi nhất).
- WebM (`video/webm` - dùng codec VP8/VP9/AV1, tối ưu tốt cho web).
- Ogg (`video/ogg` - dùng codec Theora, ít phổ biến hơn nhưng vẫn được hỗ trợ).

4. Thuộc tính `alt` trên thẻ `<img>`

- Chức năng: Cung cấp văn bản thay thế cho hình ảnh. Hiển thị khi ảnh bị lỗi (broken link) và hỗ trợ các công cụ đọc màn hình (screen reader) cho người khiếm thị.

- Viết `alt` cho 3 trường hợp:
  1. Ảnh sản phẩm iPhone 16:
     > `alt="Điện thoại iPhone 16 màu đen chính hãng"`
  2. Ảnh trang trí (decorative):
     > `alt=""` _(Bỏ trống thuộc tính alt để trình đọc màn hình bỏ qua, tránh gây nhiễu thông tin)._
  3. Ảnh biểu đồ doanh thu Q1/2026:
     > `alt="Biểu đồ cột thể hiện doanh thu Q1 năm 2026, đạt mức tăng trưởng 15% so với cùng kỳ năm ngoái"`

### Câu A5

1. Khi nào nên dùng Cách 1 (`<img>` đơn lẻ)

- Mục đích: Dùng khi hình ảnh mang tính chất độc lập, không cần chú thích (caption) đi kèm hoặc nội dung hình ảnh không phụ thuộc vào dòng chảy chính của văn bản.
- Ví dụ thực tế:
  1. Logo thương hiệu trên thanh điều hướng (Header) của website.
  2. Banner quảng cáo hoặc ảnh đại diện (avatar) của người dùng trong phần thông tin cá nhân.

2. Khi nào nên dùng Cách 2 (`<figure>` kèm `<figcaption>`)

- Mục đích: Dùng khi hình ảnh cần chú thích, giải thích hoặc là một phần nội dung độc lập (như biểu đồ, hình minh họa, sơ đồ) có thể di chuyển ra một vị trí khác mà không làm mất ngữ cảnh của tài liệu.
- Ví dụ thực tế:
  1. Ảnh sản phẩm trên trang thương mại điện tử kèm theo tên sản phẩm và giá bán ngay bên dưới.
  2. Biểu đồ thống kê hoặc sơ đồ khối trong một bài báo cáo, kèm theo đoạn chú thích giải thích số liệu.

## Phần C

### Câu C1

- Lỗi 1: Dòng 2 - Input "Tên" không có <label for="...">, vi phạm accessibility
  Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

- Lỗi 2: Dòng 3 - Input "Email" không có <label for="...">, vi phạm accessibility
  Sửa: <label for="email">Email của bạn:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

- Lỗi 3: Dòng 4 và 5 - Hai input "Mật khẩu" đều không có <lable for="...">, vi phạm accessibility
  Sửa:
  <label for="password">Mật khẩu:</label>
  <input type="password" id="password" name="password" placeholder="Mật khẩu" required>

  <label for="confirm_password">Nhập lại mật khẩu:</label>
  <input type="password" id="confirm_password" name="confirm_password" placeholder="Nhập lại mật khẩu" required>

- Lỗi 4: Dòng 6 - Input "Phone" không có <label for="...">, vi phạm accessibility
  Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567" pattern="[0-9]{10}" placeholder="0901234567">

- Lỗi 5: Dòng 7 - Phần tử <select> không có <label> để giải nghĩa, vi phạm accessibility.
  Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">

- Lỗi 6: Dòng 8 và 9 - Các phần tử <option> trong thẻ <select> thiếu thuộc tính value, vi phạm validation
  Sửa: <option value="hanoi">Hà Nội</option>
  <option value="hcm">TP.HCM</option>

- Lỗi 7: Dòng 11 - Thẻ <label> chứa ô "Tôi đồng ý điều khoản" thiếu input và thiếu thuộc tính for liên kết, vi phạm validation
  Sửa: <label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>

-Lỗi 8: Dòng 14 - Nút submit sử dụng <input type="submit"> thay vì thẻ <button type="submit">, vi phạm best practices

### Câu C2

1. Pattern Regex cho CMND/CCCD và Số tài khoản

- CMND/CCCD (Đúng 12 chữ số): <pattern="[0-9]{12}" required>
- Số tài khoản (10-15 chữ số): <pattern="[0-9]{10,15}" required>

2. HTML5 validation không đủ an toàn cho ứng dụng ngân hàng vì:
   HTML5 validation (như required, pattern, minlength, type="email") chỉ là kiểm tra ở phía người dùng (Client-side). Nó sinh ra để cải thiện UX (trải nghiệm người dùng) chứ không phải để bảo mật.

- Người dùng có thể dễ dàng mở DevTools (F12) để xóa bỏ các thuộc tính HTML5 này.
- Hacker có thể bỏ qua hoàn toàn giao diện Frontend và gửi dữ liệu (request) trực tiếp đến Backend thông qua các công cụ như Postman, cURL, hoặc tự viết script.

3. Ba loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JS)

- Kiểm tra tính duy nhất (Database/Asynchronous Check): Kiểm tra xem Số tài khoản, CMND/CCCD hoặc Email này đã được đăng ký trong cơ sở dữ liệu của ngân hàng chưa (phải gọi API).
- So khớp chéo giữa các trường (Cross-field Validation): Ví dụ: kiểm tra xem mật khẩu và phần "nhập lại mật khẩu" có khớp nhau không, hoặc ngày phát hành thẻ có trước ngày hết hạn không.
- Xử lý logic nghiệp vụ (Business Logic Check): Đối với mã PIN (mặc dù đã dùng HTML5 để giới hạn 6 số), bạn cần JS để chặn các chuỗi quá dễ đoán như 123456, 111111, hoặc kiểm tra xem mã PIN có bị trùng với ngày tháng năm sinh của người dùng không.

4. Hai rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend

- Lỗ hổng tiêm nhiễm mã độc (Injection Attacks - SQLi / XSS): Kẻ gian có thể bypass Frontend để gửi các câu lệnh SQL hoặc các đoạn mã JavaScript độc hại vào form. Nếu Backend không làm sạch (sanitize) và validate, cơ sở dữ liệu có thể bị đánh cắp, xóa sạch, hoặc hệ thống bị chiếm quyền điều khiển.
- Hỏng toàn vẹn dữ liệu (Data Integrity Corruption): Dữ liệu rác, sai định dạng (ví dụ: tuổi là số âm, số tiền chuyển khoản là chữ cái, CMND dài 1000 ký tự) sẽ lọt thẳng vào Database. Điều này làm hỏng cấu trúc dữ liệu của ngân hàng, gây crash hệ thống hoặc dẫn đến các sai sót nghiêm trọng trong giao dịch tài chính.
