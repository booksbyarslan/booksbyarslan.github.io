const socialKeys = {
  Facebook: 'facebook',
  LinkedIn: 'linkedin',
  Instagram: 'instagram',
  YouTube: 'youtube'
};

document.querySelectorAll('a[href*="forms.gle"]').forEach((link) => {
  link.href = siteData.links.bookingForm;
  link.target = '_blank';
  link.rel = 'noopener';
});

document.querySelectorAll('.socials a[aria-label]').forEach((link) => {
  const key = socialKeys[link.getAttribute('aria-label')];
  if (key) link.href = siteData.links[key];
});

document.querySelectorAll('.footer-email, .contact-item').forEach((element) => {
  const emailLink = element.matches('.footer-email') ? element : element.querySelector('a[href^="mailto:"]');
  if (emailLink) emailLink.href = `mailto:${siteData.email}`;

  const label = element.querySelector('small')?.textContent.trim();
  const key = socialKeys[label];
  if (key) {
    const socialLink = element.querySelector('a');
    if (socialLink) socialLink.href = siteData.links[key];
  }
});

siteData.services.forEach((service) => {
  const card = document.querySelector(`[data-service-card="${service.id}"]`);
  if (card) {
    card.querySelector('h3').textContent = service.name;
    card.querySelector('p').textContent = service.description;
    card.querySelector('.price').textContent = service.price;
    card.querySelector('.payment').textContent = service.payment;
  }

  const detail = document.querySelector(`[data-service-detail="${service.id}"]`);
  if (detail) {
    detail.querySelector('h2').textContent = service.name;
    detail.querySelector('p').textContent = service.detailDescription;
    detail.querySelector('strong').textContent = service.price;
    detail.querySelector('span').textContent = service.detailPayment;
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (navLinks.classList.contains('is-open') && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}
