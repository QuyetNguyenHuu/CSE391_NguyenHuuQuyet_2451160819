// 1. pipe() — Nối chuỗi functions (Chạy từ trái qua phải)
function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị khởi tạo ban đầu (input)
    return function (initialValue) {
        // Dùng reduce để luân chuyển kết quả từ hàm này sang hàm tiếp theo
        return fns.reduce((currentValue, currentFn) => currentFn(currentValue), initialValue);
    };
}

// 2. memoize() — Caching kết quả đầu ra dựa trên tham số đầu vào

function memoize(fn) {
    // Khởi tạo một object cache private nhờ cơ chế Closure
    const cache = {};

    return function (...args) {
        // Biến mảng các tham số đầu vào thành một chuỗi key duy nhất để lưu trữ
        const key = JSON.stringify(args);

        // Nếu đã có trong kho lưu trữ, lập tức trả về kết quả cũ
        if (key in cache) {
            return cache[key];
        }

        // Nếu chưa có, thực thi hàm gốc và lưu lại kết quả vào cache
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// 3. debounce() — Trì hoãn thực thi hàm cho tới khi người dùng ngừng thao tác

function debounce(fn, delay) {
    let timeoutId = null;

    return function (...args) {
        // Mỗi khi hàm được kích hoạt, lập tức xóa bộ đếm thời gian cũ
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập một bộ đếm thời gian mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 4. retry() — Tự động thực thi lại hàm bất đồng bộ khi gặp lỗi

async function retry(fn, maxAttempts = 3) {
    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Thử thực thi hàm (sử dụng await vì đây là hàm bất đồng bộ)
            return await fn();
        } catch (error) {
            lastError = error;
            console.warn(`⚠️ Lần thử ${attempt} thất bại: ${error.message || error}`);

            // Nếu đã chạm mốc giới hạn, thoát vòng lặp để ném lỗi ra ngoài
            if (attempt === maxAttempts) break;
        }
    }

    // Ném lỗi cuối cùng ra ngoài nếu tất cả các lần thử đều thất bại
    throw new Error(`❌ Đã thử lại ${maxAttempts} lần nhưng vẫn thất bại. Lỗi gốc: ${lastError.message || lastError}`);
}

// CHẠY KIỂM THỬ (TEST CASES)

// --- Test 1: pipe() ---
console.log("=== TEST 1: PIPE ===");
const processPipe = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(processPipe(5)); //  OUTPUT: "Kết quả: 20"


// --- Test 2: memoize() ---
console.log("\n=== TEST 2: MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán nặng...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("Lượt gọi thứ 1:", expensiveCalc(1000000));
// OUTPUT: In ra "Đang tính toán nặng..." rồi trả về kết quả 499999500000

console.log("Lượt gọi thứ 2:", expensiveCalc(1000000));
// OUTPUT: Trả về thẳng kết quả từ cache (KHÔNG in ra dòng chữ "Đang tính toán nặng...")


// --- Test 3: debounce() ---
console.log("\n=== TEST 3: DEBOUNCE ===");
const search = debounce((query) => {
    console.log("🚀 Gọi API Tìm kiếm cho từ khóa:", query);
}, 500);

// Mô phỏng người dùng gõ phím liên tục: "j", "ja", "jav", "javas", "javascript"
search("j");
search("ja");
search("jav");
search("javas");
setTimeout(() => search("javascript"), 100);

// KỲ VỌNG: Chỉ duy nhất một log " Gọi API Tìm kiếm cho từ khóa: javascript" xuất hiện sau đó ~500ms.


// --- Test 4: retry() ---
// Mô phỏng một hàm API không ổn định (Tỷ lệ lỗi 70%)
const unstableAPI = (() => {
    let count = 0;
    return async () => {
        count++;
        if (count < 3) {
            throw new Error("Lỗi kết nối mạng thất thường!");
        }
        return "✨ Dữ liệu tải về thành công!";
    };
})();

setTimeout(async () => {
    console.log("\n=== TEST 4: RETRY ===");
    try {
        const data = await retry(unstableAPI, 4);
        console.log("Kết quả nhận được từ retry:", data);
    } catch (err) {
        console.error(err.message);
    }
}, 1000); // Trì hoãn 1s để tránh log lộn xộn với hàm debounce phía trên