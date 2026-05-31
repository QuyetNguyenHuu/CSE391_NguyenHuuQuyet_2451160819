import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    
    // Thử thách 3: Dùng useRef để điều khiển DOM focus
    const inputRef = useRef(null);
    
    function handleAdd() {
        // Thử thách 1: Chống thêm tên trống
        if (newName.trim() === "") {
            alert("Tên môn học không được để trống!");
            return;
        }
        
        const newItem = {
            id: Date.now(),
            name: newName.trim()
        };
        
        setItems([...items, newItem]);
        setNewName("");
        
        // Thử thách 2: Hiển thị thông báo thành công trong 2 giây
        setAlertMessage("🎉 Đã thêm thành công!");
        setTimeout(() => setAlertMessage(""), 2000);

        // Thử thách 3: Tự động focus lại ô input
        inputRef.current.focus();
    }
    
    return (
        <div>
            <h3>Bài 6.2 — Thêm phần tử (CREATE)</h3>
            
            <input 
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="Nhập tên môn học..."
            />
            <button onClick={handleAdd} style={{ marginLeft: "5px" }}>➕ Thêm</button>
            
            {alertMessage && <p style={{ color: "green", margin: "5px 0 0 0", fontSize: "14px" }}>{alertMessage}</p>}
            
            <h4>Danh sách ({items.length} môn):</h4>
            {items.map(item => (
                <div key={item.id} style={{ borderBottom: "1px solid #eee", padding: "4px 0" }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default CreateItem;