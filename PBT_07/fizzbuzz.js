// ==========================================
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// ==========================================
function classicFizzBuzz() {
    console.log("--- RUNNING VERSION 1: CLASSIC FIZZBUZZ ---");
    for (let i = 1; i <= 100; i++) {
        // Kiểm tra chia hết cho cả 3 và 5 trước
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}


// ==========================================
// VERSION 2: CUSTOM FIZZBUZZ (ADVANCED)
// ==========================================
/**
 * Hàm in ra các số từ 1 đến n dựa trên luật (rules) truyền vào mẫu
 * @param {number} n - Số giới hạn trên cần in
 * @param {Array} rules - Mảng chứa các object luật [{ divisor: X, word: "Y" }]
 */
function customFizzBuzz(n, rules) {
    console.log(`\n--- RUNNING VERSION 2: CUSTOM FIZZBUZZ (UP TO ${n}) ---`);

    for (let i = 1; i <= n; i++) {
        let resultStr = "";

        // Duyệt qua từng quy luật trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];

            // Nếu số hiện tại chia hết cho divisor của luật đó, nối từ tương ứng vào chuỗi kết quả
            if (i % rule.divisor === 0) {
                resultStr += rule.word;
            }
        }

        // Nếu chuỗi kết quả rỗng (tức là không chia hết cho bất kỳ số nào trong rules)
        // Thì in ra chính con số đó. Ngược lại thì in chuỗi kết quả thu được.
        if (resultStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${resultStr}"`);
        }
    }
}

// ==========================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================

// 1. Chạy bản Classic (Bạn có thể bỏ comment dòng dưới nếu muốn xem log từ 1-100)
// classicFizzBuzz();

// 2. Chạy bản Custom với test case được yêu cầu
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

// Test với n = 35 để kiểm tra đầy đủ các mốc giao thoa 15, 21, 35
customFizzBuzz(35, myRules);