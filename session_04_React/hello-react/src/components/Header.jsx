function Header() {
    return (
        <header style={{
            background: "#2c3e50",
            color: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "between",
            alignItems: "center"
        }}>
            <h1 style={{ margin: 0, fontSize: "24px" }}>TechStore</h1>
            <nav style={{ display: "flex", gap: "20px" }}>
                <a href="/" style={{ color: "white", textDecoration: "none" }}>Trang chủ</a>
                <a href="/products" style={{ color: "white", textDecoration: "none" }}>Sản phẩm</a>
                <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Liên hệ</a>
            </nav>
        </header>
    );
}

export default Header;