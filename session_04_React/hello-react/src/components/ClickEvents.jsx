import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [bgColor, setBgColor] = useState("#34495e");
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    function handleRandomColor() {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        setBgColor(randomColor);
        setMessage("Đã đổi màu sang " + randomColor);
    }

    return (
        <div>
            <h3>Bài 5.1 — Click Events</h3>
            <p>Trạng thái: {message}</p>

            {/* Thử thách 1: Đổi màu ngẫu nhiên */}
            <div style={{ width: "100px", height: "100px", backgroundColor: bgColor, transition: "0.3s", margin: "10px 0" }}></div>
            <button onClick={handleRandomColor}>Đổi màu ngẫu nhiên</button>

            {/* Thử thách 2: Đếm click riêng biệt */}
            <div style={{ margin: "10px 0" }}>
                <button onClick={() => setCountA(countA + 1)}>Nút A ({countA})</button>
                <button onClick={() => setCountB(countB + 1)}>Nút B ({countB})</button>
            </div>

            {/* Thử thách 3: Nút Like toggle */}
            <button onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
        </div>
    );
}

export default ClickEvents;