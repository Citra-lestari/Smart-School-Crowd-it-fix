/* =========================================
   1. NAVBAR & SWIPER
   ========================================= */
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if(menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// Service Swiper
if(document.querySelector(".serviceSwiper")) {
    const serviceSwiper = new Swiper(".serviceSwiper", {
        slidesPerView: 4, 
        spaceBetween: 16, 
        pagination: {
            el: ".swiper-pagination", 
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 1 }, 
            640: { slidesPerView: 2 }, 
            1024: { slidesPerView: 4 },
        }
    });
}

/* =========================================
   2. FITUR DARK / LIGHT MODE
   ========================================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');

function updateThemeIcons(isDark) {
    if (themeIcon) {
        themeIcon.classList.remove(
            'fa-sun',
            'fa-moon',
            'text-black',
            'text-yellow-400'
        );

        if (isDark) {
            themeIcon.classList.add('fa-moon', 'text-yellow-400');
        } else {
            themeIcon.classList.add('fa-sun', 'text-black');
        }
    }

    if (mobileThemeIcon) {
        mobileThemeIcon.classList.remove(
            'fa-sun',
            'fa-moon',
            'text-black',
            'text-yellow-400'
        );

        if (isDark) {
            mobileThemeIcon.classList.add('fa-moon', 'text-yellow-400');
        } else {
            mobileThemeIcon.classList.add('fa-sun', 'text-black');
        }
    }
}

function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateThemeIcons(isDark);
}

initTheme();

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    const isDark =
        document.documentElement.classList.contains('dark');

    localStorage.setItem(
        'theme',
        isDark ? 'dark' : 'light'
    );

    updateThemeIcons(isDark);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

/* =========================================
   3. FITUR MULTI-BAHASA (ID / EN)
   ========================================= */
const langBtn = document.getElementById('lang-btn');

function applyLanguage(lang) {
    document.querySelectorAll('[data-lang-id]').forEach(el => {
        const idText = el.getAttribute('data-lang-id');
        const enText = el.getAttribute('data-lang-en');
        el.innerText = lang === 'EN' ? enText : idText;
    });

    if (langBtn) {
        const langText = langBtn.querySelector('div');
        if (langText) {
            langText.innerText = lang;
        }
    }
}

// Inisialisasi bahasa dari localStorage agar otomatis di semua halaman
let currentLang = localStorage.getItem('lang') || 'ID';
applyLanguage(currentLang);

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ID' ? 'EN' : 'ID';
        localStorage.setItem('lang', currentLang); // Simpan ke localStorage
        applyLanguage(currentLang);
    });
}

/* =========================================
   4. FITUR CHATBOT SKENSAI LOKAL
   ========================================= */
const skensaiBtn = document.getElementById('skensai-btn');
const skensaiWindow = document.getElementById('skensai-window');
const closeChatBtn = document.getElementById('close-chat');
const skensaiPopup = document.getElementById('skensai-popup');
const skensaiInput = document.getElementById('skensai-input');
const skensaiSend = document.getElementById('skensai-send');
const skensaiMessages = document.getElementById('skensai-messages');

