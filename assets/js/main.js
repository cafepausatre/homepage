document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector(".MenuBtn.Style01");
    const nav = document.querySelector(".nav");
    const closeBtn = document.querySelector(".nav__btn");
    const navLinks = document.querySelectorAll(".nav__list a");
    const header = document.querySelector(".header");

    // Keep campaign parameters when visitors choose another language.
    document.querySelectorAll('.language-switch a').forEach(link => {
        const destination = new URL(link.getAttribute('href'), window.location.href);
        destination.search = window.location.search;
        destination.hash = window.location.hash;
        link.href = destination.href;
    });

    const menuLabel = document.documentElement.lang === 'en'
        ? { open: 'Open menu', close: 'Close menu' }
        : { open: 'メニューを開く', close: 'メニューを閉じる' };
    function setMenuState(open) {
        menuBtn.classList.toggle('isClosed', open);
        nav.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? menuLabel.close : menuLabel.open);
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            setMenuState(false);
            menuBtn.focus();
        }
    });

    // ===== ハンバーガーメニュー開閉 =====
    menuBtn.addEventListener("click", () => {
        setMenuState(!nav.classList.contains("is-open"));
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            setMenuState(false);
        });
    }

    // ===== ナビリンククリックで閉じる + スムーズスクロール =====
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            setMenuState(false);

            const href = this.getAttribute("href");
            // External links keep their native behavior, including target="_blank".
            if (!href || !href.startsWith("#")) return;
            if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = header.offsetHeight; // ヘッダー高さ分を補正
                const topPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: topPos, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }
        });
    });

    // ===== スライダー =====
    const slides = document.querySelectorAll(".slideimg");
    let currentIndex = 0;

    if (slides.length > 0) {
        slides[currentIndex].classList.add("active");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, 3000);
    }

    // ===== TOPに戻るボタン =====
    const topBtn = document.querySelector(".fa-chevron-up");
    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        });
    }
});
