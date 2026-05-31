import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import UserCard from "./components/UserCard"; // Import UserCard mới tạo

function App() {
    // Data sản phẩm cũ
    const products = [
        { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
        { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" }
    ];

    // Data danh sách User cho Thử thách 3
    const users = [
        { id: 1, name: "Nguyễn Văn Minh", email: "minh.nv@gmail.com", avatar: "https://i.pravatar.cc/150?img=11" },
        { id: 2, name: "Lê Thị An", email: "an.lt@gmail.com", avatar: "https://i.pravatar.cc/150?img=20" },
        { id: 3, name: "Trần Hoàng Linh", email: "linh.th@gmail.com", avatar: "https://i.pravatar.cc/150?img=33" }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            
            <main style={{ flex: 1, padding: "20px" }}>
                {/* Phần Sản Phẩm */}
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Cửa hàng điện thoại</h2>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>

                <hr style={{ margin: "40px 0", border: "0", borderTop: "1px dashed #ccc" }} />

                {/* Phần Thử Thách 3: Hiển thị 3 UserCard */}
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Thành viên tích cực</h2>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {users.map(user => (
                        <UserCard 
                            key={user.id}
                            name={user.name}
                            email={user.email}
                            avatar={user.avatar}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;