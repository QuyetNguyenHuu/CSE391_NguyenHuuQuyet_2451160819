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

# Phần C

## Câu C1

1. Dùng sai tên sự kiện trong `addEventListener`

- Lỗi: `document.querySelector("#decrementBtn").addEventListener("onclick", ...)`
- Sửa: Trong `addEventListener`, tên sự kiện không có tiền tố `on`. Phải đổi `"onclick"` thành `"click"`.

2. Ghi đè biến hằng số (`const`)

- Lỗi:`const countDisplay = document.querySelector(".count");` nhưng ở nút reset lại gán `countDisplay = count;`. Việc này sẽ gây ra lỗi `TypeError: Assignment to constant variable`.

- Sửa: Phải cập nhật nội dung hiển thị của DOM element: `countDisplay.innerHTML = count;` (hoặc `textContent`).

3. Đặt giá trị `null` cho `innerHTML`

- Lỗi: `historyList.innerHTML = null;` khi reset. Dù trình duyệt có thể tự ép kiểu về chuỗi `"null"`, đây vẫn là bad practice và có thể hiển thị chữ "null" lên màn hình ở một số trình duyệt.

- Sửa: Đổi thành chuỗi rỗng `historyList.innerHTML = "";`.

4. Gọi hàm `remove` sai cú pháp (Thiếu cặp ngoặc tròn)

- Lỗi: `item.remove;` trong hàm xóa toàn bộ history. Lệnh này chỉ đang tham chiếu đến hàm chứ chưa thực thi nó.
- Sửa: Thêm cặp ngoặc để gọi hàm: `item.remove();`.

5. Sai kiểu dữ liệu khi lấy từ `localStorage` (Ép kiểu chuỗi thành số)

- Lỗi: `count = localStorage.getItem("count");` trả về một `string` (hoặc `null` nếu chưa có dữ liệu). Khi bấm nút `incrementBtn` (`count++`), JS có thể tự ép kiểu, nhưng nếu `localStorage` trống, `count` sẽ thành `NaN`.
- Sửa: Cần ép kiểu về số và handle trường hợp chưa có dữ liệu: `count = Number(localStorage.getItem("count")) || 0;`.

6. Quên khôi phục dữ liệu `history` từ `localStorage`

- Lỗi: Ở sự kiện `load`, code có lưu `historyList.innerHTML` vào `localStorage` lúc `beforeunload`, nhưng khi load lại trang thì **hoàn toàn bỏ quên** không hiển thị lại danh sách này.

- Sửa: Thêm dòng `historyList.innerHTML = localStorage.getItem("history") || "";` vào sự kiện `load`.

7. Lỗi mất Event Listener của các phần tử History sau khi reload trang

- Lỗi: Khi khôi phục `historyList.innerHTML` từ `localStorage`, các thẻ `li` chỉ là HTML thuần túy. Sự kiện `click` để gọi hàm `deleteHistory(this)` gắn bằng JS trước đó đã **bị mất hoàn toàn**. Người dùng click vào các item cũ sẽ không xóa được nữa.

- Sửa: Thay vì gắn listener vào từng `li`, ta nên dùng kỹ thuật **Event Delegation** (Ủy quyền sự kiện) – gắn 1 sự kiện duy nhất vào thẻ cha `historyList`.

8. Lỗi hiển thị chữ `null` khi load trang lần đầu

- Lỗi: Nếu lần đầu tiên mở ứng dụng, `localStorage.getItem("count")` trả về `null`. Gán thẳng vào `countDisplay.textContent = count;` sẽ khiến màn hình hiển thị chữ `"null"`.

- Sửa: Cần kiểm tra hoặc set giá trị mặc định là `0`.

**Sửa hoàn chỉnh (Cleaned & Optimized)**

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// SỬA LỖI 7: Dùng Event Delegation cho history list (Xóa item khi click)
// Giúp các item cài từ localStorage vẫn có thể click xóa bình thường
historyList.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "LI") {
        deleteHistory(e.target);
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Bỏ đoạn gắn sự kiện trực tiếp ở đây vì đã dùng Event Delegation ở trên
    historyList.append(li);
});

