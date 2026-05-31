import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
    }
    
    function saveEdit() {
        // Thử thách 2: Chống lưu chuỗi trống
        if (editName.trim() === "" || editAge === "") {
            alert("Tên và tuổi không được để trống!");
            return;
        }
        
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));
        
        setEditingId(null);

        // Thử thách 3: Hiện chữ thông báo thành công
        setSuccessMessage("💾 Đã lưu thay đổi!");
        setTimeout(() => setSuccessMessage(""), 2000);
    }
    
    return (
        <div>
            <h3>Bài 6.4 — Sửa phần tử (UPDATE)</h3>
            {successMessage && <p style={{ color: "green", margin: "5px 0" }}>{successMessage}</p>}
            
            {items.map(item => (
                <div key={item.id} style={{ margin: "8px 0" }}>
                    {editingId === item.id ? (
                        <div>
                            {/* Thử thách 1: Highlight viền ô sửa bằng borderColor đỏ/xanh tùy biến */}
                            <input 
                                value={editName} 
                                onChange={(e) => setEditName(e.target.value)}
                                style={{ border: "2px solid #3498db", outline: "none", padding: "2px" }}
                                autoFocus
                            />
                            <input 
                                type="number" 
                                value={editAge} 
                                onChange={(e) => setEditAge(e.target.value)}
                                style={{ border: "2px solid #3498db", width: "50px", marginLeft: "5px" }}
                            />
                            <button onClick={saveEdit} style={{ marginLeft: "5px" }}>Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ marginLeft: "3px" }}>Hủy</button>
                        </div>
                    ) : (
                        <div>
                            <span>{item.name} - {item.age} tuổi </span>
                            <button onClick={() => startEdit(item)}>✏️ Sửa</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;