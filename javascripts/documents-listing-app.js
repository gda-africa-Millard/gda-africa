function mountDocApp(el) {
  Vue.createApp({
    data() {
      return {
        asyncUrl: '',
        newsData: [],
        newsYears: [],
        selectedYear: '*',
        archivedValue: null,
        searchText: "*",
        siteUrl: "",
        currentPage: 1,
        totalPages: 0,
        newPage: 1,
        visibleItems: [],
        loading: true,
        swiperLoaded:false
      };
    },
    computed: {
      allYears() {
        return this.newsYears.map(year => year);
      },
      endIndex() {
        return this.newsData.meta?.TotalPage;
      },
      pagings() {
        const start = Math.max(1, this.newPage - 2);
        const end = Math.min(this.totalPages, start + 4);
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
    },
    created() {
      this.asyncUrl = el.getAttribute('data-asyncurl');
      this.fetchData();
    },
    mounted() {
      this.archivedValue = el.getAttribute('data-archivefrom');
      this.fetchData();
    },
    methods: {
      initializeSwiper() {
        const swiperElement = el.querySelector('[data-vue-slider]');
        const prevButton = swiperElement?.querySelector("[data-swiper-button] .arrow-left");
        const nextButton = swiperElement?.querySelector("[data-swiper-button] .arrow-right");
        const slideLength = swiperElement?.querySelectorAll(".swiper-slide").length || 0;
        const slidesPerViewDesktop = 5;
        const slidesPerViewTablet = 4;
        const slidesPerViewMobile = 2;
        const swiper = new Swiper(swiperElement, {
          slidesPerView: slidesPerViewMobile,
          a11y:{
          slideRole:"presentation",
          },
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton
          },
          breakpoints: {
            640: {
              slidesPerView: slidesPerViewMobile,
              enabled: slideLength > slidesPerViewMobile,
            },
            768: {
              slidesPerView: slidesPerViewTablet,
              enabled: slideLength > slidesPerViewTablet,
            },
            1024: {
              slidesPerView: slidesPerViewDesktop,
              enabled: slideLength > slidesPerViewDesktop,
            }
          },
          on: {
            init() {
              hideNavButtons();
            },
            resize() {
              hideNavButtons();
            }
          }
        });
        function hideNavButtons() {
          const viewportWidth = window.innerWidth;
          let slidesPerView = slidesPerViewDesktop;
          if (viewportWidth < 768) {
            slidesPerView = slidesPerViewMobile;
          } else if (viewportWidth < 992) {
            slidesPerView = slidesPerViewTablet;
          }
          if (slideLength <= slidesPerView) {
            nextButton?.classList.add('d-none');
            prevButton?.classList.add('d-none');
          } else {
            nextButton?.classList.remove('d-none');
            prevButton?.classList.remove('d-none');
          }
        }
      },
      fetchData() {
        this.loading = true;
        this.currentPage = 1;
        this.newPage = 1;
        const getYear = this.selectedYear !== "archive" ? this.selectedYear : "*";
        const getArchived = this.selectedYear === "archive" ? this.archivedValue : "*";
        fetch(`${this.asyncUrl}&year=${getYear}&archived=${getArchived}&page=${this.currentPage}`)
          .then(res => res.json())
          .then(res => {
            this.newsData = res;
            this.newsYears = res.facets.years;
            this.newsSubjects = res.facets.subjects;
            this.siteUrl = res.meta.siteUrl;
            this.visibleItems = res.data;
            this.totalPages = res.meta.totalPage;
            this.loading = false;
            if(!this.swiperLoaded){
            this.$nextTick(() => this.initializeSwiper());
            this.swiperLoaded = true;
            }
          })
          .catch(err => console.error("Error fetching data:", err));
      },
      async pagination() {
        this.loading = true;
        const getYear = this.selectedYear !== "archive" ? this.selectedYear : "*";
        const getArchived = this.selectedYear === "archive" ? this.archivedValue : "*";
        await fetch(`${this.asyncUrl}&year=${getYear}&archived=${getArchived}&page=${this.newPage}`)
          .then(res => res.json())
          .then(res => {
            this.newsData = res;
            this.siteUrl = res.meta.siteUrl;
            this.visibleItems = res.data;
            this.loading = false;
          })
          .catch(err => console.error("Error fetching data:", err));
      },
      changePage(action) {
        switch (action) {
          case 'first': this.newPage = 1; break;
          case 'prev': this.newPage = this.newsData.meta.prevPage; break;
          case 'next': this.newPage = this.newsData.meta.nextPage; break;
          case 'last': this.newPage = this.newsData.meta.totalPage; break;
          default: this.newPage = parseInt(action); break;
        }
        this.pagination();
      },
      selectYear(year) {
        if (this.$refs.yearCheckbox) {
          if (year === "*" || year === "archive") {
            this.selectedYear = [];
          } else {
            const yearIndex = this.selectedYear.indexOf(year);
            if (yearIndex !== -1) {
              this.selectedYear.splice(yearIndex, 1);
            } else {
              if (!this.selectedYear.includes("*")) {
                this.selectedYear.push(year);
              } else {
                this.selectedYear = [year];
              }
            }
          }
        } else {
          this.selectedYear = year;
        }
        this.fetchData();
      }
    }
  }).mount(el);
}
document.querySelectorAll('.docapp').forEach((el) => {
  mountDocApp(el);
});
