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

## Câu A3

```js
// 1. Lấy các số chẵn
const cau1 = nums.filter((n) => n % 2 === 0);

// 2. Nhân mỗi số với 3
const cau2 = nums.map((n) => n * 3);

// 3. Tính tổng tất cả
const cau3 = nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
const cau4 = nums.find((n) => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const cau5 = nums.some((n) => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const cau6 = nums.every((n) => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const cau7 = nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate / không làm thay đổi mảng gốc)
const cau8 = [...nums].reverse();
```

## Câu A4

```js
const product = {
  name: "iPhone 16",
  price: 25990000,
  specs: { ram: 8, storage: 256, color: "Titan" },
};

// 1. Destructuring

const {
  name,
  price,
  specs: { ram, color },
} = product;

console.log(name, price, ram, color);
// output: iPhone 16 25990000 8 Titan
// Giải thích: Các biến độc lập được trích xuất thành công từ object

console.log(specs);
// output: LỖI: ReferenceError: specs is not defined
// Giải thích: Khi dùng cú pháp lồng nhau `specs: {...}`, 'specs' chỉ đóng vai trò đường dẫn chứ không tạo ra biến

// 2. Spread

const updated = { ...product, price: 23990000, sale: true };

console.log(updated.price);
// output: 23990000
// Giải thích: Giá trị mới ghi đè lên giá trị cũ nhờ đứng phía sau

console.log(updated.sale);
// output: true
// Giải thích: Thuộc tính mới được thêm vào thành công

console.log(product.price);
// output: 25990000
// Giải thích: Gốc KHÔNG đổi vì `updated` là một object độc lập ở tầng 1

// 3. Spread gotcha

const copy = { ...product };
copy.specs.ram = 16;

console.log(product.specs.ram);
// output: 16
// Giải thích: Kết quả là 16 chứ không phải 8. Do Spread Operator chỉ làm Shallow Copy (Sao chép nông).
// Object lồng bên trong là `specs` không được nhân bản mà chỉ sao chép địa chỉ vùng nhớ (tham chiếu).
// Vì vậy, cả `copy.specs` và `product.specs` đều trỏ chung vào một nơi; sửa một bên, bên còn lại sẽ bị đổi theo!)
```

# Phần C

## Câu C1

```js
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.price || b.finalTotal - a.finalTotal);
```

## Câu C2

```js
const miniArray = {
  // 1. Tự viết hàm map
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      // Thực thi hàm callback với 3 tham số chuẩn: phần tử hiện tại, chỉ số, mảng gốc
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  // 2. Tự viết hàm filter
  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      // Nếu hàm callback trả về giá trị truthy, thêm phần tử đó vào mảng kết quả
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  },

  // 3. Tự viết hàm reduce (Xử lý trường hợp có hoặc không có initialValue)
  reduce(arr, fn, initialValue) {
    // Kiểm tra xem người dùng có truyền vào giá trị khởi tạo hay không
    const hasInitialValue = initialValue !== undefined;

    // Nếu không có initialValue và mảng rỗng thì ném lỗi y hệt như hàm built-in
    if (arr.length === 0 && !hasInitialValue) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // Đặt giá trị tích lũy ban đầu và chỉ số bắt đầu vòng lặp
    let accumulator = hasInitialValue ? initialValue : arr[0];
    let startIndex = hasInitialValue ? 0 : 1;

    for (let i = startIndex; i < arr.length; i++) {
      // Cập nhật giá trị tích lũy qua từng vòng lặp
      accumulator = fn(accumulator, arr[i], i, arr);
    }
    return accumulator;
  },
};

console.log("--- TEST MAP ---");
console.log(miniArray.map([1, 2, 3], (x) => x * 2));
// OUTPUT: [2, 4, 6]

console.log("\n--- TEST FILTER ---");
console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2));
// OUTPUT: [3, 4]

console.log("\n--- TEST REDUCE ---");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// OUTPUT: 10

// Test bổ sung cho trường hợp Reduce KHÔNG CÓ initialValue
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b));
// OUTPUT: 10 (Hợp lệ: lấy phần tử đầu tiên làm giá trị tích lũy ban đầu)
```
