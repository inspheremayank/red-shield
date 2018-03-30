

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

var slider = $('.mainSlide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    dots: true
});
/***********************************/
/* Initalise WOW Js */
/**********************************/
new WOW().init();
function excerptContentSlide() {
    $(".excerpt-slideUp").each(function() {
        var userHeight = $(this).find('.content__section-userInfo').outerHeight(true);
        var headingHeight = $(this).find('.content__section-heading').outerHeight(true);
        console.log(userHeight + headingHeight);
        $(this).find('.content__section').css('height', userHeight + headingHeight + 45 + 'px');
    });
    $(".excerpt-slideUp").hover(
    function () {
        var totalHeight = $(this).outerHeight(true);
        var sectionHeight = $(this).find('.content__section-block').outerHeight(true);
        var content = $(this).find('.content__section-description').html();
        
        if ($.trim(content) != '') {
            var height = $(this).find('.content__section-description').outerHeight(true);
            var mainHeight = $(this).find('.content__section').outerHeight(true);
            var showHeight = totalHeight - sectionHeight;

            height = (height > showHeight) ? showHeight : height;
            console.log(height);
            $(this).find('.content__section-description').addClass('active');
            $(this).find('.content__section').css('height', mainHeight + height + 'px');
            $(this).find('.content__section-description').css('height', height + 'px');
        }
    },
    function () {
        var mainHeight = $(this).find('.content__section').outerHeight(true);
        var height = $(this).find('.content__section-description').outerHeight(true);
        console.log(height);
        $(this).find('.content__section').css('height', mainHeight - height + 'px');
        $(this).find('.content__section-description').removeClass('active');
    });
}
excerptContentSlide();