import { useState } from "react";

function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    // Thử thách 3: Tính tuổi trung bình
    const averageAge = students.reduce((sum, s) => sum + s.age, 0) / students.length;

    return (
        <div>
            <h3>Bài 6.1 — Render danh sách động</h3>
            
            <h4>Danh sách trái cây</h4>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h4>Danh sách sinh viên</h4>
            {students.map((student, index) => {
                // Thử thách 2: Tuổi >= 20 hiển thị màu xanh
                const isAdult = student.age >= 20;
                return (
                    <div key={student.id} style={{ color: isAdult ? "green" : "black", margin: "4px 0" }}>
                        {/* Thử thách 1: Hiển thị STT */}
                        <strong>{index + 1}.</strong> {student.name} - {student.age} tuổi
                    </div>
                );
            })}

            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                📊 Tuổi trung bình: {averageAge.toFixed(1)} tuổi
            </p>
        </div>
    );
}

export default ListBasics;