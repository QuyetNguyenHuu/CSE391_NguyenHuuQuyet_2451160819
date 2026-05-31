// 1. DỮ LIỆU SẢN PHẨM KHỞI TẠO (13 sản phẩm, 4 categories)
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://picsum.photos/id/160/300/200", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 26490000, category: "phone", image: "https://picsum.photos/id/1/300/200", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://picsum.photos/id/0/300/200", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 32500000, category: "laptop", image: "https://picsum.photos/id/48/300/200", rating: 4.4, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 25490000, category: "tablet", image: "https://picsum.photos/id/96/300/200", rating: 4.6, inStock: true },
    { id: 6, name: "Sony WH-1000XM5", price: 6490000, category: "accessories", image: "https://picsum.photos/id/211/300/200", rating: 4.5, inStock: true },
    { id: 7, name: "Apple Watch Ultra 2", price: 21990000, category: "accessories", image: "https://picsum.photos/id/210/300/200", rating: 4.7, inStock: true },
    { id: 8, name: "Xiaomi 14 Ultra", price: 21490000, category: "phone", image: "https://picsum.photos/id/119/300/200", rating: 4.3, inStock: true },
    { id: 9, name: "Asus ROG Strix G16", price: 29990000, category: "laptop", image: "https://picsum.photos/id/180/300/200", rating: 4.6, inStock: true },
    { id: 10, name: "Samsung Galaxy Tab S9", price: 16990000, category: "tablet", image: "https://picsum.photos/id/367/300/200", rating: 4.5, inStock: true },
    { id: 11, name: "AirPods Pro Gen 2", price: 4990000, category: "accessories", image: "https://picsum.photos/id/370/300/200", rating: 4.8, inStock: false },
    { id: 12, name: "Keychron K2 Mechanical Keyboard", price: 1850000, category: "accessories", image: "https://picsum.photos/id/548/300/200", rating: 4.2, inStock: true },
    { id: 13, name: "Logitech MX Master 3S", price: 2350000, category: "accessories", image: "https://picsum.photos/id/652/300/200", rating: 4.7, inStock: true }
];

// 2. BIẾN QUẢN LÝ TRẠNG THÁI (STATE)
let cartCount = 0;
let activeCategory = "all";
let searchQuery = "";
let currentSort = "none";

// 3. KHỞI TẠO KHUNG HTML BAN ĐẦU BẰNG JAVASCRIPT
const app = document.querySelector("#app");

function buildInitialUI() {
    // Header
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Tech Catalog";
    
    const headerRight = document.createElement("div");
    headerRight.className = "header-right";

    // Cart Badge Icon
    const cartIcon = document.createElement("div");
    cartIcon.className = "cart-icon";
    cartIcon.textContent = "🛒 Giỏ hàng";
    const cartBadge = document.createElement("span");
    cartBadge.className = "cart-badge";
    cartBadge.id = "cartBadge";
    cartBadge.textContent = "0";
    cartIcon.appendChild(cartBadge);

    // Dark Mode Toggle Button
    const themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle";
    themeBtn.id = "themeToggle";
    themeBtn.textContent = "🌙 Dark Mode";
    
    headerRight.appendChild(cartIcon);
    headerRight.appendChild(themeBtn);
    header.appendChild(title);
    header.appendChild(headerRight);
    app.appendChild(header);

    // Toolbar (Search, Filter, Sort)
    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";

    const searchSortRow = document.createElement("div");
    searchSortRow.className = "search-sort-row";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.id = "searchInput";
    searchInput.placeholder = "Tìm kiếm sản phẩm theo tên...";

    const sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";
    sortSelect.id = "sortSelect";
    sortSelect.innerHTML = `
        <option value="none">Sắp xếp: Mặc định</option>
        <option value="price-asc">Giá: Thấp đến Cao</option>
        <option value="price-desc">Giá: Cao đến Thấp</option>
        <option value="name-az">Tên: A -> Z</option>
        <option value="rating-desc">Đánh giá cao nhất</option>
    `;

    searchSortRow.appendChild(searchInput);
    searchSortRow.appendChild(sortSelect);
    toolbar.appendChild(searchSortRow);

    // Categories Buttons
    const categoryFilters = document.createElement("div");
    categoryFilters.className = "category-filters";
    const cats = [
        { key: "all", label: "Tất cả" },
        { key: "phone", label: "Điện thoại" },
        { key: "laptop", label: "Laptop" },
        { key: "tablet", label: "Máy tính bảng" },
        { key: "accessories", label: "Phụ kiện" }
    ];
    cats.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `filter-btn ${cat.key === "all" ? "active" : ""}`;
        btn.dataset.category = cat.key;
        btn.textContent = cat.label;
        categoryFilters.appendChild(btn);
    });
    toolbar.appendChild(categoryFilters);
    app.appendChild(toolbar);

    // Product Grid Holder
    const grid = document.createElement("div");
    grid.className = "product-grid";
    grid.id = "productGrid";
    app.appendChild(grid);
}

