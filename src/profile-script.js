document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Theme
    const toggleThemeBtn = document.getElementById('toggle-theme');
    initTheme();

    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // 2. Setup Language (Custom Dropdown Ke Atas)
    initLang();
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');
    const langChevron = document.getElementById('lang-chevron');
    const langOptions = document.querySelectorAll('.lang-option');

    if (langBtn && langMenu) {
        // Buka/Tutup menu bahasa saat diklik
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langMenu.classList.contains('hidden')) {
                langMenu.classList.remove('hidden');
                setTimeout(() => langMenu.classList.remove('opacity-0', 'translate-y-2'), 10);
                langChevron.classList.add('rotate-180');
            } else {
                langMenu.classList.add('opacity-0', 'translate-y-2');
                langChevron.classList.remove('rotate-180');
                setTimeout(() => langMenu.classList.add('hidden'), 200);
            }
        });

        // Pilih bahasa
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const val = e.target.getAttribute('data-value');
                setLang(val);
                langMenu.classList.add('opacity-0', 'translate-y-2');
                langChevron.classList.remove('rotate-180');
                setTimeout(() => langMenu.classList.add('hidden'), 200);
            });
        });
    }

    // 3. Setup Sidebar & Click Outside
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('-translate-x-full'); 
        });

        // Fungsi Klik di Luar Menu
        document.addEventListener('click', (e) => {
            // Tutup Sidebar di HP
            if (!sidebar.classList.contains('-translate-x-full')) {
                if (!sidebar.contains(e.target) && !toggleSidebarBtn.contains(e.target)) {
                    sidebar.classList.add('-translate-x-full');
                }
            }
            // Tutup Dropdown Bahasa
            if (langMenu && !langMenu.classList.contains('hidden') && !langBtn.contains(e.target) && !langMenu.contains(e.target)) {
                langMenu.classList.add('opacity-0', 'translate-y-2');
                langChevron.classList.remove('rotate-180');
                setTimeout(() => langMenu.classList.add('hidden'), 200);
            }
        });
    }

    // 4. Inisialisasi AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }
});

function initTheme() {
    let theme = localStorage.getItem('theme');
    if (!theme) {
        theme = 'light';
        localStorage.setItem('theme', theme);
    }
    setTheme(theme, true);
}

function setTheme(theme, isInit = false) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    
    const btnIcon = document.getElementById('theme-icon');
    if (btnIcon) {
        if (theme === 'dark') {
            btnIcon.className = 'fa-solid fa-moon text-slate-300'; 
        } else {
            btnIcon.className = 'fa-solid fa-sun text-amber-500'; 
        }
    }

    if (!isInit) {
        document.body.classList.add('transition-colors', 'duration-300');
    }
}

function initLang() {
    let lang = localStorage.getItem('lang');
    if (!lang) {
        lang = 'id';
        localStorage.setItem('lang', lang);
    }
    setLang(lang);
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    
    // Update Teks di Button Custom Dropdown
    const activeTextEl = document.getElementById('lang-active-text');
    if (activeTextEl) {
        activeTextEl.textContent = lang.toUpperCase();
    }

    const elements = document.querySelectorAll('[data-lang-id]');
    elements.forEach(el => {
        const idText = el.getAttribute('data-lang-id');
        const enText = el.getAttribute('data-lang-en');
        if (lang === 'en' && enText) {
            el.textContent = enText;
        } else if (idText) {
            el.textContent = idText;
        }
    });
}