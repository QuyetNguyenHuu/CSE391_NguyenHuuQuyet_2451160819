import { useState } from "react";

function ConditionalChallenge() {
  // Dữ liệu giả lập (Có thể chuyển thành useState để test bấm nút ẩn/hiện)
  const isOnline = true;
  const isLoggedIn = true;
  const stock = 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Thử thách Conditional Rendering</h2>
      <hr />

      {/* 1. Trạng thái Online/Offline (Dùng toán tử 3 ngôi) */}
      <p>
        <b>Trạng thái hệ thống:</b> {isOnline ? "🟢 Online" : "🔴 Offline"}
      </p>

      {/* 2. Hiện/Ẩn menu dựa vào isLoggedIn (Dùng toán tử &&) */}
      <div style={{ margin: "20px 0" }}>
        <b>Giao diện người dùng:</b>
        {isLoggedIn && (
          <nav
            style={{ background: "#e0e0e0", padding: "10px", marginTop: "5px" }}
          >
            🏠 Trang chủ | 👤 Hồ sơ | ⚙️ Cài đặt
          </nav>
        )}
        {!isLoggedIn && (
          <p style={{ color: "gray" }}>Vui lòng đăng nhập để xem Menu.</p>
        )}
      </div>

      {/* 3. Hiển thị "Hết hàng" khi stock = 0 (Dùng toán tử 3 ngôi hoặc &&) */}
      <div>
        <b>Sản phẩm:</b> Laptop Lenovo LOQ 2024
        <p>
          Tình trạng:{" "}
          {stock > 0 ? (
            `Còn lại: ${stock} máy`
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              ❌ Hết hàng
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ConditionalChallenge;
