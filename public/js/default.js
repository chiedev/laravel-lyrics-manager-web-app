function loading(req){
	if (req == 'start'){
		$('body').append('<div class="loading">'
						+'<div class="content">'
						+'<img src="../../img/svgs/RDbg.svg")"/>'
						+'</div>'
						+'</div>'
		)
	}
	else if (req == 'end'){
		$('.loading').delay(1000).queue(function () {
			$('.loading').remove()
		})
	}
}
function screen_mode(req,value){
	if(req == 'get'){

		$.ajax({
			method: "GET",
			url: "/ajax/layouts/user_layouts.php",
			data: { user_id: "1", layout: "screen_mode" },

			success:function(result){
				var obj = JSON.parse(result)
				if (obj.value == 'full-screen'){
					$('#body').addClass('full-screen')
					$('#body').removeClass('normal-screen')
					HTML = '<img id="screen-mode" src="../../img/Pixel UI Icon Set - PNG Icons/Screen Mode 2.png" title="Normal Mode" value="normal-screen"/>'
					$('#body').append('<div class="screen-paging previous"><span class="left"></span></div>'
							+ '<div class="screen-paging next"><span class="right"></span></div>'
							)
				}
				else if (obj.value == 'normal-screen'){
					$('#body').addClass('normal-screen')
					$('#body').removeClass('full-screen')
					HTML = '<img id="screen-mode" src="../../img/Pixel UI Icon Set - PNG Icons/Screen Mode 1.png" title="Full Screen Mode" value="full-screen"/>'
				}
				$('#lyrics_title #user-tools').append(HTML)
			}

		})

	}
	else if(req = 'post'){
		if (value == 'full-screen'){
			$('#body').addClass('full-screen')
			$('#body').removeClass('normal-screen')

			// !$('#full-screen').attr('hidden') ? $('#full-screen').attr({'hidden':'hidden'}) : false
			// $('#normal-screen').removeAttr('hidden')
			$('#screen-mode').remove()
			HTML = '<img id="screen-mode" src="../../img/Pixel UI Icon Set - PNG Icons/Screen Mode 2.png" title="Normal Mode" value="normal-screen"/>'
			$('#lyrics_title #user-tools').append(HTML)
			var json_value = '{"value":"'+value+'","img":"Pixel UI Icon Set - PNG Icons/Screen Mode 1.png","title":"Full Sreen Mode"}'

			$('#body').append('<div class="screen-paging previous"><span class="left"></span></div>'
							+ '<div class="screen-paging next"><span class="right"></span></div>'
							)
		}
		else if (value == 'normal-screen'){
			$('#body').addClass('normal-screen')
			$('#body').removeClass('full-screen')

			// !$('#normal-screen').attr('hidden') ? $('#normal-screen').attr({'hidden':'hidden'}) : false
			// $('#full-screen').removeAttr('hidden')
			$('#screen-mode').remove()
			HTML = '<img id="screen-mode" src="../../img/Pixel UI Icon Set - PNG Icons/Screen Mode 1.png" title="Full Screen Mode" value="full-screen"/>'
			$('#lyrics_title #user-tools').append(HTML)
			var json_value = '{"value":"'+value+'","img":"Pixel UI Icon Set - PNG Icons/Screen Mode 2.png","title":"Normal Mode"}'

			$('.screen-paging').remove()
		}

		$.ajax({
			method: "POST",
			url: "/ajax/layouts/user_layouts.php",
			data: { value: json_value, user_id: "1", layout: "screen_mode" }
		})

	}



}
function right_menu(req,value,sort){
	if(req == 'get'){
		$.ajax({
			method: "GET",
			url: "/ajax/layouts/user_layouts.php",
			data: { user_id: "1", layout: "right_content" },

			success:function(result){
				var obj = JSON.parse(result)
				if (obj.value == 'visible'){
					$('#right #menu').attr({'value':'not-visible'})
					$('#right_content').addClass('visible')
					$('#right_content').removeClass('not-visible')
				}
				else if (obj.value == 'not-visible'){
					$('#right #menu').attr({'value':'visible'})
					$('#right_content').addClass('not-visible')
					$('#right_content').removeClass('visible')
				}
				$('#' + obj.sort).removeAttr('hidden')

				if(obj.sort == 'sorted-name-asc'){
					$('#name_asc').addClass('selected')
				}
				else if(obj.sort == 'sorted-name-desc'){
					$('#name_desc').addClass('selected')
				}
				else if(obj.sort == 'sorted-name-recent'){
					$('#recent').addClass('selected')
				}
			}
		})
	}
	else if(req = 'post'){
		if (value == null || value == ''){
			value = $('#right #menu').attr('value') == 'visible' ? 'not-visible' : 'visible'
		}
		else if (sort == null || sort == ''){
			if($('#name_asc').hasClass('selected')){
				sort = 'sorted-name-asc'
			}
			else if($('#name_asc').hasClass('selected')){
				sort = 'sorted-name-desc'
			}
			else if($('#recent').hasClass('selected')){
				sort = 'sorted-name-recent'
			}
		}

		var json_value = '{"value":"'+value+'","sort":"'+sort+'"}'
		$.ajax({
			method: "POST",
			url: "/ajax/layouts/user_layouts.php",
			data: { value: json_value, user_id: "1", layout: "right_content" }
		})
	}
}
function save_enabled(){
	var target1 = $('#edit_title').val();
	var target2 = $('#edit_lyrics').val();

	if (( (target1.length == 0) || (target2.length == 0) )){
		$('#save').css({'display':'none'});
	}
	else{
		$('#save').css({'display':'inline-block'});
	}
}
function check_update(target,str){
	if (str.length == 0) {
		$(target).css('box-shadow', '0 0 1px 1px #C94E4E');
	}
	else{
		$(target).css('box-shadow', '0 0 1px 1px #7D98B9');
	}
}
function under_maintenance(){
	if ($(window).width() < 1150) {
		$('body *').remove()
		$('body').css({'width':'100%','height':'100%','position':'fixed','vertical-align':'middle'})
		$('body').append(''
						+'<div class="under_maintenance" style="position:absolute;top:30%;bottom:30%;left:0;right:0;margin:auto;">'
						+'<h2>SORRY</h2>'
						+'<h1>Desktop View Only</h1>'
						+'<h4>** under maintenance **</h4>'
						)
	}
	else {
		if ($('.under_maintenance').length > 0){
			window.location.reload();
		}
	}
}

