//-----------------------------------------MODAL---------------------------------------------

//--------------image modal viewer---------------
function image_viewer(type,path){
	var modal = $('#media-modal');
	if (modal.hasClass('')){ modal.addClass('show'); }
	else if (modal.hasClass('hide')){ modal.addClass('show'); modal.removeClass('hide'); }

	var loc = $("#media-modal #form #right");
	// var transfer = '<div id="content">' + $('#media-modal #form #right #transfer').html() + '</div>';
	if (type == 'photo'){
		var transfer = '<div id="content"><img src="' + path + '"></div>';
	}
	else if (type == 'video'){
		var transfer = '<div id="content"><video controls><source src="' + path + '" type="video/mp4">Your browser does not support HTML5 video.</video></div>';
	}
	$('#media-modal #form #right #transfer').html('');
	loc.append(transfer);
	var scrolled = $(document).scrollTop();
	$('body').css({'position' : 'fixed' , 'overflow-y' : 'scroll'});
	$('#body').css({'margin-top':'-'+scrolled+'px'});
};

//---------------image loader--------------------
function image_loader(type){
	//---------------image loader--------------------
	var index = 0;
	$('photo').each(function(){
		if (index == $('photo').eq(index).attr('index')){
			var target = $('photo').eq(index);
			var path = target.attr('path');
			var this_image = $('photo').eq(index);
			this_image.append('<img src="'+ path +'">');
		}
		index++;
	});
};