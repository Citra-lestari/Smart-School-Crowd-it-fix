const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//service swiper
const serviceSwiper = new Swiper(".serviceSwiper", {
    slidesPerView: 4, //di mode dekstop dia akan menampilkan 4 card
    spaceBetween: 16, //dengan jarak 16px percard
    pagination: {
        el: ".swiper-pagination", //class paginationnya di custom
        clickable: true,
    },
    breakpoints: {
        320: { slidesPerView: 1   }, //di mode mobile dia akan menampilkan 2 card
        640: { slidesPerView: 2}, //di mode tablet dia akan menampilkan 3 card
        1024: { slidesPerView: 4 }, //di mode dekstop dia akan menampilkan 4 card
    }
    });