// 4. CÁC HÀM XỬ LÝ LOGIC CHỨC NĂNG

// Render danh sách sản phẩm (chống XSS dùng createElement)
function renderProducts(productsToRender) {
    const grid = document.querySelector("#productGrid");
    grid.textContent = ""; // Reset grid cũ

    if (productsToRender.length === 0) {
        const noProductMsg = document.createElement("p");
        noProductMsg.textContent = "Không tìm thấy sản phẩm phù hợp.";
        noProductMsg.style.textAlign = "center";
        noProductMsg.style.width = "100%";
        grid.appendChild(noProductMsg);
        return;
    }

    productsToRender.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // Sự kiện click vào Thẻ để mở Modal (ngoại trừ khi click nút thêm giỏ hàng)
        card.addEventListener("click", (e) => {
            if (e.target.tagName !== "BUTTON") {
                openProductModal(prod);
            }
        });

        const img = document.createElement("img");
        img.className = "product-img";
        img.src = prod.image;
        img.alt = prod.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = prod.name;

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = prod.price.toLocaleString("vi-VN") + " đ";

        const meta = document.createElement("div");
        meta.className = "product-meta";
        
        const rating = document.createElement("span");
        rating.textContent = `⭐ ${prod.rating}`;

        const stock = document.createElement("span");
        stock.className = `stock-status ${prod.inStock ? "in" : "out"}`;
        stock.textContent = prod.inStock ? "Còn hàng" : "Hết hàng";

        meta.appendChild(rating);
        meta.appendChild(stock);

        const addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.textContent = prod.inStock ? "Thêm vào giỏ" : "Tạm hết hàng";
        addBtn.disabled = !prod.inStock;
        
        // Sự kiện click Thêm giỏ hàng
        addBtn.addEventListener("click", () => {
            cartCount++;
            document.querySelector("#cartBadge").textContent = cartCount;
        });

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(meta);
        info.appendChild(addBtn);

        card.appendChild(img);
        card.appendChild(info);
        grid.appendChild(card);
    });
}

// Tổng hợp filter category, search text và sort data liên mạch
function filterAndSortMaster() {
    let result = [...products];

    // 1. Filter Category
    if (activeCategory !== "all") {
        result = result.filter(p => p.category === activeCategory);
    }

    // 2. Realtime Search Text
    if (searchQuery !== "") {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Sort logic
    if (currentSort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-az") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(result);
}

// Hàm mở Modal Chi tiết Sản phẩm sinh động hoàn toàn bằng DOM JS
function openProductModal(prod) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => overlay.remove());

    const mImg = document.createElement("img");
    mImg.className = "modal-img";
    mImg.src = prod.image;

    const mName = document.createElement("h2");
    mName.textContent = prod.name;

    const mPrice = document.createElement("p");
    mPrice.className = "product-price";
    mPrice.textContent = `Giá bán: ${prod.price.toLocaleString("vi-VN")} đ`;

    const mDesc = document.createElement("p");
    mDesc.textContent = `Danh mục: ${prod.category.toUpperCase()} | Đánh giá: ${prod.rating}/5. Đây là mô tả chi tiết mẫu cho sản phẩm công nghệ cao cấp tích hợp các tính năng tương tác hiện đại nhất năm 2026.`;
    mDesc.style.lineHeight = "1.5";

    content.appendChild(closeBtn);
    content.appendChild(mImg);
    content.appendChild(mName);
    content.appendChild(mPrice);
    content.appendChild(mDesc);
    overlay.appendChild(content);

    // Click ra ngoài vùng Modal để đóng
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
}

// 5. GẮN LẮNG NGHE SỰ KIỆN ĐIỀU KHIỂN (EVENT LISTENERS)
function setupEventListeners() {
    // Realtime Search input
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        filterAndSortMaster();
    });

    // Dropdown Sort select
    const sortSelect = document.querySelector("#sortSelect");
    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        filterAndSortMaster();
    });

    // Category Filter Buttons (Sử dụng Event Delegation)
    const categoryContainer = document.querySelector(".category-filters");
    categoryContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            
            activeCategory = e.target.dataset.category;
            filterAndSortMaster();
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.querySelector("#themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            themeToggle.textContent = "🌙 Dark Mode";
        }
    });
}

// 6. KHỞI CHẠY ỨNG DỤNG LẦN ĐẦU
buildInitialUI();
setupEventListeners();
renderProducts(products);