function PriceTag({ originalPrice, salePrice }) {
    // Tính toán số % giảm giá (nếu có giảm)
    const discount = originalPrice > salePrice 
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) 
        : 0;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0" }}>
            {/* Giá khuyến mãi hiển thị to và nổi bật */}
            <span style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "1.1rem" }}>
                {salePrice.toLocaleString()}đ
            </span>
            
            {/* Nếu có giảm giá thì mới hiện giá gốc gạch ngang và tag giảm giá */}
            {discount > 0 && (
                <>
                    <span style={{ textDecoration: "line-through", color: "#95a5a6", fontSize: "0.9rem" }}>
                        {originalPrice.toLocaleString()}đ
                    </span>
                    <span style={{ background: "#2ecc71", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem" }}>
                        -{discount}%
                    </span>
                </>
            )}
        </div>
    );
}

export default PriceTag;