if (!customElements.get('carousel-component')) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      this.carouselElement = this;
  
      // Carousel element should have class splide
      if (!this.carouselElement.classList.contains('splide')) return;
  
      this.desktopPerPage = this.carouselElement.dataset['desktopperpage'] || 4;
      this.mobilePerPage = this.carouselElement.dataset['mobileperpage'] || 1;
      this.desktopPerMove = this.carouselElement.dataset['desktoppermove'] || 1;
      this.mobilePerMove = this.carouselElement.dataset['mobilepermove'] || 1;
      this.focus = this.carouselElement.dataset['focus'] || 'center';
      this.type = this.carouselElement.dataset['type'] || 'loop';
      this.gap = this.carouselElement.dataset['gapbetweenslides'] || 10;
      this.desktopgap = this.carouselElement.dataset['desktopslidegap'] || 48;
      this.mobilegap = this.carouselElement.dataset['mobileslidegap'] || 24 ;
      this.autoplaySpeed = parseInt(this.dataset['autoplaySpeed']) || 3000;
  
      // Data attribute string matching for correct boolean value
      // The fallback is used if the developer make mistake the code is forgiving
      // Read more here https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
      this.showarrows = this.carouselElement.dataset['showarrows'] === 'true' || false;
      this.autoplay = this.carouselElement.dataset['autoplay'] === 'true' || false;
      this.showarrowsonmobile = this.carouselElement.dataset['showarrowsonmobile'] === 'true' || false;
      this.showdots = this.carouselElement.dataset['showdots'] === 'true' || false;
      this.showdotsonmobile = this.carouselElement.dataset['showdotsonmobile'] === 'true' || false;
      this.isNavigation = this.carouselElement.dataset['isnavigation'] === 'true' || false;
      this.disableDrag = this.carouselElement.dataset['disabledrag'] === 'true' || false;
      this.sync = this.carouselElement.dataset['carouselsyncselector'] || false;
  
      this.initCarousel();
    }
  
    initCarousel() {
      // More option available here https://splidejs.com/documents/
      // This slider can be customized as require check the above doc before adding any new 
      // Slider library.
      this.carousel = new Splide(this.carouselElement, {
        perPage: this.desktopPerPage,
        perMove: this.desktopPerMove,
        type: this.type,
        focus: this.focus,
        autoplay: this.autoplay,
        interval: this.autoplaySpeed,
        gap: this.desktopgap,
        arrows: this.showarrows,
        pagination: this.showdots,
        isNavigation: this.isNavigation,
        drag: !this.disableDrag,
        breakpoints: {
          767: {
            perPage: this.mobilePerPage,
            perMove: this.mobilePerPage,
            gap: this.mobilegap,
            arrows: this.showarrowsonmobile,
            pagination: this.showdotsonmobile,
            drag: true,
            paginationOptions: {
              perPage: 5    // Number of dots per page
            }
          }
        },
      });
  
      if (this.sync) {
        this.initCarouselSync()
      } else {
        this.carousel.mount();
      }
    }
  
    initCarouselSync() {
      this.syncElement = document.querySelector(this.sync);
  
      this.carouselSync = new Splide(this.sync, {
        updateOnMove: true,
        perPage: this.syncElement.dataset['desktopperpage'] || 4,
        gap: this.syncElement.dataset['desktopslidegap'] || 0,
        type: this.syncElement.dataset['type'] || 'loop',
        focus: this.syncElement.dataset['focus'] || 'center',
        isNavigation: this.syncElement.dataset['isnavigation'] === 'true' || false,
        pagination: false,
        arrows: this.syncElement.dataset['showarrows'] === 'true' || false,
        drag: true,
        height: this.getPrimarySlideFirstImageHeight(),
        direction : 'ttb',
        autoHeight: true,
        breakpoints: {
          767: {
            direction : this.syncElement.dataset['mobileDirection'] || 'ltr',
            autoHeight: false,
            perPage: 4,
            height: false,
            arrows: false
          }
        },
      });
  
      this.carousel.sync(this.carouselSync);
      this.carousel.mount();
      this.carouselSync.mount();
    };
  
    refreshSlider() {
      this.carousel.refresh();
      if (this.carouselSync) {
        this.carouselSync.refresh();
      }
    }
  
    getPrimarySlideFirstImageHeight() {
      const image = this.querySelector('.splide__list img');
      var containerWidth = this.querySelector('.splide__list').clientWidth;
  
      // Get the original width and height of the image
      var originalWidth = image.getAttribute('width');
      var originalHeight = image.getAttribute('height');
  
      // Calculate the scaled height to fit within the container
      return (containerWidth / originalWidth) * originalHeight;
    }
  }
  window.Carousel = Carousel;
  customElements.define('carousel-component', Carousel);
}
