

var start = $('.header').offset().top;

$.event.add(window, "scroll", function () {
    var p = $(window).scrollTop();
    if (p > start) {
        $('.header').addClass('header__fixed');
    } else {
        $('.header').removeClass('header__fixed');
    }
});
$('.banner__section.video .play-icon').on('click', function() {
    $('[data-fancybox]').fancybox();
});
/***********************************/
/* Initalise WOW Js */
/**********************************/
new WOW().init();