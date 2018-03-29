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