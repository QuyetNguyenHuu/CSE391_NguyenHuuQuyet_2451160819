import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);
    
    // Xử lý logic màu sắc và text hiển thị phụ thuộc vào state count
    let statusText = "Số không";
    let textColor = "#333333"; // Đen mặc định

    if (count > 0) {
        statusText = "Số dương";
        textColor = "#2ecc71"; // Xanh lá
    } else if (count < 0) {
        statusText = "Số âm";
        textColor = "#e74c3c"; // Đỏ
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
            {/* Áp dụng màu sắc động trực tiếp vào style */}
            <h2 style={{ color: textColor }}>Bộ đếm: {count} ({statusText})</h2>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                <button onClick={() => setCount(count + 5)}>Tăng (+5)</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
                <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
                <button onClick={() => setCount(0)} style={{ background: "#95a5a6", color: "white" }}>Reset</button>
            </div>
        </div>
    );
}

export default NumberState;