/**
	Name: Simple Pop-Up
	URI: http://CilleDimla.com/playground/simple-pop-up
	Author: Cille Dimla
	Author URI: http://CilleDimla.com/
	Description: Simple Pop-Up Jquery
	Version: 1.0
	License: GNU General Public License v2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html
**/
$(document).ready(function(){
	//INITIAL LOAD
	$('.pop-up').each(function(){
		var popup_html = $(this).html()
		$(this).html('<content><img class="loading" src="/js/popup/loading.svg"/>'+popup_html+'</content>')
		$(this).prepend('<div class="pop-up-bg"></div>')
		//SVG loading
	})

	$('.pop-up .pop-up-bg').on('click',function(){
		showPopup('no',$(this).parent())
	})

	$('.pop-up-trigger').on('click',function(){
		var trigger = $('#' + $(this).attr('pop-trigger'))
		var link = $(this).attr('pop-link')
		showPopup('yes',trigger)
		if ($(this).attr('pop-type')){
			loadMedia(($(this).attr('pop-type') == 'img')?'img':($(this).attr('pop-type') == 'vid')?'vid':'',trigger,link)
		}
	})	

});

function showPopup(req,target){
	/**
		PARAM1		=> value can be 'yes' or 'no'
		PARAM2		=> specific pop-up element you want to show or hide.
					=> **Note If multiple pop-up are existing, make sure to add unique identification for each pop-up.
						 (e.g <div class="pop-up" id="image_pop-up">...</div)
	**/
	if (req == 'yes') {
		//DISABLE SCROLL
		$(window).scroll(function() {
			$(window).scrollTop(current);
		});
		//SHOW
		target.fadeIn()
			.css({'top':'-1000px','position':'fixed'})
			.animate({'top':'0'}, 150, function() {
				$('> content', target).css({'position':'fixed'})
		})
		var current = $(window).scrollTop();
	}
	else if (req == 'no') {
		//RESET SCROLL
		$(window).off('scroll');
		//HIDE
		target.fadeOut()
			.css({'top':'0px','position':'absolute'})
			.animate({'top':'-1000px'}, 150, function() {
				$('> content #media',target).remove()
				$('> content', target).css({'position':'absolute'})
		})
	}
};

function loadMedia(type,target,url){
	/**
		PARAM1		=> value can be 'img' or 'vid'
		PARAM2		=> specific pop-up element you want to show or hide.
					   **Note If multiple pop-up are existing, make sure to add unique identification for each pop-up.
					   (e.g <div class="pop-up" id="image_pop-up">...</div)
		PARAM3		=> media url
	**/
	var larger_size
	$('> content',target).append('<div id="media"></div>')
	var media = $('> content > #media',target)
	media.css({
				'position': 'absolute',
				'width': 'calc(100% - 20px)',
				'height': 'calc(100% - 20px)',
				'top':'10px',
				'bottom':'10px',
				'left':'10px',
				'right':'10px',
				'margin':'auto'
			})

	if(type == 'img'){
		media.append('<img src="'+url+'" />')
		var mediaImg = $('#media > img',target)
		mediaImg.css({'position':'absolute','top':'0','bottom':'0','left':'0','right':'0','margin':'auto'})
		larger_size = (mediaImg.width() > mediaImg.height())?'width':(mediaImg.width() < mediaImg.height())?'height':'equal'

		if (larger_size == 'width'){
			mediaImg.css({'max-width':'100%',
						'max-height':'auto',
						'width':'100%',
						'height':'auto'})
		}
		else if (larger_size == 'height'){
			mediaImg.css({'max-width':'auto',
						'max-height':'100%',
						'width':'auto',
						'height':'100%'})
		}
		else if (larger_size == 'equal'){
			if ($('> content',target).width() < $('> content',target).height()){
				mediaImg.css({'max-width':'100%',
							'max-height':'auto',
							'width':'100%',
							'height':'auto'})
			}
			else{
				mediaImg.css({'max-width':'auto',
							'max-height':'100%',
							'width':'auto',
							'height':'100%'})
			}

		}
	}
	else if(type == 'vid'){
		media.append('<video controls><source src="'+url+'" type="video/mp4">Your browser does not support the video tag.</video>')
		var mediaVid = $('#media > video',target)
		mediaVid.css({'position':'absolute','top':'0','bottom':'0','left':'0','right':'0','margin':'auto'})
		larger_size = (mediaVid.width() > mediaVid.height())?'width':(mediaVid.width() < mediaVid.height())?'height':'equal'

		if (larger_size == 'width'){
			mediaVid.css({'max-width':'calc(100% - 50px)','max-height':'auto','width':'100%','height':'auto','margin':'auto','position':'absolute','top':'0','bottom':'0','left':'0','right':'0'})
		}
		else{
			mediaVid.css({'max-width':'auto','max-height':'calc(100% - 50px)','width':'auto','height':'100%','margin':'auto','position':'absolute','top':'0','bottom':'0','left':'0','right':'0'})
		}
	}
};