function transposeChord(req,target){
	var match;
	chordRegex = /C#|D#|F#|G#|A#|C|D|E|F|G|A|B/g
	var chords = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
	if(req == 'up'){
        var currentChord = target.clone().children().remove().end().text();
        var output = "";
        var parts = currentChord.split(chordRegex);
        var index = 0;
        while (match = chordRegex.exec(currentChord))
        {
            var chordIndex = chords.indexOf(match[0]);
            output += parts[index++] + (chords[chordIndex] == 'B' ? chords[0] : chords[chordIndex+1]);
        }
        output += parts[index];
        target.text(output);
	}
	else if (req == 'down'){
        var currentChord = target.clone().children().remove().end().text();
        var output = "";
        var parts = currentChord.split(chordRegex);
        var index = 0;
        while (match = chordRegex.exec(currentChord))
        {
            var chordIndex = chords.indexOf(match[0]);
            output += parts[index++] + (chords[chordIndex] == 'C' ? chords[11] : chords[chordIndex-1]);
        }
        output += parts[index];
        target.text(output);
	}
}

function makeItChord(target,chords_array) {
	var chords_array = chords_array.split(",")
	chord_array = chords_array.sort(function(a,b){return b.length-a.length})
	var this_replace
	var instances = [' ','\n','\t','\r']
	for (i = 0; i <= chords_array.length - 1; i++) {
		for (j = 0; j <= instances.length - 1; j++){
			for (k = 0; k <= instances.length - 1; k++){
				this_replace = new RegExp(instances[k]+chords_array[i]+instances[j],'g')
				target.html(target.html().replace(this_replace, instances[k]+'<span class="chord">'+chords_array[i]+'</span>'+instances[j]))
			}
		}
    }
}
$(document).ready(function(){

	under_maintenance()
	$(window).resize(function(){
		under_maintenance()
	})
	//-------------------------Script for Users--------------------------------
	loading('start')
	// screen_mode('get');
	right_menu('get');
	image_loader();

	//-------------------------------------------------------------------------

	//---------------------Chords---------------------
	if ($('[name="chords"]').length > 0 && $('[name="chords"]').val() != ''){
		var target = $('#lyrics_show pre')
		var chords_array = $('[name="chords"]').val()
		makeItChord(target,chords_array)
	}
	else if ($('[name="set_chords"]').length > 0 && $('[name="set_chords"]').val() != ''){
		var target = $('#edit_html_lyrics')
		var chords_array = $('[name="set_chords"]').val()
		makeItChord(target,chords_array)
	}

	//---------------------Transpose Chords----------------------
	$('#standard').click(function(){
		var num = Number($("#label").text()); //current key
		if (num > 0 && num != 'transpose'){
			for (var i=0; i<num; i++){
				$('span.chord').each(function(){
					transposeChord('down',$(this));
				})
				if($("#label").text() == 'transpose'){
			    	$("#label").text( 0 );
			    	$("#label").text( Number($("#label").text()) - 1 );
			    	$("#label").addClass('large');
			    	$("#label").removeClass('default');
			    }
			    else if($("#label").text() == -11||$("#label").text() == 1){
			    	$("#label").text( 'transpose' );
			    	$("#label").addClass('default');
			    	$("#label").removeClass('large');
			    }
			    else{
			    	$("#label").text( Number($("#label").text()) - 1 );
			    }
			}
		}
		else if (num < 0 && num != 'transpose'){
			for (var i=num; i<0; i++){
				$('span.chord').each(function(){
					transposeChord('up',$(this));
				})
			    if($("#label").text() == 'transpose'){
			    	$("#label").text( 0 );
			    	$("#label").text( Number($("#label").text()) + 1 );
			    	$("#label").addClass('large');
			    	$("#label").removeClass('default');
			    }
			    else if($("#label").text() == 11||$("#label").text() == -1){
			    	$("#label").text( 'transpose' );
			    	$("#label").addClass('default');
			    	$("#label").removeClass('large');
			    }
			    else{
			    	$("#label").text( Number($("#label").text()) + 1 );
			    }
			}
		}
	});
	$('#transposeUp').click(function(){
		$('span.chord').each(function(){
			transposeChord('up',$(this))
		})
	    var num = $("#label");
	    if(num.text() == 'transpose'){
	    	num.text( 0 );
	    	num.text( Number(num.text()) + 1 );
	    	num.addClass('large');
	    	num.removeClass('default');
	    }
	    else if(num.text() == 11||num.text() == -1){
	    	num.text( 'transpose' );
	    	num.addClass('default');
	    	num.removeClass('large');
	    }
	    else{
	    	num.text( Number(num.text()) + 1 );
	    }
	});
	$('#transposeDown').click(function(){
		$('span.chord').each(function(){
			transposeChord('down',$(this))
		})
	    var num = $("#label");
	    if(num.text() == 'transpose'){
	    	num.text( 0 );
	    	num.text( Number(num.text()) - 1 );
	    	num.addClass('large');
	    	num.removeClass('default');
	    }
	    else if(num.text() == -11||num.text() == 1){
	    	num.text( 'transpose' );
	    	num.addClass('default');
	    	num.removeClass('large');
	    }
	    else{
	    	num.text( Number(num.text()) - 1 );
	    }
	});
	//-------------------------------Error Message----------------------------
	$('#error').delay().queue(function (next) {
	    $('#error').animate( {opacity: "1", top: "50px"} , 100 );
	    $('#error').delay(2000).queue(function (next) {
	        $('#error').animate( {opacity: "0", top: "-27px"} , 100 );
	        $('#error').delay(300).queue(function (next) {
	            $('#error').remove();
	            next();
	        });
	        next();
	    });
		next();
	});

	//--------------------TextBox on Click, Select All Text-------------------
	$("input[type='text']").on("click", function () {
	   $(this).select();
	});

	//--------------Full Screen Slider---------------
	// $('#next').click(function(){
	// 	$("#body.full-screen #content .inner-content #lyrics_show pre").requestAnimationFrame(scroll_next);
	// });
	// var scrollCount = 0;
 //    function scroll_next(){
 //    	scrollCount+=.5;
 //    	window.scrollTo(100000, scrollCount);
 //    	requestAnimationFrame(scroll_next);
 //    }

	//--------------------Right Content drop-down------------------------------
	$('#space #nav #drop-down').click(function(){
		var target = $('#space #nav #drop-down-content');
		global_hide_show(target);
	});
	$('#space #nav #drop-down-content #name_asc').click(function(){
		var replace = $('#space #nav #drop-down-content #name_asc');
		var sortby = $('.inner_content #sorted-name-asc');
		sort_by(replace,sortby);
		right_menu('post',null,'sorted-name-asc')
	});
	$('#space #nav #drop-down-content #name_desc').click(function(){
		var replace = $('#space #nav #drop-down-content #name_desc');
		var sortby = $('.inner_content #sorted-name-desc');
		sort_by(replace,sortby);
		right_menu('post',null,'sorted-name-desc')
	});
	$('#space #nav #drop-down-content #recent').click(function(){
		var replace = $('#space #nav #drop-down-content #recent');
		var sortby = $('.inner_content #sorted-name-recent');
		sort_by(replace,sortby);
		right_menu('post',null,'sorted-name-recent')
	});
	function sort_by(replace,sortby){
		//--------------------------Remove Selected----------------------------
		$('#space #nav #drop-down-content div').each(function(){
			$('#space #nav #drop-down-content div').removeClass('selected');
		});
		replace.addClass('selected');
		//--------------------------Hide Drop Down-----------------------------
		var target = $('#space #nav #drop-down-content');
		target.delay(300).queue(function (next) {
			target.addClass('hide');
			target.removeClass('show');
			next();
		});
		//-------------------------------Sort----------------------------------

		$('#sorted-name-asc').attr({'hidden':'hidden'})
		$('#sorted-name-desc').attr({'hidden':'hidden'})
		$('#sorted-name-recent').attr({'hidden':'hidden'})
		sortby.removeAttr('hidden')
	}

	//-------------------------Global Show|Hide--------------------------------

	function global_hide_show(target){
		if(target.hasClass('')){
			target.addClass('show');
			target.removeClass('hide');
		}
		else if(target.hasClass('hide')){
			target.addClass('show');
			target.removeClass('hide');
		}
		else if(target.hasClass('show')){
			target.addClass('hide');
			target.removeClass('show');
		}
	}

	//-------------------------Script for Users--------------------------------
	//--------------image modal viewer---------------
	$('#body #content .inner-content #profile #profile-pic').click(function(){
		var path= $('#body #content .inner-content #profile #profile-pic photo').attr('path');
		var type = 'photo';
		image_viewer(type,path);
	});

	$('#body #content .inner-content #main-content #user-post #media-container photo').click(function(){
		var index = $(this).attr('index');
		var path = $(this).attr('path');
		var type = 'photo';
		image_viewer(type,path);
	});
	$('#body #content .inner-content #main-content #user-post #media-container vid').click(function(){
		var index = $(this).attr('index');
		var path = $(this).attr('path');
		var type = 'video';
		image_viewer(type,path);
	});
	//--------------upload image link---------------

	$('#body #content .inner-content #profile #profile-pic').on('mouseover', function(){
		$(this).append('<a href="mail.google.com">MAIL</a>');
	});

	//--------------------Tooltip Hide|Show--------------------------
	$('.login_link').click( function() {
		if ($('#tooltip').hasClass('hide')){
			$('#tooltip').removeClass('hide');
		}
		else{
			$('#tooltip').addClass('hide');
		}
	});
	$('.user_link').click( function() {
		if ($('#tooltip').hasClass('hide')){
			$('#tooltip').removeClass('hide');
		}
		else{
			$('#tooltip').addClass('hide');
		}
	});
	$('#body').click( function() {
		hide_tooltip();
	});
	$('#left').click( function() {
		hide_tooltip();
	});
	$('#middle').click( function() {
		hide_tooltip();
	});
	$('#right #username_link').click( function() {
		hide_tooltip();
	});
	$('#right #menu').click( function() {
		hide_tooltip();
	});
	function hide_tooltip(){
		if ($('#tooltip').hasClass('')){
			$('#tooltip').addClass('hide');
		}
	}

	//------------------Read More with plugin------------------------
	$('.post_content').readmore({maxHeight: 140});

	//-------------------Change the mp3 link style------------------
	// var yourstring="color";
	// $('#body #content .inner-content #update-song #lyrics_show_update #edit_mp3_link:contains('+yourstring+')', document.body).each(function(){
	//       console.log(this);
	//       $(this).html($(this).html().replace(
	//             new RegExp(yourstring, 'g'), '<span class=mp3color>'+yourstring+'</span>'
	//       ));
	// });
	//------------------Saving CTRL+S------------------------------
	$(document).keydown(function(event) {
	        // If Control or Command key is pressed and the S key is pressed
	        // run save function. 83 is the key code for S.
	        if((event.ctrlKey || event.metaKey) && event.which == 83) {
	            // Save Function
	            event.preventDefault();
	            if (($('#edit_title').val().length == 0) || ($('#edit_lyrics').val().length == 0)){
					alert('Fill up all required fields.');
				}
	            $('#save').click();
	        };
		}
	);
	//------------------Input | Autocomplete OFF--------------------
 	$( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
    });
	//-----------------------Delete Question----------------------
	$("#delete").click(function(){
	   	if (!confirm("Are you sure you want to delete song?")){
	     	return false;
	    }
	 });
	//-----------------------Menu Visible-------------------------
	$('#right #menu').click(function(){
		right_menu('post',$(this).attr('value'))

		var target = $('#body #right_content');
		if (target.hasClass('not-visible')){
			target.addClass('visible');
			target.removeClass('not-visible');
			$('#right #menu').removeAttr('value')
			$('#right #menu').attr({'value':'not-visible'})
		}
		else if (target.hasClass('visible')){
			target.addClass('not-visible');
			target.removeClass('visible');
			$('#right #menu').removeAttr('value')
			$('#right #menu').attr({'value':'visible'})
		}
	});
	// $('#body #left_content').click( function() {
	// 	hide_menu();
	// });
	// $('#body #content').click( function() {
	// 	hide_menu();
	// });
	// $('#left').click( function() {
	// 	hide_menu();
	// });
	// $('#middle').click( function() {
	// 	hide_menu();
	// });
	// $('#right #username_link').click( function() {
	// 	hide_menu();
	// });
	// $('#right #user').click( function() {
	// 	hide_menu();
	// });
	// function hide_menu(){
	// 	if ($('#body #right_content').hasClass('')){
	// 		$('#body #right_content').addClass('not-visible');
	// 	}
	// 	else if($('#body #right_content').hasClass('visible')){
	// 		$('#body #right_content').addClass('not-visible');
	// 		$('#body #right_content').removeClass('visible');
	// 	}
	// }
	// $('#right-mobile #menu').click(function(){
	// 	var target = $('#body #right_content .inner_content-mobile');
	// 	if (target.hasClass('')){
	// 		target.addClass('visible');
	// 	}
	// 	else if (target.hasClass('not-visible')){
	// 		target.addClass('visible');
	// 		target.removeClass('not-visible');
	// 	}
	// 	else if (target.hasClass('visible')){
	// 		target.addClass('not-visible');
	// 		target.removeClass('visible');
	// 	}
	// });

	//-------------Search Bar---------------
	$('#formSearch').on('submit', function(e) {
		e.preventDefault();
		url = $('option[value="'+$('#search_ajax').val()+'"]').attr('link');
		window.location = url;
		goToLink(url);
	});

	//-----------Auto Resize the Textarea-------------
	//autosize plugin
	autosize($('#body #content #post #write textarea'));
	autosize($('#body #content #new-post #add-song textarea'));

	//------------------------------Support Pressing TAB On Textareas------------------------------------
	$('body').on('keydown', 'textarea', function(e) {
	    if (e.keyCode == 9) {
	    	var myValue = "\t";
	    	var startPos = this.selectionStart;
	    	var endPos = this.selectionEnd;
	    	var scrollTop = this.scrollTop;
	    	this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos,this.value.length);
	    	this.focus();
	    	this.selectionStart = startPos + myValue.length;
	    	this.selectionEnd = startPos + myValue.length;
	    	this.scrollTop = scrollTop;

	    	e.preventDefault();
	    }
	});
	//------------------------------UPDATING LYRICS, ENABLE SAVE BUTTON------------------------------------
	$('#edit_title,#edit_lyrics').on('keydown keyup',function(){
		check_update($(this),this.value);
		save_enabled();
	});

	$('input[name=edit_artist],#edit_mp3_link').on('keydown keyup',function(){
		save_enabled();
	});

	//-------------------------------------------SCREEN MODE-----------------------------------------------
	$('body').on('click','#screen-mode',function(){
		screen_mode('post',$(this).attr('value'))
	});

	loading('end')

	//--------------------------------------------- TAB PANEL ---------------------------------------------
	$(window).resize(function(){
		tabView('embed',$('#edit_mp3_link'),$('#embed_view'))
		tabView('embed',$('#form_mp3'),$('#form_embed_view'))
	})
	$('[action="update-song"] #lyrics_show .tabs .navs .tab').on('click',function(){
		tabView('embed',$('#edit_mp3_link'),$('#embed_view'))
		tabView('lyrics',$('#edit_lyrics'),$('#edit_html_lyrics'))
	})
	$('#edit_mp3_link').on('change',function(){
		tabView('embed',$('#edit_mp3_link'),$('#embed_view'))
	})
	$('.tabs').each(function(){
		resizeTab('nav-tab',60,$('.navs .tab',$(this)))
	})

	// POP-UP ADD SONG
	$('#create-song.pop-up .tabs .navs .tab').on('click',function(){
		tabView('embed',$('#form_mp3'),$('#form_embed_view'))
		tabView('lyrics',$('#form_lyrics'),$('#form_html_lyrics'))
	})
	$('#form_mp3').on('change',function(){
		tabView('embed',$('#form_mp3'),$('#form_embed_view'))
	})

	function tabView(req,src,target){
		if(req == 'embed'){
			target.html(src.val()) //embed view
			var side_panel_size = $(document).width() * .20
			target.width(side_panel_size)
		}
		else if(req == 'lyrics'){
			target.html(src.val()) //view mode
			if ($('[name="set_chords"]').length > 0 && $('[name="set_chords"]').val() != ''){
				makeItChord(target,$('[name="set_chords"]').val())
			}
		}
	}


}); /* end of document ready function */
