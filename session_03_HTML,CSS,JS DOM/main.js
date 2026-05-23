// 1. Khởi tạo & Lấy các phần tử DOM cần thiết
const modal = document.getElementById('modalStudent');
const btnThem = document.getElementById('btnThem');
const btnCloseHeader = document.querySelector('.btn-close');
const btnCloseFooter = document.querySelector('.btn-close-footer');
const modalTitle = document.getElementById('modal-title');
const editIndexInput = document.getElementById('edit-index');
const formStudent = document.getElementById('form-student');

// Mảng dữ liệu mẫu ban đầu nếu localStorage chưa có gì
const defaultStudents = [
    { maSV: "SV001", hoTen: "Nguyễn Văn A", ngaySinh: "2004-05-15", lop: "CNTT1", diemTB: 8.5, email: "vanganuyen@email.com" },
    { maSV: "SV002", hoTen: "Trần Thị B", ngaySinh: "2004-09-22", lop: "CNTT2", diemTB: 7.8, email: "btran@email.com" },
    { maSV: "SV003", hoTen: "Lê Hoàng C", ngaySinh: "2003-11-03", lop: "ATTT", diemTB: 6.9, email: "clehoang@email.com" },
    { maSV: "SV004", hoTen: "Phạm Minh D", ngaySinh: "2004-01-18", lop: "KHMT", diemTB: 9.2, email: "dpham@email.com" },
    { maSV: "SV005", hoTen: "Vũ Thùy E", ngaySinh: "2004-07-30", lop: "DTVT", diemTB: 8.0, email: "evuthuy@email.com" }
];

// Đọc dữ liệu từ localStorage, nếu không có thì lấy mảng mặc định
let students = JSON.parse(localStorage.getItem('students')) || defaultStudents;
if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(students));
}

// 2. Các hàm xử lý giao diện (Đóng/Mở Modal, Render Bảng, Thống kê)

// Định dạng hiển thị ngày từ YYYY-MM-DD sang DD/MM/YYYY
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Hàm render danh sách sinh viên ra bảng dữ liệu
function renderTable() {
    const tbody = document.getElementById('list-students');
    tbody.innerHTML = ''; // Xóa sạch dữ liệu cũ

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Danh sách sinh viên trống.</td></tr>`;
        updateStatistics();
        return;
    }

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.maSV}</td>
            <td>${student.hoTen}</td>
            <td>${formatDate(student.ngaySinh)}</td>
            <td>${student.lop}</td>
            <td>${student.diemTB.toFixed(1)}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn bg-gray" onclick="editStudent(${index})">Sửa</button> 
                <button class="btn bg-red" onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateStatistics();
}

// Hàm tính toán và cập nhật khu vực thống kê
function updateStatistics() {
    const totalStudents = students.length;
    let averageScore = 0;

    if (totalStudents > 0) {
        const sum = students.reduce((acc, curr) => acc + curr.diemTB, 0);
        averageScore = sum / totalStudents;
    }

    document.getElementById('total-students').textContent = totalStudents;
    document.getElementById('average-score').textContent = averageScore.toFixed(1);
}

// Hàm xóa toàn bộ thông báo lỗi cũ trên form
function clearErrors() {
    document.getElementById('error-ma-sv').textContent = '';
    document.getElementById('error-ho-ten').textContent = '';
    document.getElementById('error-ngay-sinh').textContent = '';
    document.getElementById('error-lop').textContent = '';
    document.getElementById('error-diem-tb').textContent = '';
    document.getElementById('error-email').textContent = '';
    document.getElementById('js-success').textContent = '';
}

// Hàm mở modal (Chế độ Thêm mới)
btnThem.addEventListener('click', () => {
    modalTitle.textContent = "Thêm sinh viên";
    editIndexInput.value = ""; // Reset index edit về rỗng
    formStudent.reset();       // Xóa trắng toàn bộ input
    document.getElementById('ma-sv').disabled = false; // Mở khóa trường Mã SV
    clearErrors();
    modal.classList.add('active');
});

// Hàm đóng modal
const closeModal = () => {
    modal.classList.remove('active');
};

btnCloseHeader.addEventListener('click', closeModal);
btnCloseFooter.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// 3. Các hàm chức năng chính (Sửa, Xóa, Lưu dữ liệu)

// Chức năng nạp dữ liệu cũ lên form khi nhấn nút "Sửa"
window.editStudent = function(index) {
    clearErrors();
    modalTitle.textContent = "Cập nhật sinh viên";
    editIndexInput.value = index; // Lưu vị trí index cần sửa lại

    const student = students[index];
    
    // Gán thông tin cũ vào các trường input
    document.getElementById('ma-sv').value = student.maSV;
    document.getElementById('ma-sv').disabled = true; // Khóa trường mã SV không cho sửa bừa bãi
    document.getElementById('ho-ten').value = student.hoTen;
    document.getElementById('ngay-sinh').value = student.ngaySinh;
    document.getElementById('lop').value = student.lop;
    document.getElementById('diem-tb').value = student.diemTB;
    document.getElementById('email').value = student.email;

    modal.classList.add('active'); // Mở form popup
};

// Chức năng Xóa sinh viên kèm thông báo xác nhận
window.deleteStudent = function(index) {
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[index].hoTen} không?`);
    if (confirmDelete) {
        students.splice(index, 1); // Xóa phần tử khỏi mảng
        localStorage.setItem('students', JSON.stringify(students)); // Đồng bộ localStorage
        renderTable(); // Cập nhật lại giao diện
    }
};

