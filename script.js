// ==========================================================================
// Khundhan.com - Hero Image Carousel Slider & Sync Controls
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const sliderBox = document.getElementById('heroSlider');
  const pillItems = document.querySelectorAll('.collection-pill-item');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoSlideInterval = null;
  const slideDuration = 4000; // 4 seconds per slide

  function showSlide(index) {
    // Wrap around index
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    // Update slides classes
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    // Update dots classes
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // Next / Prev Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoSlide();
    });
  });

  // Clicking right-side collection pills slides directly to the matching item
  pillItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetIndex = parseInt(item.getAttribute('data-goto'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        startAutoSlide();
      }
    });
  });

  // Pause on hover
  if (sliderBox) {
    sliderBox.addEventListener('mouseenter', stopAutoSlide);
    sliderBox.addEventListener('mouseleave', startAutoSlide);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderBox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    sliderBox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoSlide();
    }, { passive: true });
  }

  // Start auto-play
  startAutoSlide();
});
