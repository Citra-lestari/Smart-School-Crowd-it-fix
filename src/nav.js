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
const mobileLangBtn = document.getElementById('mobile-lang-btn'); // Tangkap tombol versi mobile

function applyLanguage(lang) {

    document.querySelectorAll('[data-lang-id]').forEach(el => {
        const idText = el.getAttribute('data-lang-id');
        const enText = el.getAttribute('data-lang-en');

        el.innerText = lang === 'EN'
            ? enText
            : idText;
    });

    // Ganti gambar hero
    const heroImage = document.getElementById('hero-image');

    if (heroImage) {
        heroImage.src = lang === 'EN'
            ? 'image/hero section eng.png'
            : 'image/hero section.png';
    }

    // Update text tombol bahasa desktop
    if (langBtn) {
        const langText = langBtn.querySelector('div');
        if (langText) {
            langText.innerText = lang;
        }
    }
}

// Inisialisasi bahasa pertama kali
let currentLang = localStorage.getItem('lang') || 'ID';
applyLanguage(currentLang);

// Fungsi untuk mengganti bahasa
function toggleLanguage() {
    currentLang = currentLang === 'ID' ? 'EN' : 'ID';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
}

// Event listener untuk tombol Desktop & Mobile
if (langBtn) langBtn.addEventListener('click', toggleLanguage);
if (mobileLangBtn) mobileLangBtn.addEventListener('click', toggleLanguage);

/* =========================================
    4. FITUR CHATBOT SKENSAI LOKAL (FIXED)
   ========================================= */
const skensaiBtn = document.getElementById('skensai-btn');
const skensaiWindow = document.getElementById('skensai-window');
const closeChatBtn = document.getElementById('close-chat');
const skensaiPopup = document.getElementById('skensai-popup');
const skensaiInput = document.getElementById('skensai-input');
const skensaiSend = document.getElementById('skensai-send');
const skensaiMessages = document.getElementById('skensai-messages');

if (skensaiBtn && skensaiWindow) {
    
    // --- FITUR POPUP OTOMATIS ---
    let popupTimeout;
    const popupText = skensaiPopup ? skensaiPopup.querySelector('p') : null;

    const showAutoPopup = () => {
        if (!skensaiWindow.classList.contains('hidden')) return;

        const msgId = "Halo saya SkensaAI! Ada yang bisa dibantu?";
        const msgEn = "Hello i'm SkensAI! Is there anything I can help you with?";
        const langActive = localStorage.getItem('lang') || 'ID';
        
        if (popupText) {
            popupText.setAttribute('data-lang-id', msgId);
            popupText.setAttribute('data-lang-en', msgEn);
            popupText.innerHTML = langActive === 'ID' ? msgId : msgEn;
        }

        skensaiPopup.classList.remove('hidden');

        clearTimeout(popupTimeout);
        popupTimeout = setTimeout(() => {
            skensaiPopup.classList.add('hidden');
        }, 3000);
    };

    setInterval(showAutoPopup, 8000);

    // --- EVENT BUKA/TUTUP CHATBOT WINDOW ---
    skensaiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        skensaiWindow.classList.toggle('hidden');
        skensaiWindow.classList.toggle('flex');
        if (!skensaiWindow.classList.contains('hidden')) {
            skensaiWindow.classList.add('chat-popup-anim');
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

    document.addEventListener('click', (e) => {
        if (!skensaiWindow.classList.contains('hidden')) {
            if (!skensaiWindow.contains(e.target) && !skensaiBtn.contains(e.target)) {
                skensaiWindow.classList.add('hidden');
                skensaiWindow.classList.remove('flex', 'chat-popup-anim');
            }
        }
    });

    skensaiWindow.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // --- LOGIKA CHAT AI LOKAL ---
    function addMessage(text, sender) {
        const isUser = sender === 'user';
        const isDark = document.documentElement.classList.contains('dark');
        const msgDiv = document.createElement('div');
        
        // Menggunakan class 'msg-anim' agar pesan muncul dengan transisi smooth
        if (isUser) {
            msgDiv.className = isDark 
                ? "bg-[#008069] text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end leading-relaxed mb-1 break-words msg-anim" 
                : "bg-[#d9fdd3] text-gray-900 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end border border-[#c1e8ba] leading-relaxed mb-1 break-words msg-anim";
            msgDiv.innerHTML = text;
            skensaiMessages.appendChild(msgDiv);
        } else {
            msgDiv.className = "flex items-start gap-2 max-w-[85%] self-start mb-1 msg-anim";
            msgDiv.innerHTML = isDark
                ? `<div class="p-3 text-gray-100 bg-gray-700 border border-gray-600 shadow-sm rounded-2xl rounded-tl-none leading-relaxed break-words">${text}</div>`
                : `<div class="p-3 text-gray-800 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none leading-relaxed break-words">${text}</div>`;
            skensaiMessages.appendChild(msgDiv);
        }
        skensaiMessages.scrollTop = skensaiMessages.scrollHeight;
    }

    // Fungsi membuat efek melompat (Typing Indicator) sebelum AI menjawab
    function showTypingIndicator() {
        const isDark = document.documentElement.classList.contains('dark');
        const indicatorDiv = document.createElement('div');
        indicatorDiv.id = "typing-indicator";
        indicatorDiv.className = "flex items-start gap-2 max-w-[85%] self-start mb-1 msg-anim";
        
        indicatorDiv.innerHTML = isDark
            ? `<div class="p-3 bg-gray-700 border border-gray-600 shadow-sm rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>`
            : `<div class="p-3 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>`;
        skensaiMessages.appendChild(indicatorDiv);
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
        
        // Memunculkan animasi mengetik
        showTypingIndicator();
        
        setTimeout(() => {
            // Menghapus animasi mengetik setelah jeda selesai
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
            
            // Mengirim respon asli AI
            const response = getSkensAIResponse(text);
            addMessage(response, 'ai');
        }, 1200);
    }

    // --- FIX BUTTON INTERACTION ---
    // Menggunakan e.target.closest agar klik pada ikon pesawat tetap memicu fungsi kirim
    if (skensaiSend) {
        skensaiSend.addEventListener('click', (e) => {
            const button = e.target.closest('#skensai-send');
            if (button) handleSendMessage();
        });
    }
    
    if (skensaiInput) {
        skensaiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
}

/* =========================================
    5. FITUR FILTER JURUSAN (TERBARU)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    if (filterButtons.length > 0 && programCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetFilter = this.getAttribute('data-filter');

                // 1. Reset class style semua tombol filter ke posisi default (tidak aktif)
                filterButtons.forEach(btn => {
                    btn.className = "filter-btn snap-start px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm";
                });
                
                // 2. Set class tombol yang baru diklik menjadi aktif (warna biru)
                this.className = "filter-btn snap-start px-6 py-2.5 bg-blue-600 text-white dark:bg-blue-500 text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all duration-300";

                // 3. Logika menyembunyikan / menampilkan kartu berdasarkan kategori
                programCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (targetFilter === 'all' || cardCategory === targetFilter) {
                        card.style.display = 'flex'; // Tampilkan jika cocok / 'all'
                    } else {
                        card.style.display = 'none'; // Sembunyikan jika tidak cocok
                    }
                });
            });
        });
    }
});

