document.addEventListener('DOMContentLoaded', function () {
    const hamMenu = document.querySelector('.ham-menu');
    const navList = document.querySelector('.nav-links');
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);

    //navbar
    hamMenu.addEventListener('click', function () {
        hamMenu.classList.toggle('active');
        navList.classList.toggle('active');
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // $('.loan-tab').click(function () {
    //     var index = $(this).index()

    //     $('.loan-tab').removeClass('active').attr("aria-selected", "false").attr("tabindex", "-1");
    //     $(this).addClass('active').attr("aria-selected", "true").attr("tabindex", "0").focus();

    //     $('.loanTab-content').removeClass('active')
    //     $('.loanTab-content').eq(index).addClass('active')

    // });

    // $('.blog-tab').click(function () {
    //     var index = $(this).index();

    //     $('.blog-tab').removeClass('active').attr("aria-selected", "false").attr("tabindex", "-1");
    //     $(this).addClass('active').attr("aria-selected", "true").attr("tabindex", "0").focus();

    //     $('.blogs-wrapper').removeClass('active')
    //     $('.blogs-wrapper').eq(index).addClass('active')

    // });

    // $('.top-loan-tab').click(function () {
    //     var index = $(this).index();

    //     $('.top-loan-tab').removeClass('active').attr("aria-selected", "false").attr("tabindex", "-1");
    //     $(this).addClass('active').attr("aria-selected", "true").attr("tabindex", "0").focus();

    //     $('.top-loans-content').removeClass('active')
    //     $('.top-loans-content').eq(index).addClass('active')

    // });


    // $('.col-title').click(function () {
    //     var isExpanded = $(this).attr('aria-expanded') === 'true';
    //     $('.footer-links ').not($(this).next()).slideUp();
    //     $('.col-title').not(this).attr('aria-expanded', 'false').find('.icon').removeClass('active');
    //     $(this).next('.footer-links ').slideToggle();
    //     $(this).attr('aria-expanded', !isExpanded);
    //     $(this).toggleClass('active', !isExpanded);
    // });
    // document.querySelectorAll('.col-title').forEach(function (title) {
    //     title.addEventListener('click', function () {
    //         var isExpanded = this.getAttribute('aria-expanded') === 'true';

    //         // Collapse all other sections
    //         document.querySelectorAll('.col-title').forEach(function (otherTitle) {
    //             if (otherTitle !== title) {
    //                 otherTitle.setAttribute('aria-expanded', 'false');
    //                 otherTitle.classList.remove('active');
    //                 var otherLinks = otherTitle.nextElementSibling;
    //                 if (otherLinks && otherLinks.classList.contains('footer-links')) {
    //                     otherLinks.style.display = 'none';
    //                 }
    //             }
    //         });

    //         // Toggle the clicked section
    //         var footerLinks = this.nextElementSibling;
    //         if (footerLinks && footerLinks.classList.contains('footer-links')) {
    //             if (isExpanded) {
    //                 footerLinks.style.display = 'none';
    //             } else {
    //                 footerLinks.style.display = 'block';
    //             }
    //         }

    //         this.setAttribute('aria-expanded', !isExpanded);
    //         this.classList.toggle('active', !isExpanded);
    //     });
    // });

    // document.querySelectorAll('.col-title').forEach(function (title) {
    //     title.addEventListener('click', function () {
    //         var isExpanded = title.getAttribute('aria-expanded') === 'true';


    //         document.querySelectorAll('.col-title').forEach(function (otherTitle) {
    //             if (otherTitle !== title) {
    //                 otherTitle.setAttribute('aria-expanded', 'false');
    //                 otherTitle.classList.remove('active');

    //                 var otherContent = otherTitle.nextElementSibling;
    //                 if (otherContent && otherContent.classList.contains('footer-links')) {
    //                     otherContent.style.display = 'none';
    //                 }
    //             }
    //         });


    //         var content = title.nextElementSibling;
    //         if (content && content.classList.contains('footer-links')) {
    //             if (isExpanded) {
    //                 content.style.display = 'none';
    //             } else {
    //                 content.style.display = 'block';
    //             }
    //         }


    //         title.setAttribute('aria-expanded', !isExpanded);
    //         title.classList.toggle('active', !isExpanded);
    //     });
    // });
    // Step 1: Select all .col-title elements
    document.querySelectorAll('.col-title').forEach(function (title) {
        title.setAttribute('tabindex', '0');

        function toggleAccordion() {
            var isExpanded = title.getAttribute('aria-expanded') === 'true';

            // Step 2: Collapse all other sections
            document.querySelectorAll('.col-title').forEach(function (otherTitle) {
                if (otherTitle !== title) {
                    otherTitle.setAttribute('aria-expanded', 'false');
                    otherTitle.classList.remove('active');

                    var otherContent = otherTitle.nextElementSibling;
                    if (otherContent && otherContent.classList.contains('footer-links')) {
                        otherContent.style.display = 'none';
                    }
                }
            });

            // Step 3: Toggle this section
            var content = title.nextElementSibling;
            if (content && content.classList.contains('footer-links')) {
                content.style.display = isExpanded ? 'none' : 'block';
            }

            // Step 4: Update aria-expanded and class
            title.setAttribute('aria-expanded', !isExpanded);
            title.classList.toggle('active', !isExpanded);
        }

        // Step 5: Add click and keydown (Enter) event listeners
        title.addEventListener('click', toggleAccordion);

        title.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault(); // Prevent scrolling or default behavior
                toggleAccordion();
            }
        });
    });


    document.querySelectorAll('.nav-item').forEach(function (item) {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        link.setAttribute('tabindex', '0');

        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllDropdownsExcept(item);
            const isOpen = dropdown.classList.contains('open');
            dropdown.classList.toggle('open', !isOpen);
        });


        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                closeAllDropdownsExcept(item);
                const isOpen = dropdown.classList.contains('open');
                dropdown.classList.toggle('open', !isOpen);
            }
            if (e.key === 'ArrowDown') {
                if (dropdown) {
                    dropdown.classList.add('open');
                    const firstItem = dropdown.querySelector('a');
                    if (firstItem) firstItem.focus();
                }
            }
        });

        if (dropdown) {
            dropdown.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    });


    function closeAllDropdownsExcept(currentItem) {
        document.querySelectorAll('.nav-item').forEach(function (item) {
            if (item !== currentItem) {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) dropdown.classList.remove('open');
            }
        });
    }

    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
            menu.classList.remove('open');
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
                menu.classList.remove('open');
            });
        }
    });

});