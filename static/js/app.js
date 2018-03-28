

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

// Begin Card truncate
$(document).ready(function () {
    $('.content__section-heading').ellipsis({
        responsive: true,
        lines: 2
    });
    $('.text__dotdot').ellipsis({
        responsive: true,
        lines: 3
    });
    $('.card__view.single .text__dotdot').ellipsis({
        responsive: true,
        lines: 5
    });
});
/***********************************/
/* Initalise WOW Js */
/**********************************/
new WOW().init();