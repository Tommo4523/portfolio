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
