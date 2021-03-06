var HomeController = (function ($) {
    return {
        listing: function () {
            HomeController.Listing.init();
        },
        blog: function () {
            HomeController.Blog.init();
        },
        article: function () {
            HomeController.Article.init();
        }
    };
}(jQuery));

HomeController.Listing = (function ($) {
    var contentHeight;
    var bindPinUnpinArticle = function () {
        $('.PinArticleBtn').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var obj = $(this);
            var articleId = parseInt($(obj).data('id'));
            var position = parseInt($(obj).data('position'));
            var existingStatus = $(obj).data('status');
            var isSocial = $(obj).data('social');
            $.fn.pinUnpinArticle({
                articleId: articleId,
                isPinned: existingStatus,
                position: position,
                isSocialArticle: isSocial,
                onSuccess: function (data) {
                    $(obj).data('status', ((existingStatus == 1) ? 0 : 1));
                    (existingStatus == 1) ? $(obj).removeClass('selected') : $(obj).addClass('selected');
                    var status = $(obj).data('status');
                    (status == 1)
                            ? $(obj).attr('title', 'Un-Pin Article')
                            : $(obj).attr('title', 'Pin Article');
                    (status == 1)
                            ? $(obj).find('i').first().html('UN-PIN')
                            : $(obj).find('i').first().html('PIN');
                    var message = (status == 1)
                            ? 'Article pinned successfully'
                            : 'Article unpinned successfully';
							
					noty({
                        type: 'success',
                        text: message,
                        layout: 'topRight',
                        timeout: 2000,
                        dismissQueue: true,
                        animation: {
                            open: 'animated bounceInRight', // jQuery animate function property object
                            close: 'animated bounceOutRight', // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        }
                    });
                },
                beforeSend: function () {
                    $(obj).find('.fa').addClass('fa fa-spin fa-spinner').removeClass('fa-map-marker');
                },
                onComplete: function () {
                    $(obj).find('.fa').removeClass('fa-spin fa-spinner').addClass('fa-map-marker');
                }
            });
        });
    };

    var bindDeleteHideArticle = function () {
        $('.HideBlogArticle').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var obj = $(this);
            var isSocial = $(obj).data('social');
            var articleGuid = $(obj).data('guid');		
            var msgStr = (isSocial == 1) ? "Do you really want to delete this article?" : "Do you really want to hide this article?";
            var result = confirm(msgStr);
            if (result !== true) {
                    return;
            }
            $.fn.deleteArticle({
                articleGuid: articleGuid,
                isSocialArticle: isSocial,
                onSuccess: function (data) {
                    $(obj).closest('div.card__view').remove();
                },
                beforeSend: function (obj) {
                }
            });
        });
    };
    
    var excerptContentSlide = function() {
        $(".excerpt-slideUp").each(function() {
            var userHeight = $(this).find('.content__section-userInfo').outerHeight(true);
            var headingHeight = $(this).find('.content__section-heading').outerHeight(true);
            var totalHeight = parseInt(userHeight) + parseInt(headingHeight) + 45;
            $(this).find('.content__section').css('height', totalHeight + 'px');
        });

        var reqObj = null;
        $(".excerpt-slideUp").hover(
            function () {
                var elem = $(this);

                var contentSection = $(elem).find('.content__section');
                var contentSectionDescription = $(elem).find('.content__section-description');
                var content = contentSectionDescription.html(); 

                if (!elem.is(reqObj)) {
                    reqObj = elem;
                    contentHeight = contentSection.outerHeight(true);
                }    

                if ($.trim(content) != '') {
                    contentSectionDescription.removeClass('active');
                    var height = contentSectionDescription.outerHeight(true);   
                    var calHeight = parseInt(contentHeight) + parseInt(height);
                    contentSection.outerHeight(calHeight+"px");
                    contentSectionDescription.addClass('active');
                }
            },
            function () {
                var elem = $(this);
                var contentSection = $(elem).find('.content__section');
                var contentSectionDescription = $(elem).find('.content__section-description');
                contentSection.outerHeight(contentHeight+"px");
                contentSectionDescription.removeClass('active');
            }
        );
    };

    var bindSocialPostPopup = function () {

        $('body').on('click', 'div.admin-actions__action--edit', function (e) {
            e.stopPropagation();
        });
        
        $('body').on('click', '.close__lg-modal', function (e) {
            e.stopPropagation();
            $('.modal .modal-content').html('');
        });

        $('body').on('click', 'a.socialCard', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var blogGuid = $(this).data('blog-guid');
            var postGuid = $(this).data('guid');

            var csrfToken = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                type: 'POST',
                url: _appJsConfig.appHostName + '/api/social/get-social-post',
                dataType: 'json',
                data: {blog_guid: blogGuid, guid: postGuid, _csrf: csrfToken},
                success: function (data, textStatus, jqXHR) {
                    data.hasMediaVideo = false;
                    if (data.media['type'] === 'video') {
                        data.hasMediaVideo = true;
                    }
                    data.templatePath = _appJsConfig.templatePath;

                    if (data.source == 'youtube') {
                        var watch = data.media.videoUrl.split("=");
                        data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
                    }

                    if (data.source == 'twitter') {
                        data.user.name = '@' + data.user.name;
                    }

                    var articleTemplate = Handlebars.compile(socialModalTemplate);
                    var article = articleTemplate(data);

                    $('.modal .modal-content').html(article);
                    setTimeout(function () {
                        $('.modal').modal('show');
                    }, 500);
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                beforeSend: function (jqXHR, settings) {

                },
                complete: function (jqXHR, textStatus) {

                }
            });
        });
    };

    var attachEvents = function () {
        bindSocialPostPopup();
        excerptContentSlide();
        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            //Bind pin/unpin article event
            bindPinUnpinArticle();

            //Bind delete social article & hide system article
            bindDeleteHideArticle();
        }

        function initSwap() {
            initDroppable();
            initDraggable();
        }

        function initDraggable() {
            $('.swap').draggable({
                helper: 'clone',
                revert: true,
                zIndex: 100,
                scroll: true,
                scrollSensitivity: 100,
                cursorAt: {left: 150, top: 50},
                appendTo: 'body',
//                containment: false,
                start: function (event, ui) {
                    ui.helper.attr('class', '');
                    var postImage = $(ui.helper).data('article-image');
                    var postText = $(ui.helper).data('article-text');
                    if (postImage !== "") {
                        $('div.SwappingHelper img.article-image').attr('src', postImage);
                    }
                    else {
                        $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
                    }
                    $('div.SwappingHelper p.article-text').html(postText);
                    $(ui.helper).html($('div.SwappingHelper').html());
                }
            });
        }

        function initDroppable() {
            $('.swap').droppable({
                hoverClass: "ui-state-hover",
                drop: function (event, ui) {
                    var sourceObj = $(ui.draggable);
                    var $this = $(this);
                    //get positions
                    var sourcePosition = $(sourceObj).data('position');
                    var sourcePostId = parseInt($(sourceObj).data('id'));
                    var sourceIsSocial = parseInt($(sourceObj).data('social'));
                    var destinationPosition = $($this).data('position');
                    var destinationPostId = parseInt($($this).data('id'));
                    var destinationIsSocial = parseInt($($this).data('social'));

                    $(this).after(ui.draggable.clone().removeAttr('style'));
                    $(ui.draggable).after($(this).clone());
                    $(ui.helper).remove(); //destroy clone
                    $(ui.draggable).remove();
                    $(this).remove();

                    //swap positions
                    if (sourceIsSocial == 1) {
                        $('#Social' + sourcePostId).attr('data-position', destinationPosition);
                        $('#Social' + sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }
                    else {
                        $('#Article' + sourcePostId).attr('data-position', destinationPosition);
                        $('#Article' + sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }

                    if (destinationIsSocial == 1) {
                        $('#Social' + destinationPostId).attr('data-position', sourcePosition);
                        $('#Social' + destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }
                    else {
                        $('#Article' + destinationPostId).attr('data-position', sourcePosition);
                        $('#Article' + destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }

                    var csrfToken = $('meta[name="csrf-token"]').attr("content");
                    var postData = {
                        sourcePosition: sourcePosition,
                        sourceArticleId: sourcePostId,
                        sourceIsSocial: sourceIsSocial,
                        destinationPosition: destinationPosition,
                        destinationArticleId: destinationPostId,
                        destinationIsSocial: destinationIsSocial,
                        _csrf: csrfToken
                    };

                    $.ajax({
                        url: _appJsConfig.baseHttpPath + '/home/swap-article',
                        type: 'post',
                        data: postData,
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {
                                noty({
                                    type: "success",
                                    text: "Articles swapped successfully",
                                    layout: 'topRight',
                                    timeout: 2000,
                                    dismissQueue: true,
                                    animation: {
                                        open: 'animated bounceInRight', // jQuery animate function property object
                                        close: 'animated bounceOutRight', // jQuery animate function property object
                                        easing: 'swing', // easing
                                        speed: 500 // opening & closing animation speed
                                    }
                                });
                            }

//                            $(".card p, .card h1").dotdotdot();

                            initSwap();

                            //Bind pin/unpin article event
                            bindPinUnpinArticle();

                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();

                            videoPlayFancybox();

                            excerptContentSlide();
                            bindSocialPostPopup();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //$().General_ShowErrorMessage({message: jqXHR.responseText});
                        },
                        beforeSend: function (jqXHR, settings) {
                        },
                        complete: function (jqXHR, textStatus) {
                        }
                    });

                }
            });
        }

        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            initSwap();
        }

        $('.loadMoreArticles').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var btnObj = $(this);
            $.fn.LoadBlogArticles({
                offset: $('.ajaxArticles').data('offset'),
                limit: 20,
                viewTotalNonPinnedPost: $('.ajaxArticles').data('existing-nonpinned-count'),
                onSuccess: function (data, textStatus, jqXHR) {
                    if (data.success == 1) {
                        $('.ajaxArticles').data('existing-nonpinned-count', data.existingNonPinnedCount);

                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }

                        for (var i in data.articles) {
                            console.log(_appJsConfig.templatePath);
                            
                            data.articles[i]['class'] = 'col-md-4 card__view-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
                            data.articles[i]['pinTitle'] = (data.articles[i].isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
                            data.articles[i]['pinText'] = (data.articles[i].isPinned == 1) ? 'UN-PIN' : 'PIN';
                            data.articles[i]['pinCls'] = (data.articles[i].isPinned == 1) ? 'selected' : '';
                            data.articles[i]['readingTime'] = renderReadingTime(data.articles[i].readingTime);
                            data.articles[i]['mediaClass'] = 'without-image';
                            data.articles[i]['cardImageClass'] = 'without-image';
                            if(data.articles[i]["hasMedia"] == true){
                                data.articles[i]['cardImageClass'] = '';
                            }
                            data.articles[i]['blogClass'] = '';
                            if (data.articles[i].blog['title'] !== null) {
                                data.articles[i]['blogClass'] = data.articles[i].blog['title'].replace(' ', '').toLowerCase();
                            }

                            var ImageUrl = $.fn.image({media: data.articles[i]['featuredMedia'], mediaOptions: {width: 570, height: 470, crop: 'limit'}});
                            data.articles[i]['imageUrl'] = ImageUrl;
                            var profileImage = $.fn.image({media: data.articles[i]['createdBy']['media'], mediaOptions: {width: 23, height: 23, crop: 'limit'}});
                            if (typeof profileImage === "undefined" || profileImage === null) {
                                profileImage = 'http://d27ex7oru4dw3i.cloudfront.net/frontend/static/dist/images/avatar-sm.png';
                            }
                            data.articles[i]['profileImage'] = profileImage;
                            Handlebars.registerHelper('trimString', function (passedString, len) {
                                var theString = passedString.substring(0, len);

                                if (passedString.length > len) {
                                    theString += '...';
                                }
                                return new Handlebars.SafeString(theString)
                            });

                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasMediaVideo'] = 0;
                                if (data.articles[i]['social']['media']['type'] === 'video') {
                                    data.articles[i]['hasMediaVideo'] = 1;
                                    data.articles[i]['videoClass'] = 'video';
                                }
                                data.articles[i]['isTwitter'] = 0;
                                if (data.articles[i]['social']['source'] === 'twitter') {
                                    data.articles[i]['isTwitter'] = 1;
                                }
                                
                                data.articles[i]['imageUrl'] = data.articles[i].social.media['path'];
                                data.articles[i]['socialClass'] = 'social '+ data.articles[i]["social"]["source"];
                                if(data.articles[i]["social"]["hasMedia"] == true){
                                    data.articles[i]['mediaClass'] = '';
                                }
                                articleTemplate = Handlebars.compile(socialCardTemplate);
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }


                        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
                            //Bind pin/unpin article event
                            bindPinUnpinArticle();
                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();

                            bindSocialUpdatePost();

                            initSwap();
                        }
                        videoPlayFancybox();
                        bindSocialPostPopup();
                    }
                },
                beforeSend: function (jqXHR, settings) {
                    $(btnObj).html('<button class="button button__icon--left button--blue button--radius"><i class="fa fa-spinner fa-spin"></i>Load more</button>');
                },
                onComplete: function (jqXHR, textStatus) {
                    $(btnObj).html('<i class="fa fa-arrow-down" aria-hidden="true"></i> Load More');
                }
            });
        });

        var renderReadingTime = function (time) {
            if (time <= '59') {
                return (time < 1) ? 1 : time + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };

        var bindSocialShareButton = function () {
            $(".card__social-share").on("click", function (e) {
                e.preventDefault();
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    $(this).removeClass("selected");
                } else {
                    $(".card__social-share").removeClass('selected');
                    $(this).addClass("selected");
                }
            });
        };
        var bindSocialUpdatePost = function () {
            $('.editSocialPost').on('click', function (e) {
                e.preventDefault();
                var elem = $(this);
                var url = elem.data('url');
                var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
                popup.focus();

                var intervalId = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(intervalId);
                        var socialId = elem.parents('a').data('id');
                        if ($('#updateSocial' + socialId).data('update') == '1') {
                            //$().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                        }
                    }
                }, 50);

                return;
            });
        };

        var videoPlayFancybox = function () {
            $('.card--social.video  .video-player').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var data = [];
                var dataObj = $(this).closest('.card--social.video');
                data['label'] = $(dataObj).data('label');
                data['content'] = $(dataObj).data('article-text');
                data['source'] = $(dataObj).data('source');
                data['username'] = $(dataObj).data('user-name');
                data['user_image'] = $(dataObj).data('user-image');
                data['url'] = $(this).data('url');
                data['share_url'] = $(dataObj).find('.card').attr('href');
                data['templatePath'] = _appJsConfig.templatePath;

                if (data['source'] == 'youtube') {
                    var watch = data['url'].split("=");
                    data['url'] = "https://www.youtube.com/embed/" + watch[1];
                }

                var articleTemplate = Handlebars.compile(socialVideoTemplate);
                var article = articleTemplate(data);

                $('.modal .modal-content').html(article);
                //$('body').modalmanager('loading');
                setTimeout(function () {
                    $('.modal').modal('show');
                }, 500);
            });
        };

    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Blog = (function ($) {

    var attachEvents = function () {

    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Article = (function ($) {

    var attachEvents = function () {
        $('.followArticleBtn').on('click', function (e) {
            e.preventDefault();
            var obj = $(this);
            var userGuid = $(obj).data('guid');
            var status = $(obj).data('status');
            var state = (status === 'unfollow') ? 'follow' : 'unfollow';
            $.fn.followUser({
                userGuid: userGuid,
                onSuccess: function (data) {
                    $(obj).data('status', state);
                    var status = $(obj).data('status');
                    $(obj).get(0).lastChild.nodeValue = " " + status.substr(0, 1).toUpperCase() + status.substr(1);
                    ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
                    var message = ($(obj).data('status') === 'follow') ? 'User unfollowed successfully' : 'User followed successfully';
                    noty({
                        type: 'success',
                        text: message,
                        layout: 'topRight',
                        timeout: 2000,
                        dismissQueue: true,
                        animation: {
                            open: 'animated bounceInRight', // jQuery animate function property object
                            close: 'animated bounceOutRight', // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        }
                    });
                },
                beforeSend: function (obj) {
                    $(obj).html('please wait...');
                }
            });
        });
        $('.article__container .article__content figure').after('<div class="clearfix"></div>');

        $('.article__container .article__content figure figcaption').each(function () {
            if (!$(this).text().trim().length > 0) {
                $(this).addClass("hide");
            }
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));