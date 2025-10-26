// ====================      Start Slide Bar images ads     ==================== \\
let currentIndex = 0;
const slides = document.querySelectorAll('.handam-slider .slide');
const dots = document.querySelectorAll('.handam-slider .dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
}

document.querySelector('.handam-slider .next').addEventListener('click', () => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
});

document.querySelector('.handam-slider .prev').addEventListener('click', () => {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
});

// تشغيل تلقائي كل 5 ثواني
setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}, 5000);


// ====================      End Slide Bar images ads     ==================== \\




// ====================      Start Products     ==================== \\
/* JS: تمرير أملس + أزرار وسلوك التفاعل */
(function() {
    const track = document.getElementById('hpTrack');
    const prev = document.querySelector('.hp-prev');
    const next = document.querySelector('.hp-next');
    const cards = Array.from(track.querySelectorAll('.hp-card'));
    const cardGap = 8; // px
    const visibleAtOnce = () => {
        const w = window.innerWidth;
        if (w >= 1200) return 4;
        if (w >= 900) return 3;
        if (w >= 640) return 2;
        return 1;
    };

    // scroll amount = card width + gap
    function scrollBy(direction = 1) {
        const card = track.querySelector('.hp-card');
        if (!card) return;
        const style = getComputedStyle(card);
        const gap = parseInt(style.marginRight || cardGap);
        const width = card.getBoundingClientRect().width + gap;
        track.scrollBy({
            left: direction * width * visibleAtOnce(),
            behavior: 'smooth'
        });
    }

    prev.addEventListener('click', () => scrollBy(-1));
    next.addEventListener('click', () => scrollBy(1));

    // Make track horizontally scrollable with snapping
    track.style.scrollBehavior = 'smooth';
    track.addEventListener('wheel', (e) => {
        // support horizontal wheel on desktop
        if (e.deltaY === 0) return;
        e.preventDefault();
        track.scrollBy({
            left: e.deltaY,
            behavior: 'smooth'
        });
    }, {
        passive: false
    });

    // Lazy load images from data-src
    function lazyLoadImages() {
        const imgs = track.querySelectorAll('img[data-src]');
        imgs.forEach(img => {
            if (img.dataset.src && img.getBoundingClientRect().left < window.innerWidth + 300) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadImages, {
        passive: true
    });
    window.addEventListener('resize', lazyLoadImages);

    // Wishlist toggle
    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.icon-btn.wish');
        if (!btn) return;
        btn.classList.toggle('added');
        // simple visual feedback; you can hook AJAX here
    });

    // Cart click (visual ripple)
    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.icon-btn.cart');
        if (!btn) return;
        btn.classList.add('added');
        setTimeout(() => btn.classList.remove('added'), 900);
    });

    // Quick view
    const qv = document.getElementById('hpQuickView');
    const qvImg = document.getElementById('qvImg');
    const qvTitle = document.getElementById('qvTitle');
    const qvNow = document.getElementById('qvNow');
    const qvOld = document.getElementById('qvOld');
    const qvDesc = document.getElementById('qvDesc');

    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.icon-btn.quick');
        if (!btn) return;
        const card = btn.closest('.hp-card');
        const img = card.querySelector('.hp-img').currentSrc;
        const title = card.querySelector('.hp-title').textContent;
        const now = card.querySelector('.price-now').textContent;
        const old = card.querySelector('.price-old').textContent;
        qvImg.src = img;
        qvTitle.textContent = title;
        qvNow.textContent = now;
        qvOld.textContent = old;
        qvDesc.textContent = 'وصف مختصر للمنتج — يمكن تغييره ديناميكياً من الخادم.';
        qv.style.display = 'flex';
        qv.setAttribute('aria-hidden', 'false');
    });

    // close quickview
    qv.querySelector('.qv-close').addEventListener('click', () => {
        qv.style.display = 'none';
        qv.setAttribute('aria-hidden', 'true');
    });
    qv.addEventListener('click', (e) => {
        if (e.target === qv) {
            qv.style.display = 'none';
            qv.setAttribute('aria-hidden', 'true');
        }
    });

    // Swipe support for mobile (track)
    (function addTouch() {
        let startX = 0,
            dist = 0,
            dragging = false;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            dragging = true;
        }, {
            passive: true
        });
        track.addEventListener('touchmove', (e) => {
            if (!dragging) return;
            dist = e.touches[0].clientX - startX;
        }, {
            passive: true
        });
        track.addEventListener('touchend', () => {
            if (!dragging) return;
            dragging = false;
            if (Math.abs(dist) > 50) track.scrollBy({
                left: -Math.sign(dist) * 300,
                behavior: 'smooth'
            });
            dist = 0;
        });
    })();

})();
// ====================      End Products     ==================== \\




// ====================      Start Gallery Lightbox    ==================== \\
// Handam Gallery Lightbox
const galleryCards = document.querySelectorAll('.gallery-card img');

galleryCards.forEach(img => {
    img.addEventListener('click', () => {
        // إنشاء Overlay
        const overlay = document.createElement('div');
        overlay.className = 'gallery-lightbox';
        overlay.innerHTML = `<img src="${img.src}" alt="معرض هندام"><span class="close-lightbox">&times;</span>`;
        document.body.appendChild(overlay);

        // إغلاق عند الضغط
        overlay.querySelector('.close-lightbox').addEventListener('click', () => {
            overlay.remove();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    });
});

// ====================      End Gallery Lightbox    ==================== \\



// ====================      Start scroll   ==================== \\

// Get circle and button
const scrollBtn = document.getElementById('scroll-to-top');
const circle = scrollBtn.querySelector('circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

// Update progress based on scroll
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight ? scrollTop / scrollHeight : 0;
    const offset = circumference - progress * circumference;
    circle.style.strokeDashoffset = offset;

    // Hide button if at top
    if (scrollTop > 100) {
        scrollBtn.style.opacity = 1;
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = 0;
        scrollBtn.style.pointerEvents = 'none';
    }
}

// Smooth scroll to top
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);
// ====================      End scroll   ==================== \\




// ====================      Start Share busston   ==================== \\

// عناصر التحكم
const ssToggle = document.getElementById('ss-toggle');
const ssWindow = document.getElementById('ss-window');
const ssClose = document.getElementById('ss-close');
const copyBtn = document.getElementById('copy-link');
const whatsappBtn = document.getElementById('share-whatsapp');
const fbBtn = document.getElementById('share-facebook');
const instaBtn = document.getElementById('share-instagram');

// فتح / إغلاق النافذة
ssToggle.onclick = () => ssWindow.classList.toggle('hidden');
ssClose.onclick = () => ssWindow.classList.add('hidden');

// نسخ الرابط
copyBtn.onclick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("تم نسخ رابط الموقع!");
    });
};

// مشاركة فيسبوك
fbBtn.onclick = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

// مشاركة انستاجرام
instaBtn.onclick = () => {
    alert("يمكن مشاركة رابط الموقع عبر البايو أو الرسائل الخاصة على إنستاجرام.");
};
// ====================      End Share busston   ==================== \\