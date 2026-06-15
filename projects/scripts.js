const lightbox = (() => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: '9999', opacity: '0', visibility: 'hidden',
        transition: 'opacity 0.25s ease, visibility 0.25s ease',
        cursor: 'zoom-out', padding: '2rem'
    });
    const img = document.createElement('img');
    Object.assign(img.style, {
        maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto',
        objectFit: 'contain', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
    });
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
        }
    });

    return src => {
        img.src = src;
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    };
})();

document.querySelectorAll('main img, .full-image-card img, .project-card img').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', e => {
        e.stopPropagation();
        lightbox(el.currentSrc || el.src);
    });
});

const revealTargets = document.querySelectorAll('header .topbar, main section, .project-card, .software-card, .skill-card, .metric-card');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
});

revealTargets.forEach(target => revealObserver.observe(target));

const focusCarousel = document.querySelector('.focus-carousel');
const focusPrev = document.querySelector('.focus-prev');
const focusNext = document.querySelector('.focus-next');

if (focusCarousel && focusPrev && focusNext) {
    const scrollAmount = () => focusCarousel.clientWidth + 24;

    focusPrev.addEventListener('click', () => {
        focusCarousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    focusNext.addEventListener('click', () => {
        focusCarousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}
