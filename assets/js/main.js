var $ = jQuery.noConflict();

(function($) {
    "use strict";
    
    var width  =  $(window).width();
    var height  =  $(window).height();
    
    /*-------------------------------------------------*/
    /* =  Mobile Hover
    /*-------------------------------------------------*/
    var mobileHover = function () {
        $('*').on('touchstart', function () {
            $(this).trigger('hover');
        }).on('touchend', function () {
            $(this).trigger('hover');
        });
    };

    mobileHover();
    /*-------------------------------------------------*/
    /* =  loader
    /*-------------------------------------------------*/
    Pace.on("done", function(){
        $("#myloader .reveal-first").addClass("is-active");
        $("#myloader .reveal-second").addClass("is-active");
        setTimeout(function(){ 
            $("#myloader .reveal-first, #myloader .reveal-second").fadeOut(500);
        }, 1000);
        setTimeout(function(){ 
            $("#grid .grid-line").addClass('hey');
        }, 1000);
    });
    /*-------------------------------------------------*/
    /* =  Sticky menu
    /*-------------------------------------------------*/
    $(window).on('scroll', function (){

        var scroll  =  $(window).scrollTop();
        var height  =  $(window).height();

        var texttop = $('#intro .text-top');
        var textbottom = $('#intro .text-bottom');
        var social = $('#wrap-social');
        var cookiebanner = $('#intro .cookie-banner');

        if( scroll >= 500 ) {
            cookiebanner.fadeOut();
        }
        
        if(width>991){
            if( scroll >= 1500 ) {
                social.fadeOut();
            } else if(scroll <= height) {
                social.fadeIn();
            } else {
                social.fadeIn();
            }
        }
    });
    /*-------------------------------------------------*/
    /* =  Animation
    /*-------------------------------------------------*/
    window.sr = ScrollReveal();
//    sr.reveal('[data-animation="reveal"]', { 
//        duration: 1000,
//        scale: 1,
//        delay: 0,
//        distance: 0,
//        origin: 'bottom',
//        opacity: 0.1,
//        viewFactor: 0.0,
//    });
    
    if(width<992){
        $(".moove").removeClass("moove");
        //var rellax = new Rellax('.moove-mobile');
    }
    if(width>991){
        var rellax = new Rellax('.moove');
        //$(".moove-mobile").removeClass("moove-mobile");
    }
    $(window).resize(function () {
        var currentwidth  =  $(window).width();
        
        if(currentwidth < 992) {
            rellax.destroy();
        }
        if(currentwidth > 992 && currentwidth != 1024 && currentwidth != 1366) {
            location.reload();
        }
    });
    $(window).on("orientationchange",function(){
        location.reload();
    }); 
    /*-------------------------------------------------*/
    /* =  Share
    /*-------------------------------------------------*/
    try {
        $('#share-this').click('a', function() {
            $('#banner-share').addClass('is-open');
            $('body').addClass('no-scroll'); 
        });
        $('.close-button').click('a', function() {
            $('#banner-share').removeClass('is-open');
            $('body').removeClass('no-scroll'); 
        });
    } catch(err) {

    }
})(jQuery);