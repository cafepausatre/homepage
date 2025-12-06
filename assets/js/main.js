document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector(".MenuBtn.Style01");
    const nav = document.querySelector(".nav");
    const closeBtn = document.querySelector(".nav__btn");
    const navLinks = document.querySelectorAll(".nav__list a");
    const header = document.querySelector(".header");

    // ===== ハンバーガーメニュー開閉 =====
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("isClosed");
        nav.classList.toggle("is-open"); // transform はCSS側で切り替え
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            menuBtn.classList.remove("isClosed");
            nav.classList.remove("is-open");
        });
    }

    // ===== ナビリンククリックで閉じる + スムーズスクロール =====
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            menuBtn.classList.remove("isClosed");
            nav.classList.remove("is-open");

            const targetId = this.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const offset = header.offsetHeight; // ヘッダー高さ分を補正
                const topPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: topPos, behavior: "smooth" });
            }
        });
    });

    // ===== スライダー =====
    const slides = document.querySelectorAll(".slideimg");
    let currentIndex = 0;

    if (slides.length > 0) {
        slides[currentIndex].classList.add("active");

        setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, 3000);
    }

    // ===== TOPに戻るボタン =====
    const topBtn = document.querySelector(".fa-chevron-up");
    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
