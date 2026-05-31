// 1. DỮ LIỆU ĐẦU VÀO (MOCK DATA)
const images = [
    { id: 1, src: "https://picsum.photos/id/10/800/400", alt: "Bờ biển phủ đầy sương mù lúc bình minh" },
    { id: 2, src: "https://picsum.photos/id/16/800/400", alt: "Con đường rừng rợp bóng cây sồi vàng" },
    { id: 3, src: "https://picsum.photos/id/28/800/400", alt: "Khu rừng thông ven núi tuyết phủ trắng xóa" },
    { id: 4, src: "https://picsum.photos/id/29/800/400", alt: "Kiến trúc mái nhà ga cổ kính tại thành phố" },
    { id: 5, src: "https://picsum.photos/id/43/800/400", alt: "Sóng biển lớn vỗ mạnh vào bờ đá gồ ghề" }
];

const commands = [
    { id: "next", text: "Chuyển sang ảnh tiếp theo", action: () => navigateGallery(1), shortcut: "→" },
    { id: "prev", text: "Quay lại ảnh phía trước", action: () => navigateGallery(-1), shortcut: "←" },
    { id: "play", text: "Bật / Tắt chế độ Slideshow tự động", action: () => toggleSlideshow(), shortcut: "Space" },
    { id: "dark", text: "Bật / Tắt chế độ tối (Dark Mode)", action: () => toggleDarkMode(), shortcut: "" },
    { id: "reset", text: "Quay về tấm ảnh đầu tiên (Ảnh số 1)", action: () => changeImage(0), shortcut: "1" }
];

// 2. BIẾN QUẢN LÝ TRẠNG THÁI (STATE)
let currentIndex = 0;
let slideshowInterval = null;
let selectedCommandIndex = 0;
let filteredCommands = [...commands];

// 3. DOM ELEMENTS
const mainImage = document.querySelector("#mainImage");
const thumbnailList = document.querySelector("#thumbnailList");
const slideshowStatus = document.querySelector("#slideshowStatus");
const commandPalette = document.querySelector("#commandPalette");
const paletteInput = document.querySelector("#paletteInput");
const paletteResults = document.querySelector("#paletteResults");

// 4. KHỞI TẠO RENDER BAN ĐẦU
function init() {
    // Xây dựng danh sách các Thumbnail bằng createElement đạt chuẩn ARIA
    images.forEach((img, index) => {
        const btn = document.createElement("button");
        btn.className = "thumb-btn";
        btn.setAttribute("role", "tab");
        btn.setAttribute("id", `thumb-${index}`);
        btn.setAttribute("aria-controls", "mainImage");
        btn.setAttribute("aria-label", `Xem hình ${index + 1}: ${img.alt}`);
        btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
        
        // Đặt thuộc tính hỗ trợ tabIndex điều hướng tuần tự phím Tab
        btn.setAttribute("tabindex", "0");

        const innerImg = document.createElement("img");
        innerImg.src = img.src.replace("800/400", "80/60"); // Dùng ảnh kích thước nhỏ hơn làm thumb
        innerImg.alt = ""; // Alt của nút bao ngoài đã giải nghĩa đầy đủ

        btn.appendChild(innerImg);
        thumbnailList.appendChild(btn);

        // Đăng ký sự kiện Click chuột thông thường
        btn.addEventListener("click", () => {
            stopSlideshow();
            changeImage(index);
        });
    });

    changeImage(0); // Hiển thị ảnh đầu tiên
}

// 5. CÁC HÀM XỬ LÝ LOGIC GALLERY
function changeImage(index) {
    currentIndex = index;
    const activeImg = images[currentIndex];
    
    // Cập nhật ảnh chính kèm thẻ text ALT mô tả cho Screen Reader đọc
    mainImage.src = activeImg.src;
    mainImage.alt = activeImg.alt;

    // Đồng bộ trạng thái aria-selected của hệ thống thẻ Thumb
    const allThumbs = document.querySelectorAll(".thumb-btn");
    allThumbs.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.setAttribute("aria-selected", "true");
        } else {
            thumb.setAttribute("aria-selected", "false");
        }
    });
}

