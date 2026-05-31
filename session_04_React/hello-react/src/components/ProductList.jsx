function ProductList() {
  // 1. Khai báo danh sách 5 sản phẩm (giá tính theo VNĐ)
  const products = [
    { id: 101, name: "Bàn phím cơ AKKO", price: 1500000 },
    { id: 102, name: "Chuột không dây Logitech", price: 650000 },
    { id: 103, name: "Tai nghe Gaming HyperX", price: 1800000 },
    { id: 104, name: "Lót chuột cỡ lớn", price: 150000 },
    { id: 105, name: "Giá đỡ laptop nhôm", price: 350000 },
  ];

  // 3. Tính tổng giá của tất cả sản phẩm bằng hàm reduce
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "500px",
      }}
    >
      <h2>🛒 Danh sách sản phẩm</h2>
      <ul style={{ paddingLeft: "20px", lineHeigh: "2" }}>
        {products.map((product) => {
          // Kiểm tra điều kiện giá > 1.000.000đ để đổi màu chữ sang đỏ
          const isHighPrice = product.price > 1000000;

          return (
            <li
              key={product.id}
              style={{ color: isHighPrice ? "red" : "black" }}
            >
              <strong>{product.name}</strong> -{" "}
              {product.price.toLocaleString("vi-VN")} đ
              {isHighPrice && " (🔥 Giá cao)"}
            </li>
          );
        })}
      </ul>

      <hr />
      {/* Hiển thị tổng tiền */}
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        💰 Tổng giá trị:{" "}
        <span style={{ color: "blue" }}>
          {totalPrice.toLocaleString("vi-VN")} đ
        </span>
      </p>
    </div>
  );
}

export default ProductList;
