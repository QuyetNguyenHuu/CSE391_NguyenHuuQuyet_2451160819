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
