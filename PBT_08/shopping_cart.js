function createCart() {
    // Private data - Dữ liệu bảo mật chỉ có thể truy cập qua các hàm closure bên dưới
    let items = [];
    let currentDiscountCode = null;

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;

            // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Sử dụng spread operator để copy thuộc tính sản phẩm và thêm quantity
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền (sau khi đã áp dụng mã giảm giá nếu có)
        getTotal() {
            // Tính tổng tiền gốc trước khi giảm giá
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Áp dụng các luật giảm giá dựa trên biến private currentDiscountCode
            switch (currentDiscountCode) {
                case "SALE10":
                    return subTotal * 0.9;
                case "SALE20":
                    return subTotal * 0.8;
                case "FREESHIP":
                    const priceAfterFreeship = subTotal - 30000;
                    return priceAfterFreeship < 0 ? 0 : priceAfterFreeship;
                default:
                    return subTotal;
            }
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscountCode = code;
                console.log(`🎉 Áp dụng mã [${code}] thành công!`);
            } else {
                console.log(`❌ Mã giảm giá [${code}] không hợp lệ.`);
            }
        },

        // 6. In giỏ hàng dạng bảng chuẩn đẹp
        printCart() {
            console.log("┌─────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm           │ SL │ Đơn giá      │ Tổng           │");
            console.log("├───┼────────────────────┼────┼──────────────┼────────────────┤");

            let rawSubTotal = 0;
            items.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                rawSubTotal += itemTotal;

                // Định dạng chuỗi để căn lề bảng một cách thủ công và sạch đẹp
                const stt = String(index + 1).padEnd(1);
                const name = item.name.padEnd(18);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString("vi-VN").padStart(12);
                const total = itemTotal.toLocaleString("vi-VN").padStart(14);

                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });

            console.log("├─────────────────────────────────────────────────────────────┤");

            // Nếu có mã giảm giá thì in thêm thông tin giảm giá
            if (currentDiscountCode) {
                const finalTotal = this.getTotal();
                const discountAmount = rawSubTotal - finalTotal;
                console.log(`│ Tạm tính: ${rawSubTotal.toLocaleString("vi-VN").padStart(46)}đ │`);
                console.log(`│ Giảm giá (${currentDiscountCode}): -${discountAmount.toLocaleString("vi-VN").padStart(39)}đ │`);
                console.log("├─────────────────────────────────────────────────────────────┤");
            }

            const finalPay = this.getTotal().toLocaleString("vi-VN");
            console.log(`│ Tổng cộng tiền cần thanh toán: ${finalPay.padStart(25)}đ │`);
            console.log("└─────────────────────────────────────────────────────────────┘");
        },

        // 7. Lấy tổng số sản phẩm (tổng các thuộc tính quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },

        // 8. Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            currentDiscountCode = null;
            console.log("🧹 Đã làm sạch giỏ hàng.");
        }
    };
}

const cart = createCart();

// Thêm các sản phẩm test
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng ID 1 → Tăng số lượng lên 2

// In giỏ hàng lần 1 (Chưa giảm giá)
console.log("\n=== GIỎ HÀNG CHƯA GIẢM GIÁ ===");
cart.printCart();

// Áp dụng mã giảm giá và in lại
console.log("\n=== ÁP DỤNG MÃ GIẢM GIÁ ===");
cart.applyDiscount("SALE10");
cart.printCart();

// Kiểm tra số lượng sản phẩm tổng
console.log("\n=== KIỂM TRA SỐ LƯỢNG ===");
console.log("Số SP hiện tại trong giỏ (Kỳ vọng: 4):", cart.getItemCount()); // → 4

// Thử nghiệm xóa một sản phẩm khỏi giỏ hàng
cart.removeItem(3); // Xóa AirPods Pro (có lượng là 2)
console.log("Sau khi xóa sản phẩm ID 3 (Kỳ vọng: 2):", cart.getItemCount()); // → 2

// In lại giỏ hàng sau cùng để kiểm tra trực quan
console.log("\n=== GIỎ HÀNG SAU KHI XÓA ID 3 ===");
cart.printCart();