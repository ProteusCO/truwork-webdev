jQuery(function($){
  var SHRINK_POINT = 10,
      $header = $(".l-header");
  $(window).on('scroll', function(evt){
    if ($(window).scrollTop() > SHRINK_POINT){
      $header.addClass('small');
    }
    else {
      $header.removeClass('small');
    }
  });
});