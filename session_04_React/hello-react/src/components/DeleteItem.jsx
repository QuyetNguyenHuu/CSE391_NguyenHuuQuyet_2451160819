import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    const [logMessage, setLogMessage] = useState("");
    const [recentlyDeleted, setRecentlyDeleted] = useState(null);
    const [undoTimeoutId, setUndoTimeoutId] = useState(null);
    
    function handleDelete(itemToDelete) {
        // Thử thách 3: Xác nhận trước khi xóa lẻ
        if (!window.confirm(`Bạn có chắc chắn muốn xóa ${itemToDelete.name}?`)) return;

        // Xóa sạch bộ đếm hoàn tác cũ nếu có
        if (undoTimeoutId) clearTimeout(undoTimeoutId);

        // Lưu vết phục vụ tính năng hoàn tác
        setRecentlyDeleted({ item: itemToDelete, index: items.findIndex(i => i.id === itemToDelete.id) });
        
        // Thử thách 1: Hiện dòng chữ thông báo
        setLogMessage(`🗑️ Đã xóa ${itemToDelete.name}`);
        setItems(items.filter(item => item.id !== itemToDelete.id));

        // Thử thách 2: Nút hoàn tác biến mất sau 5 giây
        const timeout = setTimeout(() => {
            setRecentlyDeleted(null);
            setLogMessage("");
        }, 5000);
        setUndoTimeoutId(timeout);
    }

    function handleUndo() {
        if (!recentlyDeleted) return;
        
        const updatedItems = [...items];
        // Chèn lại đúng vị trí cũ trong danh sách
        updatedItems.splice(recentlyDeleted.index, 0, recentlyDeleted.item);
        
        setItems(updatedItems);
        setRecentlyDeleted(null);
        setLogMessage("↩️ Đã hoàn tác thành công!");
        if (undoTimeoutId) clearTimeout(undoTimeoutId);
    }
    
    return (
        <div>
            <h3>Bài 6.3 — Xóa phần tử (DELETE)</h3>
            
            {logMessage && (
                <p style={{ color: "#e74c3c", margin: "5px 0" }}>
                    {logMessage} 
                    {/* Thử thách 2: Nút hoàn tác trong 5 giây */}
                    {recentlyDeleted && <button onClick={handleUndo} style={{ marginLeft: "10px", background: "#f39c12", color: "white", border: "none", padding: "2px 6px", cursor: "pointer" }}>Hoàn tác ↩️</button>}
                </p>
            )}

            {items.length === 0 ? (
                <p>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ margin: "5px 0" }}>
                        <span style={{ marginRight: "15px" }}>{item.name}</span>
                        <button onClick={() => handleDelete(item)}>Xóa</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItem;