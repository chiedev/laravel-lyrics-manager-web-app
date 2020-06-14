$(document).ready(function(){
	var set_instrument
	var set_chord_name
	var set_chord_code
	var set_fret_count
	//POP-UP
	$('body').append('<div id="popup">'
					+'<div id="popup-bg"></div>'
					+'<a class="close">close</a>'
					+'<div id="popup-container">'
						+'<div class="content mousescroll">'
							+'<div class="inner-content">'
								+'<div class="chord-generator"></div>'
							+'</div>'
							+'<div class="nav">'
								+'<div class="dropdown" data-type="text">'
								+'<label>instrument</label>'
									+'<select class="instrument-selector">'
										+'<option>guitar</option>'
										+'<option>ukulele</option>'
									+'</select>'
								+'</div>'
								+'<div class="textbox">'
									+'<label>name</label><input type="text" class="chord_name" maxlength="10" value="C" />'
								+'</div>'
								+'<div class="textbox">'
									+'<label>code</label><input type="text" class="chord_code" value="x32o1o"/>'
								+'</div>'
								+'<div class="textbox">'
									+'<label>number of frets</label>'
									+'<input type="number" class="fret_count" max="7" min="4" placeholder="0" value="5"/>'
								+'</div>'
								+'<div class="button style2">'
									+'<button id="generate">GENERATE</button>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				 +'</div>')
	$('#popup-bg').add('#popup .close').on('click', function(){
		//RESET SCROLL
		$(window).off('scroll');
		$('body').css({'overflow':'auto'})
		$('#popup').fadeOut()
	});
	$('body').on('click', '.create-diagram', function(){
		//DISABLE SCROLL
		$(window).scroll(function() {
			$(window).scrollTop(current);
		});
		var current = $(window).scrollTop();
		$('body').css({'overflow':'hidden'})
		$('#popup').fadeIn()
	})
	$('#generate').add('#popup .instrument-selector').add('#popup .chord_name').add('#popup .chord_code').add('#popup .fret_count').on('click change', function(){
		set_instrument = $('#popup .instrument-selector').val()
		set_chord_name = $('#popup .chord_name').val()
		set_chord_code = $('#popup .chord_code').val()
		set_fret_count = $('#popup .fret_count').val()
		$('.chord-generator','#popup').html('')
		Diagram('download',set_instrument,$('.chord-generator','#popup'),set_chord_name,set_chord_code,set_fret_count)
	});
	function __changed(){
		strings = ($('#popup .instrument-selector').val() == 'guitar')?6:4
		$('#popup .chord_code').attr('maxlength',strings)
	}
	$('#popup .instrument-selector').on('change',function(){
		__changed()
	})
	__changed()
});
function set_Instrument(set_instrument,set_element,set_chord_name,set_chord_code){
	/** Generate custom chord diagram 
		PARAM 1 (set_instrument)	=>	instrument
									=>	$('#instrument-selector') is the default instrument selector element
		
		PARAM 2 (set_element)		=>	container of the diagram
									=>	$('#chord-generator') is the default container
		
		PARAM 4 (set_chord_name)	=>	(e.g C)
		PARAM 3 (set_chord_code)	=>	(e.g x32o1o)
	**/
	if (set_instrument == null || set_instrument == ''){	
		set_instrument =  $('#instrument-selector').val();
	}
	if (set_element == null || set_element == ''){	
		set_element = $('#chord-generator');
	}
	if (set_chord_code == null || set_chord_code == ''){	
		set_chord_code = $('#set-chord-code').val();
	}
	if (set_chord_name == null || set_chord_name == ''){	
		set_chord_name = $('#set-chord-name').val();
	}
	value = 'oooooo';
	//set intrument
	if (set_instrument == 'guitar'){
		string_count = 6;
	}
	else if (set_instrument == 'ukulele'){
		string_count = 4;
	}
	$('#set-chord-code').attr('maxlength',string_count);
	//change the value of chord code to 000000 or 0000
	$('#set-chord-code').val(value.substr(0,string_count));
	//generate chord
	Diagram('download',set_instrument,set_element,set_chord_name,set_chord_code);
}

function generateChord(request,instrument,element,chord_name){
	/** Filter chord diagram
		PARAM 1 (request) 			=>	[download, chord, chord-tooltip]
		PARAM 2 (instrument)		=>	[guitar, ukulele]
		PARAM 3 (element)			=>	container of diagram
		PARAM 5 (chord_name)		=>	(e.g C','Am','F','G' or leave it blank to generate all available chords)
	**/
	if (request == 'chord-tooltip'){
		_ajaxChord('tooltip',request,instrument,element,chord_name)
	}
	else if (request == 'chord' || request == 'download'){
		chord_name = (!chord_name)?'':chord_name
		_ajaxChord('chord',request,instrument,element,chord_name)
	}
}

function Diagram(request,instrument,element,chord_name,chord_code,fret_count){
	/** Generate request chord diagram
		PARAM 1 (request) 			=>	[download, chord, tooltip]
		PARAM 2 (instrument)		=>	[guitar, ukulele]
		PARAM 3 (element)			=>	container of diagram
		PARAM 5 (chord_name)		=>	(e.g C','Am','F','G' or leave it blank to generate all available chords)
		PARAM 4 (chord_code)		=>	(e.g 'x32o1o' or null)
		PARAM 4 (chord_code)		=>	number of fret or null
	**/
	//default values
	open_strings = '';
	strings = '';
	frets = '';
	//set intrument
	if (instrument == 'guitar'){
		string_count = 6;
	}
	else if (instrument == 'ukulele'){
		string_count = 4;
	}
	//set number of open string
	for (var x = 0 ; x <= string_count-1; x++) {
		open_strings = open_strings + '<span class="open_string_'+(x+1)+'">' + chord_code[x] + '</span>';
	}
	//set number of frets
	if(!fret_count){
		fret_count = 5;
	}
	else if (!fret_count && ($('#set-fret').length > 0 && $('#set-fret').val() != '')){
		fret_count = $('#set-fret').val();
	}
	//set frets
	for (var y = 0 ; y <= fret_count-1; y++) {
		strings = '';
		//set strings|string points
		for (var z = 0 ; z <= string_count-2; z++) {
			strings = strings + '<td class="string_'+(z+1)+'">';
			if (chord_code[z] == y+1) {
				strings = strings + '<span class="point"></span>';
			}
			else if ( (z == string_count-2) && (chord_code[z+1] == y+1) ){
				strings = strings + '<span class="last_point"></span>';
			}
			if ( (chord_code[z] == y+1) && (chord_code[z+1] == y+1) && (chord_code[z] == y+1) ){
				strings = strings + '<span class="last_point"></span>';
			}
			strings = strings + '</td>';
		}
		frets = frets + '<tr class="fret">' + strings + '</tr>';
	}
	if (chord_code.length == string_count){
		//chord-tooltip counter
		var generator_count = 0;
		//GET REQUEST
		if (request == 'download' || request == 'chord'){
			output(request,element)
			generate_Canvas(request,$('.chord-container').last())
		}
		else if (request == 'chord-tooltip'){
			output(request,element)
		}
	}
	function generate_Canvas(request,element){
		//css to canvas with download link
		var chord_count = $('.chord-container').length;
		for (var i = 0; i <= chord_count - 1; i++) {
			$('.chord-container:nth-child('+i+1+')').css({'display':'none'})
			$('.myCanvas:nth-child('+i+1+')').css({'display':'none'})
		};
		html2canvas(element, {
			onrendered: function(canvas) {
				//append image generator
				element.append(canvas);
				var filename = instrument+'-'+chord_name;
				var dataURL = canvas.toDataURL();
				$('canvas').attr('class','myCanvas').attr('hidden','hidden');
				if (request == 'download'){
					element.wrap('<a href="'+dataURL+'" download="'+filename+'.png"></a>');
					element.append('<div class="dl_bg"><span>Click to Download</span></div>')
				}
			}
		});
		$('.chord-container').css({'display':'inline-block'})
	}
	function output(request,element){
		element.append('<div class="chord-container ' + instrument + '">'
				+'<span class="chord-name">' + chord_name + '</span>'
				+'<div class="open-string">'
					+open_strings
				+'</div>'
				+'<table class="chord">'
					+frets
				+'</table>'
			+'</div>'
		);
	}
}

function _ajaxChord(type,request,instrument,element,chord_name){
	$('#chord-error').remove()
	var error_array = ['I\'m sorry..',
					   ':(',
					   'Aw! This is embarrassing.',
					   'Chord Not Found!',
					   'Aw!',
					   'T.T']
	if (type == 'tooltip'){
		var code
		var name
		$.ajax({
		    url: '../ajax/chords/chords.txt'
		})
		.success(function( result ) {
			obj = JSON.parse(result)
			var counter = 0
			for (var i = 0; i <= obj.length - 1; i++) {
				if ( obj[i].chord_name === chord_name && (instrument == 'guitar' && obj[i].variations[0].guitar != '') ||
				     obj[i].chord_name === chord_name && (instrument == 'ukulele' && obj[i].variations[0].ukulele != '') ){
					code = (instrument == 'guitar')?obj[i].variations[0].guitar:obj[i].variations[0].ukulele
					name = obj[i].chord_name
					element.append('<container class="chord-tooltip"></container>')
					//generate chord
					Diagram(request,instrument,$('> container',element),name,code)
					counter++
				}
			}
			if (counter == 0){
				element.append('<container hidden class="chord-tooltip">No Available<br>Diagram</container>')
			}
			counter = 0
			element.on('mouseover click', function(){
				$('container',this).css({'display':'inline-block'})
			});
			element.on('mouseleave',function(){
				$('container',this).delay(200).fadeOut(100)
			});
		})
	}
	else if (type == 'chord'){
		if ($('#chord-list').length == 0){
			element.append('<div id="chord-list"><div class="chord-generator"></div></div>')
		}
		else{
			$('#chord-list').append('<div class="chord-generator"></div>')
		}
		$.ajax({
	        url: '../ajax/chords/chords.txt'
	    })
	    .done(function( result ) {
			var chords = []
			var obj = JSON.parse(result)
			chord_name = chord_name.split(',')
			for (var k = 0; k <= chord_name.length - 1; k++) {
				for (var i = 0; i <= obj.length - 1; i++) {
					if (chord_name.length == 1) {
						//search for matched chords
						if (((obj[i].chord_name.match(chord_name[k]) != null) && (instrument == 'guitar' && obj[i].variations[0].guitar != '')) ||
						 ((obj[i].chord_name.match(chord_name[k]) != null) && (instrument == 'ukulele' && obj[i].variations[0].ukulele != '')) ){
							var code = (instrument == 'guitar')?obj[i].variations[0].guitar:obj[i].variations[0].ukulele
							var name = obj[i].chord_name
							chords.push({"code":code,"name":name})
						}	
					}
					else{
						//search for exact chords
						if (((obj[i].chord_name == chord_name[k]) && (instrument == 'guitar' && obj[i].variations[0].guitar != '')) ||
						 ((obj[i].chord_name == chord_name[k]) && (instrument == 'ukulele' && obj[i].variations[0].ukulele != '')) ){
							var code = (instrument == 'guitar')?obj[i].variations[0].guitar:obj[i].variations[0].ukulele
							var name = obj[i].chord_name
							chords.push({"code":code,"name":name})
						}	
					}
				}
			}
			if (chords.length > 0){
				//generate chord
				for (var j = 0; j <= Object.keys(chords).length - 1; j++) {
					Diagram('download',instrument,$('.chord-generator:last-child',element),chords[j].name,chords[j].code)
				}
			}
			else{
				element.append('<div id="chord-error">'
							 +'<h1>'+error_array[Math.floor(Math.random()*error_array.length)]+'</h1>'
							 +'<p>No available chord for now. Wanna generate your own?</p>'
							 +'<a class="create-diagram">Create diagram here..</a>'
							 +'</div>'
							 )
			}
	    })
	}
}