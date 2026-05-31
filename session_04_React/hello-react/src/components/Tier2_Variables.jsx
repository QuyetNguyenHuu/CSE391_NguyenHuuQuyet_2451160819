export function SimpleVariables() {
    const name = "Minh";
    const age = 20;
    return <div><h3>Xin chào {name} ({age} tuổi)</h3></div>;
}

export function ConditionalAndLists() {
    const isOnline = true;
    const products = [
        { id: 1, name: "Sản phẩm A", price: 500000 },
        { id: 2, name: "Sản phẩm B", price: 1500000 }
    ];

    return (
        <div>
            <h3>Trạng thái: {isOnline ? "Online" : "Offline"}</h3>
            <ul>
                {products.map(p => (
                    <li key={p.id} style={{ color: p.price > 1000000 ? "red" : "black" }}>
                        {p.name} - {p.price}đ
                    </li>
                ))}
            </ul>
        </div>
    );
}