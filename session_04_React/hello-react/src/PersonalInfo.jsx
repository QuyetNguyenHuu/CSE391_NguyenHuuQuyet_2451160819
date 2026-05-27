function PersonalInfo() {
  // 1. Thông tin cá nhân
  const ten = "Nguyễn Hữu Quyết";
  const tuoi = 19;
  const queQuan = "Hà Nội";

  // 2. Tính toán hiển thị lời chào theo giờ hiện tại (Giờ hiện tại: 15h - Chiều)
  const gioHienTai = new Date().getHours();
  const loiChao =
    gioHienTai < 12
      ? "Chào buổi sáng"
      : gioHienTai < 18
        ? "Chào buổi chiều"
        : "Chào buổi tối";

  // 3. Tính chỉ số BMI (Ví dụ: 65kg, 1.72m)
  const canNang = 65;
  const chieuCao = 1.72;
  const bmi = (canNang / (chieuCao * chieuCao)).toFixed(1);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Yêu cầu 2: Lời chào theo giờ */}
      <h2>{loiChao}! 👋</h2>
      <hr />

      {/* Yêu cầu 1: Thông tin cá nhân */}
      <h3>Thông tin cá nhân</h3>
      <p>
        <b>Họ và tên:</b> {ten}
      </p>
      <p>
        <b>Tuổi:</b> {tuoi}
      </p>
      <p>
        <b>Quê quán:</b> {queQuan}
      </p>
      <hr />

      {/* Yêu cầu 3: Tính BMI */}
      <h3>Chỉ số sức khỏe</h3>
      <p>
        <b>Cân nặng:</b> {canNang} kg | <b>Chiều cao:</b> {chieuCao} m
      </p>
      <p>
        <b>Chỉ số BMI của bạn:</b> {bmi}
      </p>
      <p>
        <b>Đánh giá:</b>{" "}
        {bmi < 18.5 ? "Gầy" : bmi < 24.9 ? "Bình thường" : "Thừa cân"}
      </p>
    </div>
  );
}

export default PersonalInfo;
