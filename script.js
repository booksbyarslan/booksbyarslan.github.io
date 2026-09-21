const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const testimonialsSection = document.querySelector('.testimonials-section');
const processSection = document.querySelector('.process-section');

if (testimonialsSection && processSection) {
  processSection.before(testimonialsSection);
}

const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');

if (testimonialCarousel) {
  const testimonialTrack = testimonialCarousel.querySelector('.testimonial-track');
  const clicknartSlide = [...testimonialCarousel.querySelectorAll('.testimonial-slide')].find((slide) => slide.querySelector('cite')?.textContent.trim() === 'clicknart');
  if (testimonialTrack && clicknartSlide) testimonialTrack.prepend(clicknartSlide);
  const gavSlide = [...testimonialCarousel.querySelectorAll('.testimonial-slide')].find((slide) => slide.querySelector('cite')?.textContent.trim() === 'gav_solutions');
  if (gavSlide) gavSlide.querySelector('p').textContent = '"Arslan delivered exceptional work with precise attention to detail and top-notch professionalism. Working with him was a breeze thanks to his timely deliveries, great cooperation, and excellent language fluency. Highly RECOMMENDED! \u{1F60A}"';
  testimonialCarousel.querySelectorAll('.testimonial-slide').forEach((slide) => slide.classList.add('splide__slide'));
}

if (testimonialCarousel && window.Splide) {
  const previousButton = testimonialCarousel.querySelector('[data-testimonial-prev]');
  const nextButton = testimonialCarousel.querySelector('[data-testimonial-next]');
  const dotsContainer = testimonialCarousel.querySelector('[data-testimonial-dots]');

  const splide = new Splide(testimonialCarousel, {
    type: 'loop',
    gap: '18px',
    perPage: 3,
    perMove: 1,
    speed: 450,
    arrows: true,
    pagination: false,
    breakpoints: {
      980: { perPage: 2 },
      760: { perPage: 1, gap: '14px' },
    },
  });

  const renderDots = () => {
    dotsContainer.innerHTML = '';
    for (let index = 0; index <= splide.Components.Controller.getEnd(); index += 1) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show testimonial group ${index + 1}`);
      dot.addEventListener('click', () => splide.go(index));
      dotsContainer.append(dot);
    }
  };

  const updateCarousel = () => {
    const currentIndex = splide.index;
    const lastIndex = splide.Components.Controller.getEnd();
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === lastIndex;
    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
      dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  };

  splide.on('mounted resized', () => {
    renderDots();
    updateCarousel();
  });

  previousButton.addEventListener('click', () => splide.go('<'));
  nextButton.addEventListener('click', () => splide.go('>'));
  splide.on('moved', updateCarousel);

  splide.mount();
}

if (testimonialCarousel && !window.Splide) {
  const track = testimonialCarousel.querySelector('.testimonial-track');
  const slides = [...testimonialCarousel.querySelectorAll('.testimonial-slide')];
  const previousButton = testimonialCarousel.querySelector('[data-testimonial-prev]');
  const nextButton = testimonialCarousel.querySelector('[data-testimonial-next]');
  const dotsContainer = testimonialCarousel.querySelector('[data-testimonial-dots]');
  let currentIndex = 0;

  const getVisibleCount = () => {
    if (window.matchMedia('(max-width: 760px)').matches) return 1;
    if (window.matchMedia('(max-width: 980px)').matches) return 2;
    return 3;
  };

  const updateCarousel = () => {
    const lastIndex = Math.max(0, slides.length - getVisibleCount());
    currentIndex = Math.min(currentIndex, lastIndex);
    track.style.setProperty('--carousel-index', currentIndex);
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === lastIndex;
    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
      dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  };

  const rebuildControls = () => {
    dotsContainer.innerHTML = '';
    const pageCount = Math.max(1, slides.length - getVisibleCount() + 1);
    for (let index = 0; index < pageCount; index += 1) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show testimonial group ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.append(dot);
    }
    updateCarousel();
  };

  previousButton.addEventListener('click', () => {
    currentIndex -= 1;
    updateCarousel();
  });
  nextButton.addEventListener('click', () => {
    currentIndex += 1;
    updateCarousel();
  });
  window.addEventListener('resize', rebuildControls);
  rebuildControls();
}

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
