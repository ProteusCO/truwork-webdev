jQuery(function($){
    $('.subscribe-form').each(function(){
        var $con = $(this);
        var $form = $con.find('form.miwt-form');
        var $thankyou = $con.siblings('.subscribe-thank-you');

        $form.each(function(){
           this.submit_options = {
               ajax: true,
               processRedirect: function(url) {
                   $con.hide();
                   $thankyou.show();

                   return false;
               }
           }
        });
    });
});