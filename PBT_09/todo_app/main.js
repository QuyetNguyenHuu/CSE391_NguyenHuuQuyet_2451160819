// --- QUẢN LÝ DỮ LIỆU (STATE & LOCALSTORAGE) ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // Có 3 giá trị: 'all', 'active', 'completed'

// DOM Elements
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoFooter = document.querySelector('#todoFooter');
const todoCount = document.querySelector('#todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');

// Hàm lưu trạng thái vào LocalStorage và Render lại giao diện
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

// --- HÀM RENDER CHÍNH (Sử dụng hoàn toàn createElement chống XSS) ---
function render() {
    // 1. Xóa sạch List cũ trước khi render mới
    todoList.textContent = ''; 

    // 2. Lọc danh sách todo dựa trên filter hiện tại
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // 'all'
    });

    // 3. Tạo các element bằng createElement (Không dùng innerHTML)
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add('completed');
        }

        // Tạo phần Text Label hiển thị tên Todo
        const label = document.createElement('label');
        label.textContent = todo.text; // An toàn tuyệt đối chống XSS

        // Tạo nút Xóa ❌
        const destroyBtn = document.createElement('button');
        destroyBtn.className = 'destroy';
        destroyBtn.textContent = '×';

        // Tạo Input ẩn phục vụ cho tính năng Edit dblclick
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        // Gắn con vào thẻ Cha
        li.appendChild(label);
        li.appendChild(destroyBtn);
        li.appendChild(editInput);
        
        todoList.appendChild(li);
    });

    // 4. Cập nhật Footer (Đếm số item còn lại & Ẩn hiện footer)
    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

    // Ẩn thanh footer nếu không có item nào trong app
    if (todos.length > 0) {
        todoFooter.classList.remove('hidden');
    } else {
        todoFooter.classList.add('hidden');
    }

    // Ẩn hiện nút "Clear completed" nếu không có item nào đã hoàn thành
    const hasCompleted = todos.some(todo => todo.completed);
    if (hasCompleted) {
        clearCompletedBtn.classList.remove('hidden');
    } else {
        clearCompletedBtn.classList.add('hidden');
    }
}

// --- TÍNH NĂNG 1: THÊM TODO ---
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = {
        id: Date.now().toString(), // Tạo ID độc nhất ngẫu nhiên
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = ''; // Reset input
    saveAndRender();
});

// --- ÁP DỤNG EVENT DELEGATION (Lắng nghe sự kiện tập trung tại #todoList) ---
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const todoId = li.dataset.id;

    // TÍNH NĂNG 2: XÓA TODO (Khi click trúng nút .destroy)
    if (e.target.classList.contains('destroy')) {
        todos = todos.filter(todo => todo.id !== todoId);
        saveAndRender();
    }
    
    // TÍNH NĂNG 3: TOGGLE COMPLETED (Khi click vào thẻ label text)
    if (e.target.tagName === 'LABEL') {
        todos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveAndRender();
    }
});

// TÍNH NĂNG 4: EDIT TODO (Double Click vào hàng)
todoList.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'LABEL') {
        const li = e.target.closest('li');
        li.classList.add('editing');
        
        const editInput = li.querySelector('.edit-input');
        editInput.focus();
        // Đặt con trỏ chuột ở cuối dòng chữ
        const val = editInput.value;
        editInput.value = '';
        editInput.value = val;
    }
});

// Xử lý Sự kiện khi đang sửa (Enter để Save, Blur để hủy/hoặc lưu)
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input')) {
        const li = e.target.closest('li');
        const todoId = li.dataset.id;

        if (e.key === 'Enter') {
            const newText = e.target.value.trim();
            if (newText === '') {
                // Nếu xóa hết chữ, coi như xóa luôn todo
                todos = todos.filter(todo => todo.id !== todoId);
            } else {
                todos = todos.map(todo => {
                    if (todo.id === todoId) return { ...todo, text: newText };
                    return todo;
                });
            }
            li.classList.remove('editing');
            saveAndRender();
        }

        if (e.key === 'Escape') {
            // Nhấn ESC để hủy chỉnh sửa
            li.classList.remove('editing');
            e.target.value = todos.find(todo => todo.id === todoId).text; // khôi phục text cũ
        }
    }
});

// Nếu user nhấn chuột ra ngoài vùng edit-input thì lưu lại thay đổi
todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit-input')) {
        const li = e.target.closest('li');
        if (li.classList.contains('editing')) {
            const todoId = li.dataset.id;
            const newText = e.target.value.trim();
            if (newText !== '') {
                todos = todos.map(todo => {
                    if (todo.id === todoId) return { ...todo, text: newText };
                    return todo;
                });
            }
            li.classList.remove('editing');
            saveAndRender();
        }
    }
}, true); // Sử dụng capturing phase để bắt sự kiện focusout từ ô input


// --- TÍNH NĂNG 5: BỘ LỌC FILTER (All, Active, Completed) ---
const filterContainer = document.querySelector('.filters');
filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Gỡ class active cũ, gán cho nút vừa click
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Đặt lại biến filter toàn cục và render
        currentFilter = e.target.dataset.filter;
        render();
    }
});


// --- TÍNH NĂNG 6: CLEAR COMPLETED ---
clearCompletedBtn.addEventListener('click', () => {
    // Chỉ giữ lại các todos chưa hoàn thành
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
});


// --- KHỞI CHẠY LẦN ĐẦU TIÊN KHI MỞ TRANG ---
render();