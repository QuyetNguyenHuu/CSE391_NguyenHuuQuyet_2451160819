import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

function TodoDashboard() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    
    // Thêm việc mới
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        // Thử thách Level 1: Bổ sung mốc thời gian khởi tạo ngắn gọn
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newTodo = {
            id: Date.now(),
            text: `${inputValue.trim()} (${timeString})`,
            done: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue("");
    }
    
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }
    
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    
    // Thuật toán lọc
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });
    
    // Tính toán số liệu (Computed Values)
    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;

    // Thử thách Level 1: Thay đổi placeholder thông minh theo trạng thái bộ lọc
    let dynamicPlaceholder = "Nhập công việc cần làm...";
    if (filter === "active") dynamicPlaceholder = "Nhập việc chưa hoàn thành...";
    if (filter === "completed") dynamicPlaceholder = "Nhập việc đã làm xong...";
    
    return (
        <div style={{ maxWidth: "450px", margin: "10px 0", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff" }}>
            
            {/* Input & Button */}
            <div style={{ display: "flex", marginBottom: "15px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder={dynamicPlaceholder}
                    style={{ flex: 1, padding: "8px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px 0 0 4px" }}
                />
                <button onClick={addTodo} style={{ padding: "8px 15px", background: "#3498db", color: "white", border: "none", borderRadius: "0 4px 4px 0", cursor: "pointer" }}>
                    Thêm
                </button>
            </div>
            
            {/* Bộ lọc Tabs */}
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {/* Danh sách Tasks hiển thị điều kiện */}
            {filteredTodos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px", color: "#aaa", fontSize: "14px" }}>
                    {todos.length === 0 ? "📝 Danh sách trống hoàn toàn." : "Không tìm thấy công việc phù hợp."}
                </div>
            ) : (
                filteredTodos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))
            )}
            
            {/* Báo cáo thống kê số liệu đầu ra (Footer thống kê) */}
            {todos.length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", padding: "8px", background: "#f9f9f9", fontSize: "13px", color: "#555" }}>
                    <span>Tổng số: {todos.length} việc</span>
                    <span>Còn lại: {activeCount} | Đã xong: {completedCount}</span>
                </div>
            )}
        </div>
    );
}

export default TodoDashboard;