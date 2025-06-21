$(document).ready(function() {

  var header = jQuery(".header"),
  pos = header.outerHeight();

  var lastScroll = 0;
    // jQuery(window).scroll(function() {
    //     var scroll = jQuery(window).scrollTop();
    //     if (scroll > 5) {
    //         header.addClass("animate");
    //         setTimeout(function() {
    //           header.removeClass('active');
    //           header.addClass('show')
    //         }, 2000);
    //     } else {
    //         header.removeClass("show");
    //     }
    //     // if (scroll > lastScroll) {
    //     //     header.removeClass("show-top");
    //     // } else {
    //     //     header.addClass("show-top");
    //     // }
    //     lastScroll = scroll;
    // });
    jQuery(window).on('scroll', function() {
      var scrollPos = jQuery(this).scrollTop();
      
      if (scrollPos > lastScroll && scrollPos > 5) {
        // 1) Scroll ke bawah dan sudah lebih dari 5px dari atas
        //    → sembunyikan header dengan kelas .animate
        header.removeClass('show').removeClass('headtop').addClass('animate');
        header.addClass('show');
      }
      
      else if (scrollPos < lastScroll) {
        // 2) Scroll ke atas (meski hanya sedikit)
        //    → tampilkan header kembali dengan kelas .show
        header.addClass('show');
      }
      if(scrollPos == 0){
        header.removeClass('animate').removeClass('show').addClass('headtop')
      }
      // if (scrollPos < 5) {
      //   header.removeClass('show');
      //   console.log(scrollPos)
      // }

      // Update posisi scroll terakhir
      lastScroll = scrollPos;
    });

    let counted = false;
    function isInViewport(element) {
      const rect = element[0].getBoundingClientRect();
      var bottom_of_object = element.offset().top + 50;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      return (
        bottom_of_window > bottom_of_object
        // rect.top >= 0 &&
        // rect.left >= 0 &&
        // rect.bottom <= ($(window).height()) 
        // && rect.right <= ($(window).width())
      );
    }
    if($('.about-counter').length > 0){
      function animateCount($el, start, end, duration = 2000) {
          let startTime = null;
    
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            $el.text(current);
    
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              $el.text(end + "+"); // Tambahkan tanda + setelah selesai
            }
          }
    
          window.requestAnimationFrame(step);
        }
    
        function handleScroll() {
          const $section = $(".counter");
    
          if (!counted && isInViewport($section)) {
            counted = true;
    
            $(".counter .number").each(function () {
              const $this = $(this);
              const start = parseInt($this.attr("min")) || 0;
              const end = parseInt($this.attr("max")) || 0;
    
              animateCount($this, start, end);
            });
          }
          console.log(counted)
        }
    
        $(window).on("scroll", handleScroll);
        handleScroll();
  }

    const projectSwiper = new Swiper(".projectSwiper", {
      slidesPerView: 'auto',
      initialSlide: 2,
      spaceBetween: 24,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    const ldSwiper = new Swiper(".ldSwiper", {
      slidesPerView: 1.2,
      spaceBetween: 40,
      navigation: {
        nextEl: ".ld-button-next",
        prevEl: ".ld-button-prev",
      },
    });

    const $swiperWrapper = $(".evpoSwiper .swiper-wrapper");

    $swiperWrapper.each(function(){
      let t = $(this);
      let $slides = $(this).find(".swiper-slide");
      const swiperConfig = {
        slidesPerView: 2.5,
        initialSlide: 2,
        spaceBetween: 24,
        centeredSlides: true,
        loop: true
      };
      console.log($slides.length)
  
      while ($slides.length < 5) {
        $slides.each(function () {
          const $clone = $(this).clone();
          t.append($clone);
        });
        $slides = t.find(".swiper-slide");
      }
      
      const evpoSwiper = new Swiper(".evpoSwiper", swiperConfig);
    })
    // Konfigurasi Swiper
    

    // Inisialisasi Swiper setelah slide mencukupi

  // 1) Inisialisasi Lenis untuk smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
    autoRaf: true
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  let leniscount = 0;
  requestAnimationFrame(raf);


  // 7) Animated text via GSAP/ScrollTrigger
  $('.animate-text h2').each(function() {
    const chars = this.textContent.split('').map(c => `<span class="char">${c}</span>`).join('');
    $(this).html(chars);
  });
  $('.animate-text.misc p').each(function() {
    const chars = this.textContent.split('').map(c => `<span class="char">${c}</span>`).join('');
    $(this).html(chars);
  });
  $('.animate-text').each(function() {
    gsap.to($(this).find('.char'), {
      opacity: 1,
      color: 'white',
      stagger: 0.05,
      scrollTrigger: {
        trigger: this,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true
      }
    });
  });

  // 8) Header fixed/sticky behavior tetap pada window native scroll

  // 9) Section‐eight parallax pindah jadi Lenis
  lenis.on('scroll', () => {    
    const st = lenis.scroll;
    // console.log(st)
  });

    // 4) Stacking dan pinning setiap section
    const sections = $('.homepage-location .location-item');
    sections.each((i, section) => {
      const $this = $(section)
      const $img = $(section).find('img');
      const isLast = i === sections.length - 1;
  
      gsap.set(section, { zIndex: i + 1 });
  
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: isLast 
          ? () => `+=${innerHeight / 3}` 
          : 'bottom top',
        pin: $img[0],
        // pinSpacing: isLast,    // agar section berikutnya tidak overlap
        scrub: true,
        onLeave: () => {
            if (!isLast) lenis.scrollTo(sections[index + 1], { duration: 1 });
            },
            onLeaveBack: () => {
            if (index > 0) lenis.scrollTo(sections[index - 1], { duration: 1 });
        },
        onEnter: () => {
            $this.addClass('active');
            $('.pagination-thumb .thumbloct-item').eq(i).addClass('active');
          },
          onEnterBack: () => {
            $this.addClass('active');            
            $('.pagination-thumb .thumbloct-item').eq(i).addClass('active');
          },
          onLeave: () => {
            $this.removeClass('active');
            $('.pagination-thumb .thumbloct-item').eq(i).removeClass('active');
          },
          onLeaveBack: () => {
            $this.removeClass('active');
            $('.pagination-thumb .thumbloct-item').eq(i).removeClass('active');
          }
      });
    });

    $(window).on('scroll', function() {
      // Hitung tinggi dokumen dan viewport
      var maxScroll = $(document).height() - $(window).height();
      // Posisi scroll saat ini
      var scrollY = $(window).scrollTop();
  
      // Persentase scroll dari 0 ke 1
      var scrollProgress = scrollY / maxScroll;
  
      // Rentang ukuran mask: dari 20% (min) sampai 100% (max)
      var minSize = 48.3;
      var minHSize = 48.3;
      var maxSize = 100;
      var currentSize = minSize + (maxSize - minSize) * scrollProgress * 38;
      var currentSizeH = minHSize + (maxSize - minHSize) * scrollProgress * 38;  
      // Terapkan CSS mask-size secara dinamis
      $('.about-masthead .masthead-img').css({
        'max-height': currentSizeH+'%',
        'max-width': currentSize + '%'
      });

      var windowHeight = $(window).height();

      $('.fund-event .location-item').each(function () {
        var $item = $(this);
        var itemTop = $item.offset().top;
        var itemHeight = $item.outerHeight();
        var triggerPoint = itemTop + (itemHeight * 0.2); // 1/10 dari tinggi elemen
        var distanceFromBottom = $(window).scrollTop() + $(window).height() - $item.offset().top;
        var distanceFromBottom2 = $(window).scrollTop() + $(window).height() - $item.offset().top + 150;

        // Jalankan hanya jika 1/10 dari elemen sudah lewat ke atas viewport
        // if (scrollY + windowHeight > triggerPoint) {
        //   var distanceFromTop = itemTop - scrollY;
        //   var totalScrollable = windowHeight + itemHeight;

        //   var progress = 1 - (distanceFromTop / totalScrollable);
        //   progress = Math.max(0, Math.min(1, progress)); // Clamp 0–1

        //   var parallaxOffset = progress * 100; // Sesuaikan nilai ini sesuai efek
        //   $item.find('.ttb-bg .img').css({
        //     transform: 'translate3d(0, ' + parallaxOffset + 'px, 0) scale(1.2, 1.2)'
        //   });
        // }
        console.log(distanceFromBottom)
        // Jika sudah masuk dari bawah minimal 1/10 tinggi elemen
        if (distanceFromBottom > itemHeight * 0.1) {
          // Jalankan parallax atau animasi di sini
          var progress = distanceFromBottom / (itemHeight + $(window).height());
          progress = Math.max(0, Math.min(1, progress));

          var parallaxOffset = progress * 100;
          $item.find('.ttb-bg .img').css({
            transform: 'translate3d(0, ' + parallaxOffset + 'px, 0) scale(1.2, 1.2)'
          });
        }
        
        if(distanceFromBottom2  > itemHeight * 1.5){
          $item.find('.text-top').removeClass('sticky').addClass('animateUp')
        }else{          
          $item.find('.text-top').addClass('sticky').removeClass('animateUp')
        }
      });
    });

    $('.homepage-location .location-item').each(function(){
      const t = $(this);
      t.on('click', function(){
      const locationId = $(this).data('target');
        $('#' + locationId).removeClass('hidden');
        $('html').addClass('popup-show');
        $('.header').hide();
      })
    })
    $('.location-detail.popup').each(function(){
      const t = $(this)
      const bb = $(this).find('.btn-back');
      bb.on('click', function(){
        t.addClass('hidden')
        $('html').removeClass('popup-show');
        $('.header').show();
      })
    })
  
    // 5) Snap yang lebih lembut
    // ScrollTrigger.create({
    //   snap: {
    //     snapTo: 1 / (sections.length - 1),
    //     duration: { min: 0.3, max: 0.4 },
    //     delay: 0.05,
    //     ease: 'power1.out'
    //   }
    // });

    // const $bottomNav = $('#header-nav');
    // const section1 = document.getElementById('section1');
    // const section2 = document.getElementById('section2');

    // const observer = new IntersectionObserver(
    //   function (entries) {
    //     entries.forEach(function (entry) {
    //       if (entry.isIntersecting) {
    //         $bottomNav.addClass('show');
    //       } else {
    //         // $bottomNav.removeClass('show');
    //       }
    //     });
    //   },
    //   {
    //     threshold: 0.3,
    //   }
    // );
    // observer.observe(section2);

    // const observerUp = new IntersectionObserver(
    //   function (entries) {
    //     entries.forEach(function (entry) {
    //       if (entry.intersectionRatio > 0.5) {
    //         // Section 1 terlihat lebih dari 50%
    //         $bottomNav.removeClass('show');
    //       } else {
    //         // Section 1 kurang dari 50% terlihat (berarti user sudah scroll ke bawah)
    //         // $bottomNav.addClass('show');
    //       }
    //     });
    //   },
    //   {
    //     threshold: [0, 0.5, 1.0],
    //   }
    // );
  
    // if (section1) {
    //   observerUp.observe(section1);
    // } else {
    //   console.warn('#section1 tidak ditemukan');
    // }

    

  
    // 6) Inline SVG unchanged
    $("img.svg").each(function() {
      const $img = $(this);
      $.get($img.attr("src"), (data) => {
        const $svg = $(data).find("svg")
          .attr("id", $img.attr("id")||null)
          .attr("class", ($img.attr("class")||'') + ' replaced-svg')
          .removeAttr("xmlns:a");
        $img.replaceWith($svg);
      }, "xml");
    });
  
    
  
    // 10) Swipers unchanged (gunakan data-lenis-prevent bawaan)
    const hl = $('.homepage-location');
    // const thumbloct = new Swiper(".thumbloct1", {
    //   direction: "vertical",
    //   spaceBetween: 16,
    //   slidesPerView: 4,
    //   freeMode: true,
    //   watchSlidesProgress: true,
    // });
    // const locationSwiper = new Swiper(".locationSwiper", {
    //   effect: "fade",
    //   mousewheel: true,
    //   thumbs: { swiper: thumbloct },
    //   on: {
    //     fromEdge() { hl.attr('data-lenis-prevent', ''); },
    //     reachBeginning() { hl.removeAttr('data-lenis-prevent'); },
    //     reachEnd()      { hl.removeAttr('data-lenis-prevent'); }
    //   }
    // });
    

    // $('.projectSwiper').on('mousemove', function(e) {
    //   $('#cursor-text')
    //     .css({
    //       top: e.pageY + 10 + 'px',
    //       left: e.pageX + 10 + 'px',
    //       display: 'block'
    //     });
    // });
    

    // $('.projectSwiper').on('mouseleave', function() {
    //   $('#cursor-text').hide();
    // });

    $('.homepage-location').on('mousemove', function(e) {
      $('#cursor-text')
        .css({
          top: e.pageY + 10 + 'px',
          left: e.pageX + 10 + 'px',
          display: 'block'
        }).html('See details');
    });
    $('.homepage-location').on('mouseleave', function() {
      $('#cursor-text').hide();
    });

    $('.foot-loct').on('mousemove', function(e) {
      $('#cursor-text')
        .css({
          top: e.pageY + 10 + 'px',
          left: e.pageX + 10 + 'px',
          display: 'block'
        }).html('See maps');
    });
    $('.foot-loct').on('mouseleave', function() {
      $('#cursor-text').hide();
    });

    $('.fd-item').on('mousemove', function(e) {
      $('#cursor-text')
        .css({
          top: e.pageY + 10 + 'px',
          left: e.pageX + 10 + 'px',
          display: 'block'
        }).html('See details');
    });
    $('.fd-item').on('mouseleave', function() {
      $('#cursor-text').hide();
    });
    

    $('.accordion-toggle').click(function () {
      const $thisItem = $(this).closest('.accordion-item');
      const $thisContent = $thisItem.find('.accordion-content');
      const $t = $(this);
      
      $('.accordion-toggle').removeClass('active')
      $t.addClass('active')
      $thisItem.find('.btn-expnd').html('[ - ]')
      // Tutup semua konten
      $('.accordion-content').not($thisContent).slideUp();
      $('.accordion-item').not($thisItem).removeClass('active').find('.btn-expnd').html('[ + ]');

      // Toggle konten saat ini
      $thisContent.slideToggle();
      $thisItem.toggleClass('active');
    });

    $('.pp-wrap .pp-item').each(function(){
      const $this = $(this);
      $this.on('click', function(){
        $('.pp-wrap .pp-item').removeClass('active');
        $this.addClass('active')
      })
    })

  }); // end of document ready
  