import { useState } from "react";

function AdvancedForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // States quản lý trạng thái hiển thị (Boolean)
    const [showPassword, setShowPassword] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    // Kiểm tra tính hợp lệ của email đơn giản
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", fontFamily: "Arial" }}>
            <h2>Giao diện Tương tác Cao</h2>
            
            {/* 1. Ô nhập tên + Đếm số ký tự */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block" }}>Tên của bạn:</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 100))} // Giới hạn max 100 ký tự
                    placeholder="Nhập tên..."
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
                <span style={{ fontSize: "12px", color: "#7f8c8d" }}>{name.length}/100 ký tự</span>
            </div>

            {/* 2. Ô nhập Email + Kiểm tra hợp lệ */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block" }}>Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
                {email && (
                    <span style={{ fontSize: "12px", color: isEmailValid ? "#2ecc71" : "#e74c3c" }}>
                        {isEmailValid ? "✅ Email hợp lệ" : "❌ Email thiếu ký tự '@'"}
                    </span>
                )}
            </div>

            {/* 3. Ô nhập mật khẩu + Nút ẩn/hiện (Kết hợp Chuỗi & Boolean) */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block" }}>Mật khẩu:</label>
                <div style={{ display: "flex" }}>
                    <input 
                        type={showPassword ? "text" : "password"} // Thay đổi type dựa trên state boolean
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{ flex: 1, padding: "8px" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "👁️ Ẩn" : "👁️ Hiện"}
                    </button>
                </div>
            </div>

            <hr/>

            {/* 4. Thử thách Accordion */}
            <div style={{ border: "1px solid #ddd", borderRadius: "4px", marginBottom: "15px" }}>
                <div 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{ background: "#f1c40f", padding: "10px", cursor: "pointer", fontWeight: "bold" }}
                >
                    {isAccordionOpen ? "🔽 Điều khoản sử dụng (Đóng)" : "▶️ Điều khoản sử dụng (Mở)"}
                </div>
                {isAccordionOpen && (
                    <div style={{ padding: "10px", fontSize: "14px", background: "#f9f9f9" }}>
                        Vui lòng không sử dụng mã nguồn này cho mục đích spam. Chúc bạn học React vui vẻ!
                    </div>
                )}
            </div>

            {/* 5. Thử thách Công tắc Bóng đèn */}
            <div style={{ textAlign: "center", padding: "15px", background: isLightOn ? "#fffde7" : "#eaeaea", borderRadius: "8px" }}>
                <span style={{ fontSize: "40px" }}>{isLightOn ? "💡" : "🔌"}</span>
                <p>Trạng thái phòng: {isLightOn ? "Đang sáng" : "Tối thui"}</p>
                <button onClick={() => setIsLightOn(!isLightOn)}>
                    {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
                </button>
            </div>
        </div>
    );
}

export default AdvancedForm;