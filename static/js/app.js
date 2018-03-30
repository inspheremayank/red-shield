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
$('.article__main-content figure').each(function () {
    if ($(this).attr('style') !== undefined) {
        
    } else {
        $(this).after('<div class="clearfix"></div>');
    }
});

$('.article__main-content figure figcaption').each(function(){
    if (!$(this).text().trim().length > 0) {
        $(this).addClass("d-none");
    }
});
$(".regular").slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 880,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 585,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});
var slider = $('.mainSlide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    dots: true,
    responsive: [
    {
      breakpoint: 767,
      settings: {
        dots: false,
        arrows: true
      }
    }
    ]
});
/***********************************/
/* Initalise WOW Js */
/**********************************/
new WOW().init();