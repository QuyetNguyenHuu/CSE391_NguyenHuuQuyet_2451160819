/**
 * Hàm thực hiện các phép tính toán cơ bản
 * @param {any} num1 - Số thứ nhất
 * @param {string} operator - Toán tử (+, -, *, /, %, **)
 * @param {any} num2 - Số thứ hai
 * @returns {number|string} Kết quả phép tính hoặc thông báo lỗi
 */
function calculate(num1, operator, num2) {
    // 1. Kiểm tra đầu vào có phải là số hợp lệ hay không (loại trừ NaN)
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Kiểm tra toán tử và thực hiện phép tính bằng câu lệnh switch-case
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            // Xử lý edge case: Chia cho số 0
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 / num2;
        case "%":
            // Xử lý edge case: Chia lấy dư cho số 0
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 % num2;
        case "**":
            return num1 ** num2;
        default:
            // Xử lý edge case: Toán tử không nằm trong danh sách hỗ trợ
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// --- BỘ TEST CASES YÊU CẦU ---
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // → 1024

// --- TEST CASES BỔ SUNG (Đảm bảo độ tin cậy) ---
console.log(calculate(10, "%", 3));    // → 1 (Chia lấy dư)
console.log(calculate(10, "%", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(5, "-", NaN));   // → "Lỗi: Input không phải số"