document.addEventListener('DOMContentLoaded', function () {
  const heroSwiper = new Swiper('.bannerSwiper ', {
    slidesPerView: 1,
    spaceBetween: 18,
    loop: false,
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });
  const loanSwiper = new Swiper('.loan-offer-swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.loan-next',
      prevEl: '.loan-prev',
    },
    pagination: {
      el: ".loan-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 16 },
      576: { slidesPerView: 2, spaceBetween: 24, },
      1024: { slidesPerView: 3, spaceBetween: 24, },
    }
  });

  const ntoiceSwiper = new Swiper('.notice-swiper', {
    slidesPerView: 2,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.notice-next',
      prevEl: '.notice-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 24 },
      768: { slidesPerView: 2, spaceBetween: 24, },
      1024: { slidesPerView: 2, spaceBetween: 24, }
    }
  });

  const articleSwiper = new Swiper('.article-swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.article-next',
      prevEl: '.article-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 8 },
      768: { slidesPerView: 2, spaceBetween: 24, },
      1024: { slidesPerView: 3, spaceBetween: 24, }
    }
  });

  const videoSwiper = new Swiper('.video-swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.video-next',
      prevEl: '.video-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 8 },
      768: { slidesPerView: 2, spaceBetween: 24, },
      1024: { slidesPerView: 3, spaceBetween: 24, }
    }
  });
  const utilitySwiper = new Swiper('.utility-swiper', {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: false,
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 24, },
      1024: { slidesPerView: 4, spaceBetween: 24, }
    }
  });


  // $('.tab').click(function () {
  //   var $clickedTab = $(this);
  //   var $parentContainer = $clickedTab.closest('.tab-container');
  //   var index = $clickedTab.index();

  //   $parentContainer.find('.tab').removeClass('active').attr("aria-selected", "false").attr("tabindex", "-1");
  //   $clickedTab.addClass('active').attr("aria-selected", "true").attr("tabindex", "0").focus();
  //   $parentContainer.find('.content').removeClass('active');
  //   $parentContainer.find('.content').eq(index).addClass('active');
  // });

  // $('.tab').keydown(function (e) {
  //   var currentIndex = $('.tab').index($(this));

  //   if (e.key === "ArrowRight") {
  //     var nextIndex = (currentIndex + 1) % $('.tab').length;
  //     $('.tab').eq(nextIndex).click();
  //   } else if (e.key === "ArrowLeft") {
  //     var prevIndex = (currentIndex - 1 + $('.tab').length) % $('.tab').length;
  //     $('.tab').eq(prevIndex).click();
  //   }
  // });



  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const clickedTab = this;
      const parentContainer = clickedTab.closest('.tab-container');
      const tabContainer = parentContainer.querySelector('.tabs') || parentContainer;
      const allTabs = Array.from(tabContainer.querySelectorAll('.tab'));
      const index = allTabs.indexOf(clickedTab);

      allTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      clickedTab.classList.add('active');
      clickedTab.setAttribute('aria-selected', 'true');
      clickedTab.setAttribute('tabindex', '0');
      clickedTab.focus();


      const contents = parentContainer.querySelectorAll('.content');
      contents.forEach(content => content.classList.remove('active'));
      if (contents[index]) {
        contents[index].classList.add('active');
      }
    });


    tab.addEventListener('keydown', function (e) {
      const parentContainer = this.closest('.tab-container');
      const tabContainer = parentContainer.querySelector('.tabs') || parentContainer;
      const allTabs = Array.from(tabContainer.querySelectorAll('.tab'));
      const currentIndex = allTabs.indexOf(this);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % allTabs.length;
        allTabs[nextIndex].click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
        allTabs[prevIndex].click();
      }
    });
  });



  const toggleBtn = document.getElementById('toggleNotice');
  const noticeWrap = document.querySelector('.notice-wrap');
  const impNoticeSection = document.querySelector('.impNotice-section');
  toggleBtn.addEventListener('click', function () {
    const isVisible = noticeWrap.classList.contains('visible');

    if (isVisible) {
      noticeWrap.classList.remove('visible');
      toggleBtn.textContent = 'Show';
      toggleBtn.classList.remove('active');
      impNoticeSection.classList.remove('expanded');
    } else {
      noticeWrap.classList.add('visible');
      toggleBtn.textContent = 'Hide';
      toggleBtn.classList.add('active');
      impNoticeSection.classList.add('expanded');
    }
  });


  document.getElementById('openAlertBtn').addEventListener('click', function () {
    document.getElementById('utility-popup').style.display = 'flex';
    document.querySelector('#utility-popup .alert-box').focus();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });


  document.getElementById('closeAlertBtn').addEventListener('click', function () {
    document.getElementById('utility-popup').style.display = 'none';
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';
  });


  document.querySelectorAll('.agree-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('utility-popup').style.display = 'none';
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
    });
  });


  document.addEventListener('keydown', function (e) {
    const alertDialog = document.getElementById('utility-popup');
    if ((e.key === 'Escape' || e.key === 'Enter') && alertDialog.style.display !== 'none' && alertDialog.style.display !== '') {
      alertDialog.style.display = 'none';
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
    }
  });

  const scrollBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });
  });



});
