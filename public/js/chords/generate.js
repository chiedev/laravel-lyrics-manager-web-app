function generate(request,element,value){
	if (element == null || element == ''){
		element = $('body')
	}
	if (value == null || value == ''){
		value = ''
	}
	switch (request){
		case 'settings':
			_settings(value,element);
	}
}

function _settings(req,elem){
	switch (req){
		case 'chord-search':
			var chord_list = ['--select--','C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B']
			var quality_list = ['--select--','m','7','m7','M7','mM7','7&#x266D;5','m7&#x266D;5','M7&#x266D;5','mM7&#x266D;5','&#x2b;7','&#x2b;M7','&#xb0;7','7#9','7&#x266D;9','9','m9','M9','mM9','6/9','m6/9','&#xb0;','&#x2b;','sus2','sus4','7sus2','7sus4','M7sus2','M7sus4','add2','madd2','add4','madd4','add6','madd6','add9','madd9','dom','aug']
			var altbass_list = ['--select--','/C','/Db','/D','/Eb','/E','/F','/Gb','/G','/Ab','/A','/Bb','/B']
			var catalog_chord
			var catalog_quality
			var catalog_altbass
			var set_chord_name
			var set_instrument
			for (var i = 0; i <= chord_list.length - 1; i++) {
				catalog_chord = catalog_chord + '<option>' + chord_list[i] + '</option>'
			}
			for (var i_2 = 0; i_2 <= quality_list.length - 1; i_2++) {
				catalog_quality = catalog_quality + '<option>' + quality_list[i_2] + '</option>'
			}
			for (var i_3 = 0; i_3 <= altbass_list.length - 1; i_3++) {
				catalog_altbass = catalog_altbass + '<option>' + altbass_list[i_3] + '</option>'
			}
			elem.append('<div class="settings">'
							+'<div class="textbox">'
								+'<label>search</label>'
								+'<input type="text" id="search-chord-name" placeholder="Chord name"/>'
							+'</div>'
							+'<div class="dropdown" data-type="text">'
								+'<label>Instrument</label>'
								+'<select id="instrument-selector" class="mousescroll">'
									+'<option>guitar</option>'
									+'<option>ukulele</option>'
								+'</select>'
							+'</div>'
							+'<div class="textbox">'
								+'<label>number of frets</label>'
								+'<input type="number" id="set-fret" max="7" min="4" placeholder="0" value="5"/>'
							+'</div>'
							+'<div class="dropdown" data-type="text">'
								+'<label>Chord</label>'
								+'<select id="catalog-chord" class="mousescroll">'
								+ catalog_chord
								+'</select>'
							+'</div>'
							+'<div class="dropdown" data-type="text">'
								+'<label>Quality</label>'
								+'<select id="catalog-quality" class="mousescroll">'
								+ catalog_quality
								+'</select>'
							+'</div>'
							+'<div class="dropdown" data-type="text">'
								+'<label>Alt Bass</label>'
								+'<select id="catalog-altbass" class="mousescroll">'
								+ catalog_altbass
								+'</select>'
							+'</div>'
						+'</div>')
			$('#search-chord-name').add('#instrument-selector').add('#catalog-chord')
			.add('#catalog-quality').add('#catalog-altbass').add('#set-fret').on('change', function(){
				catalog_chord = ($('#catalog-chord').val() != '' && $('#catalog-chord').val() != '--select--') ? $('#catalog-chord').val() : ''
				catalog_quality = ($('#catalog-quality').val() != '' && $('#catalog-quality').val() != '--select--') ? $('#catalog-quality').val() : ''
				catalog_altbass = ($('#catalog-altbass').val() != '' && $('#catalog-altbass').val() != '--select--') ? $('#catalog-altbass').val() : ''
				set_instrument = $('#instrument-selector').val()
				$('#chord-list').html('')
				if (($('#search-chord-name').val() != set_chord_name) && set_chord_name){
					$('#catalog-chord').val('')
					$('#catalog-quality').val('')
					$('#catalog-altbass').val('')
				}
				else if (catalog_chord != '' || catalog_quality != '' || catalog_altbass != ''){
					$('#search-chord-name').val(catalog_chord+catalog_quality+catalog_altbass)
				}
				set_chord_name = $('#search-chord-name').val()
				generateChord('chord',set_instrument,$('#chord-list').parent(),set_chord_name)
			})
			break;
	}
	function __changed(elem){
		strings = ($('#instrument-selector').val() == 'guitar')?6:4
		$('#set-chord-code',elem).attr('maxlength',strings)
	}
	$('#instrument-selector').on('change',function(){
		__changed(elem)
		if ($('#virtual_instrument').length > 0){_instrument($(this).val(),elem)}
	})
	__changed(elem)
}