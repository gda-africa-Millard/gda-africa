export function heroCarousel(elements) {
  elements.forEach(element => {
    const swiperWrapper = element.querySelector('[data-hero-swiper]');
    
    if (!swiperWrapper) return;

    // Initialize main hero carousel
    const mainSwiper = new Swiper(swiperWrapper, {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: element.querySelector('[data-arrow-button].icon-chevron-right'),
        prevEl: element.querySelector('[data-arrow-button].icon-chevron-left'),
      },
      on: {
        init: function() {
          updateCarouselCounter(element, this);
        },
        slideChange: function() {
          updateCarouselCounter(element, this);
        },
      },
    });

    // Initialize thumbnail carousel if exists
    const galleryThumbs = element.parentElement?.querySelector('[gallery-thumbs]');
    if (galleryThumbs) {
      const thumbsSwiper = new Swiper(galleryThumbs, {
        direction: 'vertical',
        loop: true,
        spaceBetween: 10,
        slidePerView: 'auto',
        watchSlidesProgress: true,
      });

      // Link main carousel to thumbnail carousel
      mainSwiper.controller.control = thumbsSwiper;
      thumbsSwiper.controller.control = mainSwiper;
    }
  });

  function updateCarouselCounter(element, swiperInstance) {
    const currentEl = element.querySelector('[data-carousel-current]');
    const totalEl = element.querySelector('[data-carousel-total]');
    
    if (currentEl) {
      currentEl.textContent = (swiperInstance.realIndex % swiperInstance.slides.length) + 1;
    }
    
    if (totalEl) {
      totalEl.textContent = swiperInstance.slides.length;
    }
  }
}