if (skensaiBtn && skensaiWindow) {
    
    // --- FITUR POPUP OTOMATIS SETIAP 1 MENIT ---
    let popupTimeout;
    const popupText = skensaiPopup ? skensaiPopup.querySelector('p') : null;

    const showAutoPopup = () => {
        // Jangan munculkan popup jika chat window sedang terbuka
        if (!skensaiWindow.classList.contains('hidden')) return;

        // Teks untuk fitur multi-bahasa
        const msgId = "Halo saya SkensaAI! Ada yang bisa dibantu?";
        const msgEn = "Hello i'm SkensAI! Is there anything I can help you with?";
        
        // Ambil indikator bahasa dari localStorage
        const langActive = localStorage.getItem('lang') || 'ID';
        
        if (popupText) {
            popupText.setAttribute('data-lang-id', msgId);
            popupText.setAttribute('data-lang-en', msgEn);
            popupText.innerHTML = langActive === 'ID' ? msgId : msgEn;
        }

        // Tampilkan popup
        skensaiPopup.classList.remove('hidden');

        // Sembunyikan popup kembali setelah 3 detik agar terlihat rapi
        clearTimeout(popupTimeout);
        popupTimeout = setTimeout(() => {
            skensaiPopup.classList.add('hidden');
        }, 3000);
    };

    // Panggil fungsi showAutoPopup setiap 5000 ms (5 detik) sesuai kode asal
    setInterval(showAutoPopup, 5000);
    // -------------------------------------------

    // Event Buka/Tutup Chatbot Window
    skensaiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        skensaiWindow.classList.toggle('hidden');
        skensaiWindow.classList.toggle('flex');
        if (!skensaiWindow.classList.contains('hidden')) {
            skensaiWindow.classList.add('chat-popup-anim');
            // Sembunyikan popup teks saat chat dibuka
            if (skensaiPopup) skensaiPopup.classList.add('hidden'); 
        }
    });

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            skensaiWindow.classList.add('hidden');
            skensaiWindow.classList.remove('flex', 'chat-popup-anim');
        });
    }

    // Menutup window saat klik di luar area chatbot
    document.addEventListener('click', (e) => {
        if (!skensaiWindow.classList.contains('hidden')) {
            if (!skensaiWindow.contains(e.target) && !skensaiBtn.contains(e.target)) {
                skensaiWindow.classList.add('hidden');
                skensaiWindow.classList.remove('flex', 'chat-popup-anim');
            }
        }
    });

    // Mencegah penutupan saat klik di dalam area window chatbot
    skensaiWindow.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // --- LOGIKA CHAT AI LOKAL ---
    function addMessage(text, sender) {
        const isUser = sender === 'user';
        const isDark = document.documentElement.classList.contains('dark');
        const msgDiv = document.createElement('div');
        
        if (isUser) {
            msgDiv.className = isDark 
                ? "bg-[#008069] text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end leading-relaxed mb-1 break-words" 
                : "bg-[#d9fdd3] text-gray-900 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end border border-[#c1e8ba] leading-relaxed mb-1 break-words";
            msgDiv.innerHTML = text;
            skensaiMessages.appendChild(msgDiv);
        } else {
            msgDiv.className = "flex items-start gap-2 max-w-[85%] self-start mb-1";
            msgDiv.innerHTML = isDark
                ? `<div class="p-3 text-gray-100 bg-gray-700 border border-gray-600 shadow-sm rounded-2xl rounded-tl-none leading-relaxed break-words">${text}</div>`
                : `<div class="p-3 text-gray-800 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none leading-relaxed break-words">${text}</div>`;
            skensaiMessages.appendChild(msgDiv);
        }
        // Auto-scroll ke pesan terbaru
        skensaiMessages.scrollTop = skensaiMessages.scrollHeight;
    }

    function getSkensAIResponse(question) {
        const q = question.toLowerCase();
        if (q.includes('jurusan') || q.includes('program')) return "Sekolah kami memiliki berbagai program keahlian unggulan. Cek selengkapnya di menu 'Program Keahlian'.";
        if (q.includes('fasilitas')) return "Fasilitas kami sangat lengkap! Mulai dari laboratorium standar industri hingga perpustakaan digital.";
        if (q.includes('alamat')) return "Kami berlokasi di Jalan HOS. Cokroaminoto No. 84, Denpasar.";
        return "Maaf ya, SkensAI saat ini hanya merespon pertanyaan basic terkait jurusan, fasilitas, atau alamat.";
    }

    function handleSendMessage() {
        const text = skensaiInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        skensaiInput.value = '';
        
        // Jeda waktu agar terlihat seperti AI sedang mengetik
        setTimeout(() => {
            const response = getSkensAIResponse(text);
            addMessage(response, 'ai');
        }, 700);
    }

    if (skensaiSend) skensaiSend.addEventListener('click', handleSendMessage);
    if (skensaiInput) {
        skensaiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
}