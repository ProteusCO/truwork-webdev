jQuery(function($){
  var $mobileNavBtn = $(".mobile-nav");
  var $fullNav = $(".main-nav");
  var OPEN_CLASS = "open";
  
  $mobileNavBtn.on("click", function(evt) {
    if ($mobileNavBtn.hasClass(OPEN_CLASS)){
      $fullNav.removeClass(OPEN_CLASS);
    }
    else {
      $fullNav.addClass(OPEN_CLASS);
    }
    $mobileNavBtn.toggleClass(OPEN_CLASS);
  });
});