# Phần A

## Câu A1

**Cách 1: Function Declaration (Khai báo hàm)**

```js
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  const thuc_nhan = luong - thue;
  return {
    thue: thue, // Thêm vào để rõ ràng logic
    thuong: 0, // Giữ nguyên theo key đề bài yêu cầu
    thuc_nhan: thuc_nhan,
  };
}
```

**Cách 2: Function Expression**

```js
const tinhThueBaoHiem = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  const thuc_nhan = luong - thue;
  return {
    thue: thue,
    thuong: 0,
    thuc_nhan: thuc_nhan,
  };
};
```

**Cách 3: Arrow Function**

```js
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  const thuc_nhan = luong - thue;
  return {
    thue: thue,
    thuong: 0,
    thuc_nhan: thuc_nhan,
  };
};
```

2. So sánh về Hoisting giữa 3 cách và Ví dụ cụ thể
   Sự khác nhau rất lớn về Hoisting giữa Function Declaration và hai cách còn lại (Function Expression, Arrow Function)

- Function Declaration: Được hoisting hoàn toàn (cả tên hàm và định nghĩa hàm). Bạn có thể gọi hàm này trước khi nó được khai báo trong code.
- Function Expression & Arrow Function: Cơ chế hoisting phụ thuộc vào từ khóa khai báo biến (var, let, hoặc const). Khi dùng const hoặc let, biến chứa hàm sẽ bị rơi vào vùng Temporal Dead Zone (TDZ). Bạn không thể gọi hàm trước khi khai báo, nếu cố tình gọi sẽ bị lỗi ReferenceError

**Ví dụ minh họa cụ thể:**

- Trường hợp 1: Sử dụng Function Declaration (Chạy thành công)

```js
// Gọi hàm TRƯỚC khi khai báo
console.log(tinhThueDeclaration(12000000));
// Kết quả: { thue: 1200000, thuong: 0, thuc_nhan: 10800000 }

function tinhThueDeclaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuong: 0, thuc_nhan: luong - thue };
}
```

- Trường hợp 2: Sử dụng Function Expression với const (Gây lỗi)

```js
// Gọi hàm TRƯỚC khi khai báo
console.log(tinhThueExpression(12000000));
// ❌ LỖI: ReferenceError: Cannot access 'tinhThueExpression' before initialization

const tinhThueExpression = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuong: 0, thuc_nhan: luong - thue };
};
```

- Trường hợp 3: Sử dụng Arrow Function với const (Gây lỗi)

```js
// Gọi hàm TRƯỚC khi khai báo
console.log(tinhThueArrow(12000000));
// ❌ LỖI: ReferenceError: Cannot access 'tinhThueArrow' before initialization

const tinhThueArrow = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuong: 0, thuc_nhan: luong - thue };
};
```

## Câu A2

1. Dự đoán Output

**Đoạn 1**

```js
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount()); // 2
```

**Đoạn 2 (Sau 200ms):**
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2

2. Giải thích chi tiết
   **Đoạn 1:** Cơ chế Closure (Đóng gói dữ liệu)

- Khi hàm counter() được thực thi, một môi trường biến (Lexical Environment) được tạo ra chứa biến count = 0.

- Hàm này trả về một object chứa 3 arrow functions (increment, decrement, getCount). Cả 3 hàm này đều "ghi nhớ" và dùng chung tham chiếu đến biến count nằm ở phạm vi cha của chúng. Đây chính là Closure.

- Do đó, mỗi lần gọi c.increment() hay c.decrement(), chúng đều trực tiếp chỉnh sửa và cập nhật trên cùng một biến count duy nhất đó, khiến giá trị được tích lũy qua các lần gọi.

**Đoạn 2:** Sự khác biệt về Scope giữa var và let trong setTimeout
Lý do var và let cho kết quả khác nhau nằm ở Phạm vi hoạt động (Scope) và cách JavaScript xử lý Bất đồng bộ (Asynchronous).

- Với vòng lặp var:
  - Từ khóa var có Function Scope (hoặc Global Scope trong trường hợp này), nó không có Block Scope (phạm vi khối lệnh {}).

  - Điều này có nghĩa là chỉ có một biến i duy nhất được tạo ra và dùng chung cho toàn bộ các lần lặp.

  - Khi vòng lặp chạy, 3 hàm setTimeout được đẩy vào hàng đợi (Callback Queue) để chờ sau 100ms mới chạy. Trong lúc đó, vòng lặp for tiếp tục chạy rất nhanh cho đến khi kết thúc, lúc này biến i đã tăng lên thành 3.

  - Sau 100ms, các hàm callback của setTimeout mới thực thi. Chúng nhìn ra phạm vi bên ngoài để tìm biến i. Vì tất cả đều tham chiếu chung đến một biến i duy nhất hiện tại đã bằng 3, nên kết quả in ra là ba lần var: 3.

- Với vòng lặp let:
  - Từ khóa let có Block Scope (phạm vi khối lệnh).

  - Trong vòng lặp for, cứ mỗi một lần lặp (iteration), JavaScript lại tạo ra một biến j hoàn toàn mới và "chụp" lại giá trị của j tại thời điểm đó.

  - 3 hàm setTimeout của let lúc này tạo thành 3 Closure riêng biệt, mỗi hàm "ghi nhớ" một biến j khác nhau ở từng vòng lặp tương ứng (vòng một ghi nhớ j = 0, vòng hai ghi nhớ j = 1, vòng ba ghi nhớ j = 2).

  - Sau 200ms, khi các hàm callback thực thi, chúng tìm về biến j riêng của vòng lặp mà chúng đã ghi nhớ, dẫn đến kết quả in ra là let: 0, let: 1, let: 2.
