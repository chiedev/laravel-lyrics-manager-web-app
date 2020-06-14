$(document).ready(function(){
	function makeChordDiagram(){
		$('#lyrics_show > pre .chord').each(function(){
			$(this).children().remove()
			var set_chord_name = $(this).text()
			generateChord('chord-tooltip','guitar',$(this),set_chord_name)
		})
	}
	function showChords(){
		var set_chord_name
		if ($('[name="chords"]').length > 0 && $('[name="chords"]').val() != ''){
			set_chord_name = $('[name="chords"]').val()
		}
		else if ($('[name="set_chords"]').length > 0 && $('[name="set_chords"]').val() != ''){
			set_chord_name = $('[name="set_chords"]').val()
		}
		else{
			$('#chord-list').parent().parent().remove()
		}
		$('#chord-list').html('')
		generateChord('chord','guitar',$('#chord-list'),set_chord_name)
	}
	makeChordDiagram()
	showChords()
	$('#standard').add('#transposeDown').add('#transposeUp').on('click',function(e){
		makeChordDiagram()
		// if(e.target.id == 'standard'){
		// 	showChords()
		// }
		// else if (e.target.id == 'transposeUp'){
		// 	var num = Number($("#label").text()); //current key
		// 	if (num > 0 && num != 'transpose'){
		// 		$('#chord-list .chord-name').each(function(){
		// 			for (v	ar i=0; i<num; i++){
		// 				transposeChord('up',$(this))
		// 			}	
		// 			var text = $(this).text()
		// 			$(this).parent().html('')
		// 			generateChord('chord','guitar',$('#chord-list'),text)
		// 		})
		// 	}
		// }
		// else if (e.target.id == 'transposeDown'){
		// 	var num = Number($("#label").text()); //current key
		// 	if (num > 0 && num != 'transpose'){
		// 		for (var i=0; i<num; i++){
		// 			$('#chord-list .chord-name').each(function(){
		// 				transposeChord('down',$(this))
		// 				showChords()
		// 			})
		// 		}
		// 	}
		// }
	})
})