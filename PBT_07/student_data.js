const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

// --- KHỞI TẠO CÁC BIẾN LƯU TRỮ ĐỂ ĐẾM VÀ TÍNH TOÁN ---
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

let maxAvg = -1;
let minAvg = 11;
let bestStudent = "";
let worstStudent = "";

let totalMath = 0, totalPhysics = 0, totalCs = 0;

let totalMaleAvg = 0, countMale = 0;
let totalFemaleAvg = 0, countFemale = 0;

// --- IN TIÊU ĐỀ BẢNG KẾT QUẢ ---
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

// --- VÒNG LẶP CHÍNH: XỬ LÝ DỮ LIỆU TỪNG SINH VIÊN ---
for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình của cá nhân (Làm tròn 1 chữ số thập phân)
    let avg = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    avg = Math.round(avg * 10) / 10; // Cách làm tròn chuẩn mà không dùng toFixed (vì toFixed trả về chuỗi)

    // 2. Xếp loại và Đếm số lượng mỗi loại
    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        countTB++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    // 3. In dòng kết quả của sinh viên hiện tại ra bảng
    // Sử dụng padEnd để căn chỉnh các cột thẳng hàng như yêu cầu
    let sttStr = (i + 1).toString().padEnd(3);
    let nameStr = sv.name.padEnd(6);
    let avgStr = avg.toFixed(1).padEnd(4); // Giữ định dạng x.0 cho đẹp mắt
    let rankStr = rank.padEnd(11);
    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${rankStr} |`);

    // 4. Tìm SV có điểm TB cao nhất và thấp nhất
    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = sv.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = sv.name;
    }

    // 5. Cộng dồn điểm để tính TB môn toàn lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    // 6. Bonus: Cộng dồn điểm và đếm theo giới tính
    if (sv.gender === "M") {
        totalMaleAvg += avg;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleAvg += avg;
        countFemale++;
    }
}

console.log("---------------------------------------------\n");

// --- THỐNG KÊ KẾT QUẢ CHUNG ---

// Thống kê số lượng xếp loại
console.log("** Thống kê xếp loại:");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV\n`);

// SV cao nhất, thấp nhất
console.log("** Sinh viên xuất sắc & cần cố gắng:");
console.log(`- Điểm TB cao nhất: ${bestStudent} (${maxAvg.toFixed(1)})`);
console.log(`- Điểm TB thấp nhất: ${worstStudent} (${minAvg.toFixed(1)})\n`);

// Điểm TB môn toàn lớp
let numStudents = students.length;
let classAvgMath = Math.round((totalMath / numStudents) * 10) / 10;
let classAvgPhys = Math.round((totalPhysics / numStudents) * 10) / 10;
let classAvgCs = Math.round((totalCs / numStudents) * 10) / 10;

console.log("** Điểm trung bình môn toàn lớp:");
console.log(`- Toán: ${classAvgMath.toFixed(1)}`);
console.log(`- Vật lý: ${classAvgPhys.toFixed(1)}`);
console.log(`- Khoa học máy tính (CS): ${classAvgCs.toFixed(1)}\n`);

// Bonus: Điểm TB theo giới tính
let maleAvgScore = countMale > 0 ? Math.round((totalMaleAvg / countMale) * 10) / 10 : 0;
let femaleAvgScore = countFemale > 0 ? Math.round((totalFemaleAvg / countFemale) * 10) / 10 : 0;

console.log("** Bonus - Điểm trung bình theo giới tính:");
console.log(`- Nam (M): ${maleAvgScore.toFixed(1)}`);
console.log(`- Nữ (F): ${femaleAvgScore.toFixed(1)}`);