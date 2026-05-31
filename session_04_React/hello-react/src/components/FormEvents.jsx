import { useState } from "react";

function FormEvents() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Xử lý lỗi realtime (Thử thách 1 & 3)
    const emailError = email !== "" && !email.includes("@") ? "Email phải bao gồm ký tự '@'" : "";
    const passwordError = confirmPassword !== "" && password !== confirmPassword ? "Mật khẩu xác nhận không trùng khớp!" : "";

    function handleSubmit(event) {
        event.preventDefault(); // Ngăn hành vi reload trang mặc định

        if (!name || !email || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ các trường thông tin!");
            return;
        }

        if (emailError || passwordError) {
            alert("Vui lòng sửa các lỗi dữ liệu trước khi gửi form!");
            return;
        }

        setIsSubmitted(true);
    }

    return (
        <div>
            <h3>Bài 5.4 — Form Events</h3>
            
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Tên: </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <label>Email: </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p style={{ color: "red", margin: 0, fontSize: "12px" }}>{emailError}</p>}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <label>Mật khẩu: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <label>Nhập lại mật khẩu: </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {passwordError && <p style={{ color: "red", margin: 0, fontSize: "12px" }}>{passwordError}</p>}
                    </div>
                    <button type="submit" style={{ marginTop: "10px" }}>Đăng ký form</button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "10px", marginTop: "10px" }}>
                    <p>✅ Đăng ký form thành công! (Trang không bị reload)</p>
                    <button onClick={() => { setIsSubmitted(false); setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); }}>Gửi lại form</button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;