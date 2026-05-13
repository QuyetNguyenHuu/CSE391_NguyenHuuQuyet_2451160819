// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.querySelector("#skills");
    const progressBars = document.querySelectorAll(".skill-progress");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Khi section skills bắt đầu xuất hiện trong màn hình
            if (entry.isIntersecting) {
                progressBars.forEach((bar) => {
                    // Lấy giá trị từ data-width và gán vào style width
                    const targetWidth = bar.getAttribute("data-width");
                    bar.style.width = targetWidth;
                });
                // Sau khi chạy xong thì ngừng quan sát để tiết kiệm tài nguyên
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2 // Kích hoạt khi thấy được 20% của section skills
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});