// Sự kiện submit form xử lý cả Thêm mới và Cập nhật dữ liệu
formStudent.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    // Lấy các phần tử ô nhập liệu
    const maSV = document.getElementById('ma-sv');
    const hoTen = document.getElementById('ho-ten');
    const ngaySinh = document.getElementById('ngay-sinh');
    const lop = document.getElementById('lop');
    const diemTB = document.getElementById('diem-tb');
    const email = document.getElementById('email');

    // Reset lại toàn bộ thông báo lỗi trước khi kiểm tra lại
    clearErrors();

    // --- LOGIC VALIDATE FORM ---
    // Kiểm tra Mã SV (Chỉ validate trùng lặp khi ở chế độ THÊM MỚI)
    if (maSV.value.trim().length < 3) {
        isValid = false;
        document.getElementById('error-ma-sv').textContent = 'Mã sinh viên phải có ít nhất 3 ký tự.';
    } else if (editIndexInput.value === "") {
        const isExist = students.some(item => item.maSV.toUpperCase() === maSV.value.trim().toUpperCase());
        if (isExist) {
            isValid = false;
            document.getElementById('error-ma-sv').textContent = 'Mã sinh viên này đã tồn tại trên hệ thống.';
        }
    }

    // Kiểm tra họ tên
    if (hoTen.value.trim().length < 5) {
        isValid = false;
        document.getElementById('error-ho-ten').textContent = 'Họ tên phải có ít nhất 5 ký tự.';
    }

    // Kiểm tra ngày sinh
    if (ngaySinh.value === '') {
        isValid = false;
        document.getElementById('error-ngay-sinh').textContent = 'Ngày sinh là bắt buộc.';
    }

    // Kiểm tra lớp học
    if (lop.value.trim() === '') {
        isValid = false;
        document.getElementById('error-lop').textContent = 'Lớp học là bắt buộc.';
    }

    // Kiểm tra điểm trung bình
    let diemValue = parseFloat(diemTB.value);
    if (diemTB.value === '') {
        isValid = false;
        document.getElementById('error-diem-tb').textContent = 'Điểm trung bình là bắt buộc.';
    } else if (isNaN(diemValue) || diemValue < 0 || diemValue > 10) {
        isValid = false;
        document.getElementById('error-diem-tb').textContent = 'Điểm trung bình phải là số từ 0 đến 10.';
    }

    // Kiểm tra Email bằng biểu thức Regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        isValid = false;
        document.getElementById('error-email').textContent = 'Email không hợp lệ.';
    }

    // --- LƯU HOẶC SỬA DỮ LIỆU KHI FORM HỢP LỆ ---
    if (isValid) {
        // Tạo đối tượng dữ liệu sinh viên thu thập được từ form
        const studentData = {
            maSV: maSV.value.trim().toUpperCase(),
            hoTen: hoTen.value.trim(),
            ngaySinh: ngaySinh.value,
            lop: lop.value.trim().toUpperCase(),
            diemTB: parseFloat(diemTB.value),
            email: email.value.trim()
        };

        const editIndex = editIndexInput.value;

        if (editIndex !== "") {
            // Trường hợp: Cập nhật thông tin sinh viên đã tồn tại
            students[editIndex] = studentData;
            document.getElementById('js-success').textContent = 'Cập nhật thông tin thành công!';
        } else {
            // Trường hợp: Thêm mới hoàn toàn một sinh viên
            students.push(studentData);
            document.getElementById('js-success').textContent = 'Đã thêm mới sinh viên thành công!';
        }

        // Lưu mảng dữ liệu mới xuống localStorage dữ trữ trên trình duyệt
        localStorage.setItem('students', JSON.stringify(students));
        
        // Vẽ lại bảng và số liệu thống kê mới
        renderTable();

        // Đợi 1 giây hiển thị dòng thông báo thành công rồi đóng form popup
        setTimeout(() => {
            closeModal();
        }, 1000);
    }
});

// Chạy hàm render bảng ngay khi tải trang xong để người dùng nhìn thấy dữ liệu
renderTable();