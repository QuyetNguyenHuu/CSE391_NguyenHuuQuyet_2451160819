import { useState } from "react";

function InputEvents() {
    const [email, setEmail] = useState("");
    const [previewText, setPreviewText] = useState("");

    // Thử thách 3: Đếm số từ (loại bỏ khoảng trắng thừa)
    const wordCount = previewText.trim() === "" ? 0 : previewText.trim().split(/\s+/).length;

    return (
        <div>
            <h3>Bài 5.2 — Input Events</h3>

            {/* Thử thách 1: Ô nhập email validation */}
            <div>
                <input 
                    type="text" 
                    placeholder="Nhập email kiểm tra..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p style={{ fontSize: "14px", color: email.includes("@") ? "green" : "red" }}>
                    {email === "" ? "" : email.includes("@") ? "Email hợp lệ" : "Email phải chứa ký tự '@'"}
                </p>
            </div>

            {/* Thử thách 2 & 3: Preview và Đếm số từ */}
            <div style={{ marginTop: "15px" }}>
                <textarea 
                    placeholder="Nhập văn bản vào đây..." 
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                />
                <p><strong>Xem trước:</strong> {previewText || "(Trống)"}</p>
                <p>Số từ đã nhập: <strong>{wordCount}</strong> từ</p>
            </div>
        </div>
    );
}

export default InputEvents;