// SỬA LỖI 1: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // SỬA LỖI 2 & 3: Sửa countDisplay thành thuộc tính innerHTML và đổi null thành ""
    countDisplay.innerHTML = count;
    historyList.innerHTML = ""; 
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // SỬA LỖI 4: Thêm dấu () để thực thi hàm
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // SỬA LỖI 5 & 8: Ép kiểu Number và check dữ liệu mặc định tránh hiển thị "null"
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;

    // SỬA LỖI 6: Khôi phục lại danh sách history từ localStorage
    historyList.innerHTML = localStorage.getItem("history") || "";
});

```

## Câu C2

1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

Việc lặp qua 1000 phần tử và gắn cho mỗi phần tử một Event Listener riêng biệt được coi là "tối kỵ" (Bad Practice) vì 2 lý do lớn sau:

- Tốn tài nguyên bộ nhớ (Memory Consumption): Mỗi lần bạn gọi `addEventListener`, trình duyệt phải khởi tạo và duy trì một object "Event Listener" trong bộ nhớ RAM. 1000 elements đồng nghĩa với 1000 objects chạy ngầm. Trên các thiết bị cấu hình yếu hoặc mobile, điều này gây ngốn RAM và có thể dẫn đến hiện tượng giật lag, rò rỉ bộ nhớ (Memory Leak).

- Tốn hiệu năng khi cập nhật DOM (Dynamic Elements): Nếu danh sách này thay đổi liên tục (thêm/xóa phần tử), bạn lại phải thủ công gắn thêm event cho phần tử mới hoặc hủy event của phần tử cũ để tránh rò rỉ bộ nhớ. Việc quản lý này cực kỳ phức tạp và tốn công xử lý của CPU.

2. Event Delegation giải quyết thế nào?

- Event Delegation (Ủy quyền sự kiện) giải quyết triệt để vấn đề này dựa trên cơ chế Event Bubbling (Sự nổi bọt sự kiện) của JavaScript. Khi một sự kiện (như `click`) xảy ra trên một phần tử con, sự kiện đó sẽ không dừng lại mà "nổi bọt" dần lên các phần tử cha của nó, cho đến tận thẻ `body` và `window`.

- Thay vì gắn 1000 listener cho 1000 thẻ `div`, ta chỉ gắn 1 listener duy nhất vào thẻ cha chứa chúng (ví dụ: `document.body` hoặc một thẻ `div#container`).

Khi người dùng click vào một item con:

1. Sự kiện nổi bọt lên thẻ cha.
2. Thẻ cha bắt được sự kiện này.
3. Ta dùng thuộc tính `event.target` để kiểm tra chính xác phần tử con nào vừa được click và xử lý logic cho phần tử đó.

> **Kết quả:** Từ 1000 Event Listeners giảm xuống chỉ còn **1 Event Listener duy nhất**, tiết kiệm RAM tối đa và tự động áp dụng được cho cả các phần tử con được thêm vào sau này mà không cần gắn lại event.

---

3. Refactor code dùng DocumentFragment

```javascript
// 1. Tạo một DocumentFragment rỗng đóng vai trò như "vùng đệm" trong bộ nhớ
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // 2. Thêm div vào fragment (Thao tác này hoàn toàn chạy ngầm, không gây reflow)
    fragment.appendChild(div); 
}

// 3. Đưa fragment vào DOM thực tế (Chỉ gây ra ĐÚNG 1 LẦN REFLOW)
document.body.appendChild(fragment);

```

4. Tại sao cách này lại nhanh hơn?

Để hiểu tại sao `DocumentFragment` nhanh hơn, chúng ta cần so sánh cơ chế hoạt động của 2 cách làm:

- Khi ta lặp 1000 lần để nhét `div` vào `fragment`, trình duyệt **không hề** phải tính toán lại giao diện vì `fragment` chưa hiển thị trên màn hình.

- Đến bước cuối cùng, khi ta append `fragment` vào `document.body`, trình duyệt sẽ trích xuất toàn bộ các thẻ con bên trong fragment ra và chèn vào DOM cùng một lúc. Trình duyệt chỉ cần tính toán lại cấu trúc layout **đúng 1 lần duy nhất** cho cả 1000 phần tử. Hiệu năng nhờ đó được tối ưu hóa rõ rệt.