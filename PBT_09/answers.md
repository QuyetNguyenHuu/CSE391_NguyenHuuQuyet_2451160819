# Phần A

## Câu A1

1. Vẽ DOM Tree
```
                    [ Document ]
                           |
                     <div #app>
                     /        \
                    /          \
            <header>            <main>
            /      \           /      \
        <h1>      <nav>    <form #todoForm>  <ul #todoList>
         |        / | \       /       \          /        \
      "Todo App" <a><a><a> <input>  <button>  <li>        <li>
                  |   |   |     |       |       |           |
               "All""Active""Completed" "Add" "Learn HTML" "Learn CSS"
```

2. Viết querySelector cho các yêu cầu

```js
//a. Chọn thẻ <h1>

document.querySelector('h1');

//b. Chọn input trong form

document.querySelector('#todoForm input');

//c. Chọn tất cả .todo-item

document.querySelectorAll('.todo-item');

//d. Chọn link đang active

document.querySelector('nav a.active');

//e. Chọn <li> đầu tiên trong #todoList

document.querySelector('#todoList li'); 

//f. Chọn tất cả <a> bên trong <nav>

document.querySelectorAll('nav a');
```

## Câu A2

1. Sự khác nhau giữa `innerHTML` và `textContent`

| Tiêu chí | `innerHTML` | `textContent` |
|-----------|------------|--------------|
| Bản chất | Lấy hoặc thay đổi toàn bộ mã HTML bên trong phần tử (bao gồm cả các thẻ HTML). | Lấy hoặc thay đổi chỉ phần văn bản thuần bên trong phần tử và các phần tử con của nó. |
| Cách xử lý chuỗi | Trình duyệt sẽ phân tích cú pháp (parse) chuỗi và chuyển thành các phần tử HTML thực sự. | Trình duyệt xem chuỗi là văn bản thuần và tự động mã hóa các ký tự đặc biệt (ví dụ: `<` thành `&lt;`). |
| Hiệu năng | Chậm hơn vì phải phân tích HTML và xây dựng lại DOM. | Nhanh hơn vì chỉ xử lý nội dung văn bản. |
| Bảo mật | Có nguy cơ bị tấn công XSS nếu chèn dữ liệu chưa được kiểm duyệt từ người dùng. | An toàn hơn vì mọi thẻ HTML đều được hiển thị như văn bản thông thường, không được thực thi. |
| Hỗ trợ HTML | Có. Các thẻ HTML sẽ được render và hiển thị đúng định dạng. | Không. Các thẻ HTML sẽ được hiển thị nguyên dạng dưới dạng văn bản. |
| Ví dụ gán giá trị | `element.innerHTML = "<b>Hello</b>";` → Hiển thị Hello in đậm. | `element.textContent = "<b>Hello</b>";` → Hiển thị đúng chuỗi `<b>Hello</b>`. |
| Trường hợp sử dụng | Khi cần thêm hoặc thay đổi cấu trúc HTML động. | Khi chỉ cần hiển thị hoặc cập nhật nội dung văn bản. |

2. Ví dụ

- Dùng `innerHTML` khi chủ động muốn chèn một cấu trúc HTML mới do chính mình tạo ra (không chứa dữ liệu nhập từ người dùng bên ngoài)
   Ví dụ: Thêm một hàng mới vào bảng hoặc tạo nhanh một danh sách.

```js
const list = document.querySelector('#menu');
// Tạo cấu trúc thẻ li và a bên trong
list.innerHTML = `<li><a href="/home">Trang chủ</a></li>`;
```
- Dùng `textContent` khi chỉ muốn cập nhật nội dung chữ thông thường (như tên, số lượng, thông báo...) hoặc khi hiển thị dữ liệu do người dùng nhập vào.
   Ví dụ: Cập nhật số điểm của người chơi hoặc hiển thị comment.

```js
const scoreElement = document.querySelector('#score');
scoreElement.textContent = "100"; // Chỉ thay đổi chữ số

const username = document.querySelector('#name');
username.textContent = "<b>Nguyễn Văn A</b>"; 
// Màn hình sẽ hiện thẳng chữ "<b>Nguyễn Văn A</b>" chứ không bôi đậm.
```
3. Câu hỏi bảo mật: Tại sao innerHTML gây lỗ hổng XSS?

- XSS (Cross-Site Scripting) là lỗ hổng xảy ra khi kẻ tấn công có thể chèn các đoạn mã script độc hại (JavaScript) vào trang web và để trình duyệt của người dùng khác thực thi nó.

- innerHTML gây lỗ hổng XSS vì nó tin tưởng tuyệt đối vào chuỗi ký tự được truyền vào và biên dịch nó thành mã HTML/JavaScript. Nếu kẻ tấn công nhập vào một đoạn mã nguy hiểm thay vì một văn bản thông thường, trang web của bạn sẽ vô tình chạy đoạn mã đó dưới danh nghĩa của chính hệ thống.

**Phân tích ví dụ minh họa:**
```js
// Giả sử user nhập vào: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// Đoạn code nguy hiểm:
document.querySelector("#result").innerHTML = userInput;
```
***Cơ chế hoạt động của mã độc trên:***

- Trình duyệt tải thẻ <img> với thuộc tính src=x.

- Vì đường dẫn x không tồn tại, hình ảnh bị lỗi và ngay lập tức kích hoạt sự kiện onerror.

- Đoạn mã nằm trong onerror (ở đây là alert('Hacked!')) được kích hoạt. Thay vì alert, kẻ tấn công có thể viết code để âm thầm lấy cắp cookie, session hoặc token của người dùng và gửi về server của họ.

## Câu A3

1. Trường hợp 1: Khi chưa bỏ comment (Mặc định)

Khi click vào nút `<button id="btn">`, sự kiện click sẽ được kích hoạt tại phần tử sâu nhất này, sau đó "nổi bọt" (bubbling) dần lên các phần tử cha bao bọc nó theo thứ tự từ trong ra ngoài.

**Thứ tự `console.log` in ra sẽ là:**

```text
BUTTON
INNER
OUTER
```
**Giải thích:**
1. Đầu tiên, sự kiện trúng mục tiêu (`#btn`) $\rightarrow$ in ra **`BUTTON`**.
2. Sự kiện nổi bọt lên phần tử cha trực tiếp (`#inner`) $\rightarrow$ in ra **`INNER`**.
3. Sự kiện tiếp tục nổi bọt lên phần tử cha cao hơn (`#outer`) $\rightarrow$ in ra **`OUTER`**.

2. Trường hợp 2: Nếu bỏ comment `e.stopPropagation();`

- Hàm `e.stopPropagation()` có nhiệm vụ **ngăn chặn sự kiện tiếp tục nổi bọt** lên các phần tử cha phía trên. Nó cô lập sự kiện ngay tại nơi nó được gọi.

**Thứ tự `console.log` thay đổi thành:**

```text
BUTTON
```
**Giải thích:**
1. Khi click vào nút `#btn`, hàm lắng nghe sự kiện của nút chạy $\rightarrow$ in ra **`BUTTON`**.
2. Ngay sau đó, câu lệnh `e.stopPropagation()` được thực thi. Nó chặn đứng dòng chảy của sự kiện.
3. Kết quả là sự kiện click bị triệt tiêu ngay lập tức, không thể nổi bọt lên `#inner` và `#outer` được nữa. Hai hàm xử lý phía trên hoàn toàn không được kích hoạt.