/**
 * Hàm tính toán và in hóa đơn nhà hàng chi tiết
 * @param {Array} items - Danh sách món ăn [{ name: "Tên", price: 65000, quantity: 2 }]
 * @param {boolean} includeTip - Có tính 5% tip hay không (Mặc định: false)
 * @param {number} customDay - Ép lịch ngày cụ thể để test (0: Chủ Nhật, 3: Thứ Tư,..., Mặc định: dùng ngày hiện tại)
 */
function printRestaurantBill(items, includeTip = false, customDay = null) {
    // 1. Tính tổng tiền gốc (Chưa giảm giá, thuế, tip)
    let subTotal = 0;
    for (let i = 0; i < items.length; i++) {
        subTotal += items[i].price * items[i].quantity;
    }

    // 2. Xác định phần trăm giảm giá theo giá trị hóa đơn
    let discountPercent = 0;
    if (subTotal > 1000000) {
        discountPercent = 15;
    } else if (subTotal > 500000) {
        discountPercent = 10;
    }

    // 3. Kiểm tra nếu là ngày Thứ Tư (Wednesday -> getDay() === 3) thì giảm thêm 5%
    // Sử dụng ngày hệ thống trừ khi có ngày truyền vào để test
    let currentDay = (customDay !== null) ? customDay : new Date().getDay();
    if (currentDay === 3) {
        discountPercent += 5;
    }

    // 4. Tính toán các chi phí chi tiết
    let discountAmount = (subTotal * discountPercent) / 100;
    let totalAfterDiscount = subTotal - discountAmount;

    let vatAmount = (totalAfterDiscount * 8) / 100;
    let tipAmount = includeTip ? (totalAfterDiscount * 5) / 100 : 0;

    let finalTotal = totalAfterDiscount + vatAmount + tipAmount;

    // ==========================================================
    // 5. ĐỊNH DẠNG VÀ IN HÓA ĐƠN (Căn chỉnh khung 54 ký tự)
    // ==========================================================
    const WIDTH = 54; // Độ rộng cố định của khung hóa đơn

    // Hàm bổ trợ: Định dạng số thành chuỗi tiền tệ việt nam (ví dụ: 130.000đ hoặc 130k)
    function formatCurrency(amount, useK = false) {
        let str = Math.round(amount).toString();
        // Thêm dấu chấm phân cách hàng nghìn bằng regex đơn giản
        str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return useK ? str + "k" : str + "đ";
    }

    // Hàm bổ trợ: Tạo một dòng có viền hai bên ║ và căn đều khoảng trống ở giữa
    function makeRow(leftText, rightText = "") {
        let spaceNeeded = WIDTH - 4 - leftText.length - rightText.length;
        if (spaceNeeded < 0) spaceNeeded = 0;
        return "║ " + leftText + " ".repeat(spaceNeeded) + rightText + " ║";
    }

    console.log("╔" + "═".repeat(WIDTH - 2) + "╗");

    // Tiêu đề (Căn giữa)
    let title = "HÓA ĐƠN NHÀ HÀNG";
    let padTitle = " ".repeat(Math.floor((WIDTH - 2 - title.length) / 2));
    console.log("║" + padTitle + title + " ".repeat(WIDTH - 2 - title.length - padTitle.length) + "║");

    console.log("╠" + "═".repeat(WIDTH - 2) + "╣");

    // In danh sách món ăn
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemCost = item.price * item.quantity;

        // Định dạng cột trái: "1. Phở bò      x2    @65k"
        let noStr = `${i + 1}. `.padEnd(3);
        let nameStr = item.name.padEnd(14);
        let qtyStr = `x${item.quantity}`.padEnd(6);
        let priceStr = `@${formatCurrency(item.price / 1000, true)}`.padEnd(6);
        let leftSide = noStr + nameStr + qtyStr + priceStr;

        // Định dạng cột phải: "= 130k"
        let rightSide = `= ${formatCurrency(itemCost / 1000, true)}`;

        console.log(makeRow(leftSide, rightSide));
    }

    console.log("╠" + "═".repeat(WIDTH - 2) + "╣");

    // In phần tính toán tổng hợp
    console.log(makeRow("Tổng cộng:", formatCurrency(subTotal)));
    console.log(makeRow(`Giảm giá (${discountPercent}%):`, formatCurrency(discountAmount)));
    console.log(makeRow("VAT (8%):", formatCurrency(vatAmount)));
    console.log(makeRow(`Tip (${includeTip ? "5%" : "0%"}):`, formatCurrency(tipAmount)));

    console.log("╠" + "═".repeat(WIDTH - 2) + "╣");

    // In tổng thanh toán chung cuộc
    console.log(makeRow("THANH TOÁN:", formatCurrency(finalTotal)));

    console.log("╚" + "═".repeat(WIDTH - 2) + "╝");
}


// ==========================================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================================

// Bộ dữ liệu món ăn 1 (Tổng < 500k, giống mẫu yêu cầu)
const order1 = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

// Bộ dữ liệu món ăn 2 (Tổng > 1 triệu để test mốc giảm 15%)
const order2 = [
    { name: "Lẩu Hải Sản", price: 450000, quantity: 2 },
    { name: "Bò Mỹ nướng", price: 250000, quantity: 1 },
    { name: "Nước ngọt", price: 15000, quantity: 4 }
];

console.log("TEST CASE 1: Hóa đơn thường, có tính Tip");
printRestaurantBill(order1, true, 4); // Chạy ngày thứ 5 (Không được giảm thêm 5%)

console.log("\nTEST CASE 2: Hóa đơn khủng (> 1 triệu) chạy đúng ngày Thứ Tư (Giảm 15% + 5% = 20%)");
printRestaurantBill(order2, false, 3); // Ép ngày thứ 3 (Thứ Tư) để test giảm thêm