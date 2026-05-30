/**
 * Hàm kích hoạt và quản lý vòng lặp trò chơi
 */
function playGame() {
    // 1. Máy tạo số ngẫu nhiên từ 1 đến 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;

    // Khởi tạo các biến quản lý trạng thái trò chơi
    const maxAttempts = 7;
    let attempts = 0;
    let guessedHistory = []; // Mảng lưu lại các số người chơi đã từng nhập
    let isWin = false;

    alert("Trò chơi bắt đầu! Hãy bấm OK để đưa ra dự đoán đầu tiên.");

    // 2. Vòng lặp quản lý lượt đoán (Chạy khi chưa hết lượt và chưa đoán trúng)
    while (attempts < maxAttempts && !isWin) {
        let remainingAttempts = maxAttempts - attempts;

        // Hiện hộp thoại bắt người dùng nhập số
        let input = prompt(`[Lượt ${attempts + 1}/${maxAttempts}] Nhập một số từ 1 đến 100:`);

        // Trường hợp user nhấn "Cancel" (Hủy bỏ trò chơi)
        if (input === null) {
            alert("Bạn đã thoát trò chơi.");
            return;
        }

        // Xử lý chuỗi nhập vào: loại bỏ khoảng trắng và chuyển sang kiểu Số
        input = input.trim();
        let userGuess = Number(input);

        // 3. VALIDATE INPUT: Kiểm tra tính hợp lệ của số vừa nhập
        // Kiểm tra trống, không phải là số, hoặc số nằm ngoài khoảng [1, 100]
        if (input === "" || Number.isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập số nguyên hợp lệ từ 1 đến 100!");
            continue; // Bỏ qua lượt này, bắt nhập lại (không bị trừ lượt đoán)
        }

        // 4. KIỂM TRA TRÙNG SỐ: Duyệt mảng lịch sử xem số này đã nhập chưa
        let isDuplicated = false;
        for (let i = 0; i < guessedHistory.length; i++) {
            if (guessedHistory[i] === userGuess) {
                isDuplicated = true;
                break; // Tìm thấy trùng thì thoát ngay vòng lặp kiểm tra
            }
        }

        if (isDuplicated) {
            alert(`Bạn đã đoán số ${userGuess} này rồi! Hãy chọn một số khác.`);
            continue; // Bỏ qua lượt này, bắt nhập lại (không bị trừ lượt đoán)
        }

        // Ghi nhận số hợp lệ vào lịch sử và tăng số lần đoán
        guessedHistory.push(userGuess)
        attempts++;

        // 5. SO SÁNH ĐÁP ÁN: Đưa ra gợi ý tương ứng
        if (userGuess === targetNumber) {
            isWin = true;
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        } else if (userGuess > targetNumber) {
            alert("Thấp hơn!");
        } else {
            alert("Cao hơn!");
        }
    }

    // 6. KẾT THÚC GAME: Kiểm tra nếu hết 7 lượt mà vẫn chưa thắng
    if (!isWin) {
        alert(`Hết lượt! Bạn đã thua cuộc. Đáp án chính xác là: ${targetNumber}`);
    }
}