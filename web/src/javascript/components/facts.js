jQuery(function($){
  var CSS_SHOW_CLASS = "show";
  var CSS_ACTIVE_CLASS = "active";
  var CSS_INACTIVE_CLASS = "inactive";
  var CSS_PREVIOUS_CLASS = "prev";
  var CSS_NEXT_CLASS = "next";
  var CSS_CURRENT_CLASS = "current";
  var RESIZE_THROTTLE_TIME = 200;
  var MOBILE_BREAKPOINT = 1024;

  var resizeThrottleId;
  var transitionProperty = Modernizr.csstransforms ? "transform" : "left";
  $(".l-research .scrollpane .clear-float").remove();

  $('.l-research .fact-slides').each(function(){
    var $con = $(this);
    var conWidth = $con.width();

    $con.wrapInner('<div class="wrapper"></div>');
    var $wrapper = $(".wrapper");
    $wrapper.wrapInner('<div class="scrollpane"></div>');
    var $scrollPane = $(".scrollpane");

    var $slides = $con.find('.fact');
    var curSlideIdx = 0;
    var slideWidth = conWidth;

    var $nav = $('<ul class="nav" />');
    var $prev = $('<div class="navi prev"><span></span></div>').appendTo($nav);
    var $next = $('<div class="navi next"><span></span></div>').appendTo($nav);

    function addResizeWatcher() {
      $(window).on('resize', function() {
        clearTimeout(resizeThrottleId);
        resizeThrottleId = setTimeout(function() {
          conWidth = $con.width();
          updatePhysicalSlideWidth();
          moveSlide();
        }, RESIZE_THROTTLE_TIME);
      });
    }

    function updatePhysicalSlideWidth() {
      if ($(window).width() < MOBILE_BREAKPOINT) {
        slideWidth = (conWidth - 40);
      }
      else {
        slideWidth = conWidth;
      }
      $slides.width(slideWidth);
      $slides.css('width', slideWidth)
    }

    function setupSlides() {
      $con.addClass('rotating-slider');
      $nav.prependTo($con);
      $nav.wrap('<div class="nav_con" />');

      var curSlideIdx = 0;
      $con.eq(curSlideIdx).addClass('current');
      slideWidth = $con.width();

      updatePhysicalSlideWidth();

      $nav.on('click', '.navi.next', function(evt){
        nextSlide("left");
      });

      $nav.on('click', '.navi.prev', function(evt){
        nextSlide("right");
      });

      $con.on("swipeleft", function(event) {
        nextSlide("left");
      });

      $con.on("swiperight", function(event) {
        nextSlide("right");
      });

      $con.on("movestart", function(e) {
        // allows swipe up and down on mobile
        if ((e.distX > e.distY && e.distX < -e.distY) ||
            (e.distX < e.distY && e.distX > -e.distY)) {
          e.preventDefault();
        }
      });
    }

    function nextSlide(direction) {
      if (direction == "left" && (curSlideIdx + 1) < $slides.length) {
        curSlideIdx++;
      }
      else if (direction == "right" && curSlideIdx > 0) {
        curSlideIdx--;
      }

      moveSlide();

      setOrderClasses();

      setupNav();
    }

    function moveSlide() {
      var transitionValue = -(slideWidth*curSlideIdx);
      if (Modernizr.csstransforms) {
        transitionValue = "translateX(" + transitionValue + "px)";
      }
      $scrollPane.css(transitionProperty, transitionValue);
    }


    function setOrderClasses() {
      if ((curSlideIdx + 1) >= $slides.length) $con.removeClass(CSS_NEXT_CLASS);
      else $con.eq(curSlideIdx + 1).addClass(CSS_NEXT_CLASS).siblings().removeClass(CSS_NEXT_CLASS);

      if (curSlideIdx == 0) $con.removeClass(CSS_PREVIOUS_CLASS);
      else $con.eq(curSlideIdx - 1).addClass(CSS_PREVIOUS_CLASS).siblings().removeClass(CSS_PREVIOUS_CLASS);

      $con.eq(curSlideIdx).addClass(CSS_CURRENT_CLASS).siblings().removeClass(CSS_CURRENT_CLASS);
    }

    function setupNav() {
      if ((curSlideIdx + 1) >= $slides.length) $next.addClass(CSS_INACTIVE_CLASS);
      else $next.removeClass(CSS_INACTIVE_CLASS);

      if (curSlideIdx == 0) $prev.addClass(CSS_INACTIVE_CLASS);
      else $prev.removeClass(CSS_INACTIVE_CLASS);
    }

    setupSlides();
    addResizeWatcher();
  });

});