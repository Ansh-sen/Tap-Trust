(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.desktop-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('nav-open', !open);
      menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false');
    }));
  }
  const notice = document.querySelector('#demo-notice');
  document.querySelectorAll('[data-demo-action]').forEach(button => button.addEventListener('click', () => {
    if (!notice) return;
    const labels = { review: 'Review destination', booking: 'Booking destination', instagram: 'Social profile destination', whatsapp: 'Contact destination' };
    notice.querySelector('strong').textContent = labels[button.dataset.demoAction] || 'Sample interaction';
    notice.querySelector('p').innerHTML = '<strong>' + labels[button.dataset.demoAction] + '</strong><br>This is a fictional demo. Once a real business is onboarded, this button will open its chosen destination.';
    notice.classList.add('notice-active');
    notice.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }));
  const close = document.querySelector('#notice-close');
  if (close && notice) close.addEventListener('click', () => notice.classList.remove('notice-active'));
  const revealTargets = document.querySelectorAll('.step-card, .solution-card, .price-row, .salon-info-copy, .hours-card');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
  }
})();
