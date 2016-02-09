jQuery(function($){

    function hostedVideoInit($this) {
        var video = $this.data('video');
        var videoType = $this.data('type');
        var src = 'src="'+video+'"';
        var type = ' type="'+videoType+'"';

        $this.on('click', function(event) {
            event.preventDefault();
            var $video = $('<video class="video-js vjs-default-skin" preload="auto" width="640" height="360" data-setup=\'{ "techOrder": ["html5"]}\'><source '+src+type+'></source></video>');
            var $videoCon = $('<div class="video-con" />').append($video);

            $.fancybox($videoCon,{
                autoSize: false,
                maxWidth: 640,
                maxHeight: 360,
                padding: 10,
                scrolling: 'no',
                beforeShow: function() {
                    if($video.length) {
                        videojs($video.get(0), {"controls": true}, function () {
                            this.play();
                        });
                    }
                }
            });
        });
    }

    function youTubeVideoInit($this) {

        $this.on('click', function(event) {
            event.preventDefault();

            $.fancybox({
                'padding'		: 0,
                'autoScale'		: false,
                'transitionIn'	: 'none',
                'transitionOut'	: 'none',
                'width'		    : 600,
                'height'		: 400,
                'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                'type'			: 'swf',
                'swf'			: {
                    'wmode'		: 'transparent',
                    'allowfullscreen'	: 'true'
                }
            });
        });
    }

    function init() {
         $(".banner_slide a.video").each(function(){
             var $this = $(this);
            if($this.hasClass('youtube-link')) {
                youTubeVideoInit($this);
            }
            else {
                hostedVideoInit($this);
            }
        });
    }
    init();
});