function navigateGallery(direction) {
    let newIndex = currentIndex + direction;
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;
    changeImage(newIndex);
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        slideshowStatus.textContent = "Slideshow: ON ⏳";
        slideshowStatus.style.backgroundColor = "rgba(0, 102, 204, 0.9)";
        slideshowInterval = setInterval(() => {
            navigateGallery(1);
        }, 3000);
    }
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowStatus.textContent = "Slideshow: OFF";
        slideshowStatus.style.backgroundColor = "rgba(0,0,0,0.7)";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// 6. XỬ LÝ COMMAND PALETTE
function openCommandPalette() {
    commandPalette.classList.remove("hidden");
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    paletteInput.focus(); // Ép tiêu điểm Focus vào ô Input lập tức
    filterCommands("");
}

function closeCommandPalette() {
    commandPalette.classList.add("hidden");
    commandPalette.setAttribute("aria-hidden", "true");
    // Trả lại focus về cho nút thumbnail hiện tại để tránh mất dấu hành vi bàn phím
    document.getElementById(`thumb-${currentIndex}`).focus();
}

function filterCommands(keyword) {
    filteredCommands = commands.filter(cmd => 
        cmd.text.toLowerCase().includes(keyword.toLowerCase())
    );
    selectedCommandIndex = 0;
    renderCommandsList();
}

function renderCommandsList() {
    paletteResults.textContent = ""; // Reset danh sách cũ

    filteredCommands.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.className = "command-item";
        li.setAttribute("role", "option");
        li.setAttribute("id", `cmd-${index}`);
        li.setAttribute("aria-selected", index === selectedCommandIndex ? "true" : "false");
        
        if (index === selectedCommandIndex) {
            li.classList.add("selected");
        }

        const txtSpan = document.createElement("span");
        txtSpan.textContent = cmd.text;
        li.appendChild(txtSpan);

        if (cmd.shortcut) {
            const kbd = document.createElement("kbd");
            kbd.textContent = cmd.shortcut;
            li.appendChild(kbd);
        }

        // Bắt sự kiện click chuột trên danh sách lệnh
        li.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
        });

        paletteResults.appendChild(li);
    });
}

// 7. LẮNG NGHE VÀ QUẢN LÝ TOÀN BỘ PHÍM TẮT TOÀN CỤC (KEYBOARD EVENT LISTENERS)
document.addEventListener("keydown", (e) => {
    const isPaletteOpen = !commandPalette.classList.contains("hidden");

    // Lắng nghe tổ hợp phím [Ctrl + K] mở Command Palette ở bất kỳ đâu
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Chặn hành vi mặc định của trình duyệt
        openCommandPalette();
        return;
    }

    // BỐ TRÍ PHÍM TẮT KHI COMMAND PALETTE ĐANG MỞ
    if (isPaletteOpen) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } 
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderCommandsList();
            document.getElementById(`cmd-${selectedCommandIndex}`).scrollIntoView({ block: 'nearest' });
        } 
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommandsList();
            document.getElementById(`cmd-${selectedCommandIndex}`).scrollIntoView({ block: 'nearest' });
        } 
        else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action();
                closeCommandPalette();
            }
        }
        return; // Dừng xử lý các phím của gallery nếu đang mở palette
    }

    // BỐ TRÍ PHÍM TẮT ĐIỀU HƯỚNG SỬ DỤNG CHO GALLERY ẢNH
    if (e.key === "ArrowRight") {
        stopSlideshow();
        navigateGallery(1);
    } 
    else if (e.key === "ArrowLeft") {
        stopSlideshow();
        navigateGallery(-1);
    } 
    else if (e.key === " ") { // Phím Spacebar
        e.preventDefault(); // Ngăn trình duyệt cuộn màn hình xuống dưới
        toggleSlideshow();
    } 
    else if (e.key === "Escape") {
        stopSlideshow();
    }
    // Bắt chuỗi phím số từ 1 đến 9 nhảy nhanh đến ảnh tương ứng
    else if (e.key >= "1" && e.key <= "9") {
        const targetNum = parseInt(e.key) - 1;
        if (targetNum < images.length) {
            stopSlideshow();
            changeImage(targetNum);
        }
    }
});

// Gắn bộ lọc tìm kiếm Realtime khi gõ chữ vào ô input của bảng lệnh
paletteInput.addEventListener("input", (e) => {
    filterCommands(e.target.value.trim());
});

// KHỞI ĐỘNG ỨNG DỤNG
init();