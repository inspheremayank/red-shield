var socialModalTemplate = 
        '<button type="button" class="close close__lg-modal" data-dismiss="modal" aria-label="Close">'+
        '<span aria-hidden="true">'+
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">'+
                    '<title>Close</title>'+
                    '<g stroke-width="3" fill-rule="evenodd" stroke-linecap="round">'+
                            '<path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/>'+
                    '</g>'+
            '</svg>'+
            '<div class="close__text">close</div>'+
        '</span>'+
	'</button>'+
	'<div class="social-modal__content {{blog.title}} {{#unless hasMedia}} no_image {{/unless}}">'+
            '<button type="button" class="close close__sm-modal" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">'+
                            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g stroke="#FFF" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/></g></svg>'+
                    '</span>'+
            '</button>'+
            '<div class="social-modal__channel social-modal__channel--technology ">{{blog.title}}</div>'+
            '<div class="social-modal__overflow">'+
                    '<a href="{{url}}" target="_blank"><div class="social-modal__text">“<br>{{content}}</div></a>'+
            '</div>'+
            '<div class="article__profile">'+
                '<span class="profile__user_image" style="background-image: url(\'{{user.media.path}}\'); height: 56px; width: 56px; background-size: cover; display: inline-block; border-radius: 50%;" ></span>'+
                '<div class="profile__author_wrap">'+
                    '<span class="article__author">By {{user.name}}</span>'+
                    '<div class="profile__button-wrap" style="display:none">'+
                        '<div class="button button-sm button__share">Share  '+
                            '<div class="share-popup" style="left:0">'+
                                '<div class="share-popup__title-wrap">'+
                                    '<span class="share-popup__title">Share:</span>'+
                                    '<img class="share-popup__close" src="{{templatePath}}/static/images/icons/close-small.svg" alt="">'+
                                '</div>'+
                                '<input type="text" name="share-link" value="{{url}}" readonly class="share-popup__share-link share-link">'+
                                '<div class="share-popup__social-wrap">'+
                                    '<div class="social-icon_wrap--colored">'+
                                        '<a href="https://plus.google.com/share?url={{url}}" target="_blank"><span class="fa fa-google-plus"></span></a>'+
                                        '<a href="http://www.facebook.com/sharer/sharer.php?u={{url}}" target="_blank" ><span class="fa fa-facebook"></span></a>'+
                                        '<a href="http://twitter.com/intent/tweet?status={{url}}" target="_blank"><span class="fa fa-twitter"></span></a>'+
                                    '</div>'+
                                    '<span class="share-popup__copy-text">Copy Link</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
	'</div>'+
	'{{#if hasMedia}}'+
            '<div class="social-modal__image_container">'+
                '<div class="social-modal__image_wrap">'+
                    '{{#if hasMediaVideo}}'+
                        '<div class="social-modal__video-wrap">'+
                            '<div>'+
                                    '<iframe src="{{media.videoUrl}}" frameborder="0" allowfullscreen></iframe>'+
                            '</div>'+
                        '</div>'+
                    '{{else}}'+
                        '<div class="social-modal__image" style="background-image: url(\'{{media.path}}\');" >'+
                            '<img class="social-modal__image_image" src="{{media.path}}" alt="" />'+
                        '</div>'+
                    '{{/if}}'+
                '</div>'+
            '</div>'+
	'{{/if}}';
