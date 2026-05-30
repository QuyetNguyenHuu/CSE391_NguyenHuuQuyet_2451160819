# Phần A

## Câu A1 (5đ) — var / let / const

**Đoạn 1**

- Dự đoán Output: undefined
- Giải thích: Do cơ chế Hoisting (nâng biến) của từ khóa var. Khi thực thi, phần khai báo var x; sẽ được đưa lên đầu phạm vi, còn phần gán giá trị x = 5; vẫn giữ nguyên vị trí cũ

**Đoạn 2**

- Dự đoán Output: ReferenceError: Cannot access 'y' before initialization (Lỗi tham chiếu).
- Giải thích: Biến khai báo bằng let (và cả const) cũng bị hoisting, nhưng chúng bị rơi vào vùng Temporal Dead Zone (TDZ) (Vùng chết tạm thời) từ đầu block cho đến khi dòng khai báo được chạy tới. Truy cập biến trong vùng TDZ sẽ gây ra lỗi lập tức thay vì trả về undefined như var.

**Đoạn 3**

- Dự đoán Output: TypeError: Assignment to constant variable. (Lỗi kiểu dữ liệu).
- Giải thích: Biến khai báo với từ khóa const là một hằng số. Khi đã gán giá trị ban đầu (giai đoạn khởi tạo), bạn không thể tái gán (re-assign) một giá trị hoàn toàn mới cho biến đó. Lỗi sẽ bị bắn ra ngay tại dòng z = 20;.

**Đoạn 4**

- Dự đoán Output: [1, 2, 3, 4]
- Giải thích: const chỉ ngăn chặn việc tái gán địa chỉ vùng nhớ (không thể viết arr = [5, 6]), chứ nó không cấm việc thay đổi nội dung bên trong của một Object hoặc Array (đây gọi là tính chất Mutable). Hàm push(4) chỉ sửa đổi mảng hiện tại chứ không gán lại mảng mới.

**Đoạn 5**

- Dự đoán Output:
  Trong block: 2
  Ngoài block: 1
- Giải thích: Từ khóa let có tính chất Block Scope (phạm vi trong cặp ngoặc nhọn {}). Biến let a = 2; nằm bên trong block là một biến hoàn toàn độc lập với biến let a = 1; ở bên ngoài. Khi ra khỏi block, biến a = 2 bị hủy, lệnh console.log phía dưới sẽ đọc biến a ở scope ngoài cùng.

## Câu A2

1. Dự đoán kết quả

```js
console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof NaN); // "number"
console.log("5" + 3); // "53"
console.log("5" - 3); // 2
console.log("5" * "3"); // 15
console.log(true + true); // 2
console.log([] + []); // "" (chuỗi rỗng)
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]" (hoặc 0 tùy thuộc vào môi trường console)
```

2. Giải thích tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau
   Sự khác biệt này nằm ở cách JavaScript định nghĩa hành vi của các toán tử + và - khi đối mặt với các kiểu dữ liệu khác nhau.

- Toán tử + vừa là toán tử toán học (cộng số), vừa là toán tử nối chuỗi (concatenation).
  Trong "5" + 3, vì "5" là một chuỗi, JavaScript sẽ tự động ép kiểu số 3 thành chuỗi "3". Kết quả là "5" + "3" bằng "53"

- Toán tử làm phép tính trừ toán học. Nó không có chức năng nào liên quan đến chuỗi.
  Trong "5" - 3, JavaScript thấy chuỗi "5", nó liền ép kiểu "5" thành số 5. Kết quả phép tính trở thành 5 - 3 bằng 2

## Câu A3

1. Dự đoán kết quả

```js
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // true
```

2. Từ giờ trở đi, bạn nên dùng == hay ===?
   Ta luôn luôn sử dụng === (toán tử so sánh nghiêm ngặt - Strict Equality). Chỉ sử dụng == khi có một lý do cực kỳ cụ thể và hiểu rõ mình đang làm gì.

## Câu A4

1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript

false : Chính là giá trị Boolearn sai.

0 : Số không (Number).

-0 : Số âm không (Number).

0n : BigInt số không (định dạng số nguyên lớn).

"" (hoặc '', `````) : Chuỗi rỗng (không chứa bất kỳ ký tự nào, kể cả dấu cách).

null : Giá trị rỗng/vô giá trị được định nghĩa rõ ràng.

undefined : Biến chưa được định nghĩa hoặc chưa gán giá trị.

NaN : Not a Number (kết quả toán học không hợp lệ).

2. Dự đoán kết quả các câu điều kiện if

```js
if ("0") console.log("A"); // In chữ A (Vì "0" là chuỗi có ký tự, không phải chuỗi rỗng)
if ("") console.log("B"); // KHÔNG IN (Vì "" là chuỗi rỗng - Falsy)
if ([]) console.log("C"); // In chữ C (Vì mảng rỗng [] là một object, mà tất cả object đều là Truthy)
if ({}) console.log("D"); // In chữ D (Vì đối tượng rỗng {} cũng là object $\rightarrow$ Truthy)
if (null) console.log("E"); // KHÔNG IN (Vì null là Falsy)
if (0) console.log("F"); // KHÔNG IN (Vì số 0 là Falsy)
if (-1) console.log("G"); // In chữ G (Chỉ có số 0 là Falsy, các số khác 0 kể cả số âm đều là Truthy)
if (" ") console.log("H"); // In chữ H (Chuỗi chứa dấu cách không phải là chuỗi rỗng $\rightarrow$ Truthy)
```

## Câu A5

**Cách 1**
// Cũ: var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

**Cách 2**
// Cũ: var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

**Cách 3**
// Cũ: var html = "<div class=\"card\">" + "<h2>" + title + ...

```js
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```
