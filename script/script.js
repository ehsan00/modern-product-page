const thumbs = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("currentImage");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImage");

let currentIndex = [...thumbs].findIndex(t => t.classList.contains("active"));
if (currentIndex === -1) currentIndex = 0;

/* اسلایدر thumbnail */
let startIndex = 0;
const visibleCount = 3;

function renderThumbs() {
    thumbs.forEach((thumb, i) => {
        if (i >= startIndex && i < startIndex + visibleCount) {
            thumb.style.display = "block";
        } else {
            thumb.style.display = "none";
        }
    });
}

/* تنظیم تصویر فعال */
function setActive(index) {
    currentIndex = index;

    mainImage.src = thumbs[index].src;
    modalImg.src = thumbs[index].src;

    const currentActive = document.querySelector(".thumb.active");
    if (currentActive) currentActive.classList.remove("active");

    thumbs[index].classList.add("active");

    /* اگر خارج از محدوده بود، اسلایدر جابه‌جا بشه */
    if (index < startIndex) {
        startIndex = index;
        renderThumbs();
    } else if (index >= startIndex + visibleCount) {
        startIndex = index - visibleCount + 1;
        renderThumbs();
    }
}

/* کلیک روی thumbnail */
thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => setActive(index));
});

/* فلش‌ها */
document.querySelector(".up").onclick = () => {
    if (startIndex > 0) {
        startIndex--;
        renderThumbs();
    }
};

document.querySelector(".down").onclick = () => {
    if (startIndex + visibleCount < thumbs.length) {
        startIndex++;
        renderThumbs();
    }
};

/* مودال */
mainImage.onclick = () => {
    modal.style.display = "flex";
    modalImg.src = mainImage.src;
};

document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
};

modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

/* ناوبری مودال */
document.querySelector(".modal-next").onclick = () => {
    setActive((currentIndex + 1) % thumbs.length);
};

document.querySelector(".modal-prev").onclick = () => {
    setActive((currentIndex - 1 + thumbs.length) % thumbs.length);
};

/* کیبورد */
document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "Escape") modal.style.display = "none";
        if (e.key === "ArrowRight") document.querySelector(".modal-next").click();
        if (e.key === "ArrowLeft") document.querySelector(".modal-prev").click();
    }
});

/* اجرای اولیه */
renderThumbs();
setActive(currentIndex);

// توابع افزایش/کاهش تعداد
function increment() {
  const input = document.getElementById('quantity');
  input.value = parseInt(input.value) + 1;
}

function decrement() {
  const input = document.getElementById('quantity');
  if(parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}


const navItems = document.querySelectorAll('.menu-dropdown');
const overlay = document.querySelector('.overlay');

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    overlay.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    overlay.classList.remove('active');
  });
});