var systemCardTemplate = 
'<div class="card__view {{class}}">'+
        '<div class="{{cardImageClass}} {{cardWithImageClass}} {{videoClass}} swap" data-blog-guid="{{blog.guid}}" data-id="{{articleId}}" data-position="{{position}}" data-social="0" data-article-image="{{imageUrl}}" data-article-text="{{title}}">'+
            '<a href="{{url}}" class="card__view--items">'+
                '<div class="card__view--content">'+
                    '<div class="mask"></div>'+
                    '{{#if hasMedia}}'+
                    '<figure class="image-covered" style="background-image: url({{imageUrl}})"></figure>'+
                        '{{/if}}'+
                        '{{#if userHasBlogAccess}}'+
                        '<div class="optionSet">'+
                            '<ul>'+
                                '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{guid}}" data-social="0">'+
                                    '<li>Hide <span class="fa fa-eye-slash"></span></li>'+
                                '</div>'+
                                '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn {{pinCls}}" data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" data-status="{{article.isPinned}}">'+
                                    '<li><i>{{pinText}}</i> <span class="fa fa-map-marker"></span></li>'+
                                '</div>'+
                                '{{#if userHasEditArticleAccess}}'+
                                    '<div class="admin-actions__action admin-actions__action--edit" onclick="window.location=\'{{{editUrl}}}\'; return false;">'+
                                        '<li>Edit <span class="fa fa-cog"></span></li>'+
                                    '</div>'+
                                '{{/if}}'+
                            '</ul>'+
                        '</div>'+
                    '{{/if}}'+
                    '<div class="social-icons"></div>'+
                    '<div class="video-play"></div>'+
                    '<div class="content__section-block">'+
                        '<div class="content__section">'+
                            '<div class="content__section-userInfo">'+    
                                '<div class="content__section-userInfo-image image-covered" style="background-image: url({{profileImage}})"></div>'+ 
                                '<div class="content__section-userInfo-content">'+ 
                                   ' <span>{{createdBy.displayName}}</span>'+ 
                                   '<span class="designation">{{createdBy.bio}}</span>'+ 
                                '</div>'+
                            '</div>'+
                            '<div class="clearfix"></div>'+
                            '<h2 class="content__section-heading">{{title}}</h2>'+
                            '<div class="content__section-description">{{excerpt}}</div>'+
                            '<div class="content__section-button">'+
                                '<button class="button button--radius button--red">Learn more</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</a>'+
        '</div>'+
    '</div>';
    
var socialCardTemplate = 
    '<div class="card__view {{class}}">'+
        '<div class="{{mediaClass}} {{videoClass}} swap {{socialClass}}" data-blog-guid="{{blog.guid}}" data-id="{{socialId}}" data-position="{{position}}" data-social="1" data-article-image="{{social.media.path}}" data-article-text="{{social.content}}" data-user-image="{{social.user.media.path}}" data-user-name="{{social.user.name}}">'+
            '<a href="{{social.url}}" class="card__view--items socialCard" data-blog-guid="{{social.blog.guid}}" data-guid="{{social.guid}}">'+
                '<div class="card__view--content">'+
                    '<div class="mask"></div>'+
                    '{{#if social.hasMedia}}'+
                        '<figure class="image-covered" style="background-image: url(\'{{imageUrl}}\');"></figure>'+
                    '{{/if}}'+
                    '{{#if userHasBlogAccess}}'+
                        '<div class="optionSet">'+
                            '<ul>'+
                                '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{social.guid}}" data-social="1">'+
                                    '<li>Hide <span class="fa fa-eye-slash"></span></li>'+
                                '</div>'+
                                '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn {{pinCls}}" data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" data-status="{{isPinned}}">'+
                                    '<li><i>{{pinText}}</i> <span class="fa fa-map-marker"></span></li>'+
                                '</div>'+
                                '{{#if userHasEditArticleAccess}}'+
                                    '<div class="admin-actions__action admin-actions__action--edit" data-social="1" onClick="window.open("/admin/social-funnel/update-social?guid={{social.blog.guid}}&socialguid={{social.guid}}", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=360,height=450");return false;">'+
                                        '<li>Edit <span class="fa fa-cog"></span></li>'+
                                    '</div>'+
                                '{{/if}}'+
                            '</ul>'+
                        '</div>'+
                    '{{/if}}'+
                    '<div class="social-icons"></div>'+
                    '<div class="video-play"></div>'+
                    '<div class="content__section-block">'+
                        '<div class="content__section">'+
                            '<div class="content__section-userInfo">'+     
                                '<div class="content__section-userInfo-image image-covered" style="background-image: url({{social.user.media.path}})"></div>'+ 
                                '<div class="content__section-userInfo-content">'+ 
                                    '<span>{{social.user.name}}</span>'+ 
                                    '<span class="designation">{{createdBy.bio}}</span>'+ 
                                '</div>'+ 
                            '</div>'+
                            '<div class="clearfix"></div>'+
                            '<h2 class="content__section-heading">{{social.blog.title}}</h2>'+
                            '<div class="content__section-description text__dotdot">{{social.content}}</div>'+
                            '<div class="content__section-button">'+
                                '<button class="button button--radius button--red">Learn more</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</a>'+
        '</div>'+
    '</div>';