jQuery(function($) {

      var pages = document.getElementsByClassName('page');
      var page_numbers = pages.length;

      var runNumberFlipper = numberFlipper(loadOverlay);

      loadBGImage($('.seattle-photo'), "compressed/img/seattlephoto1.jpg", function() {

        numberFlipperRunner(0, 10, runNumberFlipper);

        loadBGImage($('#work-1 .image-preview'), "compressed/img/work-internship.png", function() {

          numberFlipperRunner(0, 10, runNumberFlipper);

          loadBGImage($('#work-2 .image-preview'), "compressed/img/work-flashstudy.png", function() {

            numberFlipperRunner(0, 10, runNumberFlipper);

            loadBGImage($('#work-3 .image-preview'), "compressed/img/work-fornetix.png", function() {

              numberFlipperRunner(0, 10, runNumberFlipper);

              loadBGImage($('#work-4 .image-preview'), "compressed/img/work-benbridge.png", function() {

                numberFlipperRunner(0, 10, runNumberFlipper);

                loadBGImage($('#work-5 .image-preview'), "compressed/img/work-old-portfolio.png", function() {

                  numberFlipperRunner(0, 10, runNumberFlipper);

                  var image = new Image();
                  image.src = "compressed/img/myphoto2-sm-min.jpg";
                  image.onload = function() {
                    $('.my-photo-container .my-photo-wrapper').append(image);

                    numberFlipperRunner(0, 40, runNumberFlipper);

                    if ($(window).width() > 767) {
                      if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
                        initScroll();
                      }
                    }
                    // disable skrollr if the window is resized below 768px wide
                    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
                      $(window).on('resize', function() {

                        if ($(window).width() <= 780) {
                          skrollr.init().destroy(); // skrollr.init() returns the singleton created above
                        } else {

                          initScroll();
                        }

                      });
                    }

                  };
                  image.onerror = function() {
                    console.error("image loaded unsuccessfully");
                    loadOverlay();
                  };

                });
              });

            });
          });
        });

      });



      function initScroll() {

        var currentPage = {
          number: 1,
          setNumber: function(number) {
            this.number = number;
          },
          getNumber: function() {
            return this.number;
          }
        };

        return skrollr.init({
          smoothScrolling: true,
          smoothScrollingDuration: 1500,
          forceHeight: false,
          easing: {
            easeOutCubic: function(t) {
              return (--t) * t * t + 1;
            }
          },
          constants: {
            //viewport height
            vpheight: function() {
              return $(window).height();
            },

            apheight: function() {
              return $("#about-page").height();
            },
            //work page offset top
            wpstart: function() {
              //Note: you can access the skrollr instance with `this` for things like `this.relativeToAbsolute`
              return $("#work-page").offset().top;
            },
            //work page ending = document ending
            wpend: function() {
              //Note: you can access the skrollr instance with `this` for things like `this.relativeToAbsolute`
              return $("#work-page").offset().top + $("#work-page").height();
            },
            aboutpage: function() {
              return 0.5 * $(window).height();
            },
            workpage: function() {
              return $("#about-page").height() + 0.5 * $(window).height();
            },

            work1: function() {
              return $("#work-page").offset().top + 1 * $(window).height() - 0.5 * $(window).height();
            },
            work2: function() {
              return $("#work-page").offset().top + 2 * $(window).height() - 0.5 * $(window).height();
            },
            work3: function() {
              return $("#work-page").offset().top + 3 * $(window).height() - 0.5 * $(window).height();
            },
            work4: function() {
              return $("#work-page").offset().top + 4 * $(window).height() - 0.5 * $(window).height();
            },
            work5: function() {
              return $("#work-page").offset().top + 5 * $(window).height() - 10 - 0.5 * $(window).height();
            }

          },
          beforerender: function() {
            //arguments[0]

            whichPage(arguments[0]);
          }


        });

        function whichPage(_currentScroll) {


          if ((_currentScroll.curTop >= 0) && (_currentScroll.curTop < 0.5 * $(window).height())) {
            checkPage(1);
          } else if ((_currentScroll.curTop >= 0.5 * $(window).height()) && (_currentScroll.curTop < $("#about-page").height() + 0.5 * $(window).height())) {
            checkPage(2);
          } else if ((_currentScroll.curTop >= $("#about-page").height() + 0.5 * $(window).height()) && (_currentScroll.curTop < $("#work-page").offset().top + 1 * $(window).height() - 0.5 * $(window).height())) {
            checkPage(3);
          } else if ((_currentScroll.curTop >= $("#work-page").offset().top + 1 * $(window).height() - 0.5 * $(window).height()) && (_currentScroll.curTop < $("#work-page").offset().top + 2 * $(window).height() - 0.5 * $(window).height())) {
            checkPage(4);
          } else if ((_currentScroll.curTop >= $("#work-page").offset().top + 2 * $(window).height() - 0.5 * $(window).height()) && (_currentScroll.curTop < $("#work-page").offset().top + 3 * $(window).height() - 0.5 * $(window).height())) {
            checkPage(5);
          } else if ((_currentScroll.curTop >= $("#work-page").offset().top + 3 * $(window).height() - 0.5 * $(window).height()) && (_currentScroll.curTop < $("#work-page").offset().top + 4 * $(window).height() - 0.5 * $(window).height())) {
            checkPage(6);
          } else if ((_currentScroll.curTop >= $("#work-page").offset().top + 4 * $(window).height() - 0.5 * $(window).height()) && (_currentScroll.curTop < $("#work-page").offset().top + 5 * $(window).height() - 10 - 0.5 * $(window).height())) {
            checkPage(7);
          } else if (_currentScroll.curTop >= $("#work-page").offset().top + 5 * $(window).height() - 10 - 0.5 * $(window).height()) {
            checkPage(8);
          }

          function checkPage(_newPage) {


            if (_newPage !== currentPage.getNumber()) {
              changePage(_newPage);
              // console.log("Direction: " + _currentScroll.direction);
              // console.log("Page: " + currentPage.getNumber());

              switch (currentPage.getNumber()) {
                case 1:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-1");
                  break;
                case 2:

                  $('#pagination-rotating-numbers').removeClass().addClass("page-2");
                  break;
                case 3:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-3");
                  break;
                case 4:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-4");
                  break;
                case 5:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-5");
                  break;
                case 6:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-6");
                  break;
                case 7:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-7");
                  break;
                case 8:
                  $('#pagination-rotating-numbers').removeClass().addClass("page-8");
                  break;
                default:

              }
            }
          }

          function changePage(_currentPage) {
            currentPage.setNumber(_currentPage);
          }

        }
      }



      function showWorkInfo() {

        $(".work-info-button").on('click', function() {
          $(this).siblings(".work-content-wrapper").toggleClass('active');

          return false;

        });
      }

      function navigationBars() {
        $('a.nav-line').on('click', function() {

          var target = $(this).attr("href");

          switch (target) {
            case "top-page":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: 0
                },
                ease: Power2.easeOut
              });
              break;
            case "about-page":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#about-page").offset().top
                },
                ease: Power2.easeOut
              });
              break;
            case "work-page":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top
                },
                ease: Power2.easeOut
              });
              break;
            case "work-1":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top + 1 * $(window).height()
                },
                ease: Power2.easeOut
              });
              break;
            case "work-2":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top + 2 * $(window).height()
                },
                ease: Power2.easeOut
              });
              break;
            case "work-3":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top + 3 * $(window).height()
                },
                ease: Power2.easeOut
              });
              break;
            case "work-4":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top + 4 * $(window).height()
                },
                ease: Power2.easeOut
              });
              break;
            case "work-5":
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: $("#work-page").offset().top + 5 * $(window).height()
                },
                ease: Power2.easeOut
              });
              break;
            default:
              TweenMax.to(window, 1, {
                scrollTo: {
                  y: 0
                },
                ease: Power2.easeOut
              });
          }

          return false;

        });
        $('div.scroll-down').on('click', function() {
          TweenMax.to(window, 1, {
            scrollTo: {
              y: $("#about-page").offset().top
            },
            ease: Power2.easeOut
          });
        });
      }

      function typeIt() {
        $('.type-it').typeIt({
          strings: [
            "I'm a Seattle-based <span class='nowrap'>UI/UX engineer</span> with <span class='nowrap mark'>5 years</span> <span class='nowrap'>of experience</span>...",
            "I'm currently working on some cool projects at VMware 💚",
            "I'm a Seattle-based <span class='nowrap'>UI/UX engineer</span> with <span class='nowrap mark'>5 years</span> <span class='nowrap'>of experience</span>."
          ],
          speed: 50,
          startDelay: 1500,
          lifeLike: false,
          breakLines: false,
          cursor: true,
          breakDelay: 1500
        });
      }

      function numberFlipper(callback) {

        var number = 0;

        return function(limit) {

          number++;

          document.getElementById("percent-number").innerHTML = number;

          if (number == 100) {
            callback();
          }

        };

      }

      function numberFlipperRunner(begin, end, order) {
        if (begin < end) {

          order();

          setTimeout(function() {
            numberFlipperRunner(begin + 1, end, order);
          }, 25);
        }
      }


      function loadOverlay() {

        $('.loading-percent ').addClass('over');


        TweenMax.to($('#overlay-loader'), 1, {
          x: '-100%',
          delay: 0.5,
          onComplete: loadAnimationStack(1, 2),
          ease: Expo.easeOut
        });
      }


      function loadAnimationStack(loadDelay, easingSpeed) {

        basicLoadAnimation($('.logo'), Expo.easeOut, easingSpeed, loadDelay, '0px', '30px', 0, 0, logoAnimation, null);
        basicLoadAnimation($('.email'), Expo.easeOut, easingSpeed, loadDelay + 0.2, '0px', '30px', 0, 0, null, null);
        basicLoadAnimation($('.social-media-buttons'), Expo.easeOut, easingSpeed, loadDelay + 0.4, '0px', '30px', 0, 0, null, null);
        basicLoadAnimation($('.copyright'), Expo.easeOut, easingSpeed, loadDelay + 0.6, '0px', '30px', 0, 0, null, null);
        basicLoadAnimation($('.navigation'), Expo.easeOut, easingSpeed, loadDelay + 0.6, '-20px', '0px', 0, 0, null, null);
        basicLoadAnimation($('.pagination'), Expo.easeOut, easingSpeed, loadDelay + 0.6, '0px', '-85%', 0, 0, null, null);
        basicLoadAnimation($('#top-page .seattle-photo'), Expo.easeOut, easingSpeed, loadDelay, '-50%', '0px', 0, 0, function() {
          $('#overlay-loader').hide();
        }, null);


        showWorkInfo();
        typeIt();
        navigationBars();



      }

      function logoAnimation() {
        var degree = 0;

        TweenMax.to($('.logo img'), 0.5, {
          rotation: "+=90",
          transformOrigin: '50% 50%',
          delay: 5,
          onComplete: logoAnimation,
          ease: Circ.easeOut
        });

      }



      function basicLoadAnimation(element, easing, easingSpeed, delay, x, y, alpha, angle, onCompleteFn, startTime) {

        TweenMax.from(element, easingSpeed, {
          x: x,
          y: y,
          rotation: angle,
          alpha: alpha,
          ease: easing,
          force3D: true,
          delay: delay,
          onComplete: onCompleteFn
        }, startTime);
      }


      function loadBGImage(element, url, successfulCallback) {
        successfulCallback = successfulCallback || null;
        $.ajax({
          url: url,
          timeout: 10000,

          success: function(data, imageUrl, textStatus, jqXHR) {


            element.css('background-image', 'url(' + url + ')');
            successfulCallback();
          },

          error: function(data, jqXHR, textStatus, errorThrown) {

            console.error(errorThrown);

          }
        });
      }

});
