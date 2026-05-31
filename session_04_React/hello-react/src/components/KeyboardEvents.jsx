import { useState, useEffect } from "react";

function KeyboardEvents() {
    // Game đoán phím
    const [targetKey, setTargetKey] = useState("A");
    const [gameMessage, setGameMessage] = useState("Nhấn phím để bắt đầu");
    
    // Điều khiển ô vuông
    const [position, setPosition] = useState({ top: 50, left: 50 });
    
    // Phím tắt đổi màu
    const [isCustomBg, setIsCustomBg] = useState(false);

    function handleGlobalKeyDown(e) {
        // Thử thách 3: Nhấn tổ hợp phím Ctrl + M để đổi màu nền khu vực
        if (e.ctrlKey && e.key.toLowerCase() === "m") {
            e.preventDefault(); // Chặn hành vi mở menu mặc định của trình duyệt
            setIsCustomBg(!isCustomBg);
            return;
        }

        // Thử thách 1: Game đoán phím
        if (e.key.toUpperCase() === targetKey) {
            setGameMessage("🎉 Chính xác! Bạn đã thắng.");
            // Tạo một phím chữ ngẫu nhiên mới từ A-Z
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            setTargetKey(chars[Math.floor(Math.random() * chars.length)]);
        } else {
            if (e.key.length === 1) { // Chỉ tính phím ký tự thường
                setGameMessage(`❌ Sai rồi! Bạn vừa nhấn phím "${e.key.toUpperCase()}"`);
            }
        }

        // Thử thách 2: Di chuyển ô vuông (Mũi tên ↑ ↓ ← →)
        const step = 10;
        if (e.key === "ArrowUp") setPosition(p => ({ ...p, top: Math.max(0, p.top - step) }));
        if (e.key === "ArrowDown") setPosition(p => ({ ...p, top: Math.min(100, p.top + step) }));
        if (e.key === "ArrowLeft") setPosition(p => ({ ...p, left: Math.max(0, p.left - step) }));
        if (e.key === "ArrowRight") setPosition(p => ({ ...p, left: Math.min(200, p.left + step) }));
    }

    return (
        <div 
            onKeyDown={handleGlobalKeyDown} 
            tabIndex={0} 
            style={{ 
                padding: "15px", 
                backgroundColor: isCustomBg ? "#fcf3cf" : "#fff", 
                border: "1px dashed #ccc",
                outline: "none"
            }}
        >
            <h3>Bài 5.3 — Keyboard Events</h3>
            <p style={{ fontSize: "13px", color: "#666" }}>💡 <em>Click chuột vào vùng này trước để kích hoạt nhận diện phím.</em></p>
            <p style={{ fontSize: "13px", color: "blue" }}>⌨️ Phím tắt: Bấm <strong>Ctrl + M</strong> để bật/tắt màu nền.</p>

            {/* Game đoán phím */}
            <div style={{ background: "#f9f9f9", padding: "10px", margin: "10px 0" }}>
                <p>🎯 Thử thách game: Hãy nhấn phím: <strong style={{ fontSize: "20px", color: "#e67e22" }}>{targetKey}</strong></p>
                <p>Kết quả: <strong>{gameMessage}</strong></p>
            </div>

            {/* Khối vuông di chuyển */}
            <p>🕹️ Nhấn các phím mũi tên để di chuyển khối màu đỏ:</p>
            <div style={{ position: "relative", width: "240px", height: "140px", background: "#eee", borderRadius: "4px" }}>
                <div style={{ 
                    position: "absolute", 
                    top: `${position.top}px`, 
                    left: `${position.left}px`, 
                    width: "30px", 
                    height: "30px", 
                    background: "red",
                    transition: "0.1s"
                }}></div>
            </div>
        </div>
    );
}

export default KeyboardEvents;