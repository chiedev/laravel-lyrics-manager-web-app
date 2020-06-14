$(document).ready(function(){
//---------------------------Scroll Lyrics--------------------------
    $("#scroll").on('click',function () {

    	var label_num = Number($('#scroller span').text());
		var callback_label_num =  Number($("#scroller nav").text());
		var target = $("#scroll");

    	if (target.hasClass('scroll')){
	    	if (callback_label_num == 0){
	    		if (label_num == 0){
		    		$("#scroller span").text(1);
		    		if (callback_label_num == 0){
		    			$("#scroller nav").text(1);
		    		}
	    		}
	    		else if (label_num > 0){
	    			$("#scroller nav").text(label_num);
	    			if (callback_label_num != 0){
			    		$("#scroller span").text(callback_label_num);
					}
		    	}
	    	}
    		else{
    			$("#scroller span").text(label_num);
	    		$("#scroller nav").text(callback_label_num);
    		}
    		scrollDown_req('stop');
    	}
    	else if (target.hasClass('scrolling')){
	    	if (callback_label_num != 0){
	    		$("#scroller nav").text(0);
    		}
    		scrollDown_req('start');
    	}
    });
    var scrollCount = 0;
    function scrollDown(curr_position){
    	var obj_height = $('#lyrics_show pre')[0].scrollHeight
    	// var speed = 10
    	var speed = $("#scroller nav").text()
    	var multiplier = 11 - speed
    	var duration = multiplier * 10
    	// if (speed > 0){
    		// if (curr_position == curr_position){
		    		 // alert('asduybasbad')
			    	scrolling : for (var i = 0; i <= 4; i++) {
				    	if (speed == 0){
			    			break scrolling;
			    		}
			    		// else{
					    	$('#lyrics_show pre').animate({scrollTop:i}, duration)
			    		// }
		    		}
			    // $('#lyrics_show pre').scrollTop($('#lyrics_show pre').scrollHeight, $('#lyrics_show pre').scrollTop());
			// }
    		// scrollCount += Number(speed - .5);
    		// // scrollCount -= Number(speed);
	    	// $('#lyrics_show pre').scrollTop($('#lyrics_show pre').scrollHeight, scrollCount);
	    	// // curr_position = $('#lyrics_show pre').scrollTop();
	    	// curr_position = curr_position
	    	// requestAnimationFrame(scrollDown)

    	// }
    }
    function scrollDown_req(request){
    	var target = $("#scroll");
    	if (request == 'start'){
	    	if (target.hasClass('scrolling')){
	    		target.html('scroll');
	    		$("#scroll").addClass('scroll');	
		    	$("#scroll").removeClass('scrolling');
			}
    	}
    	else if (request == 'stop') {
	    	if (target.hasClass('scroll')){
	    		target.html('stop');
	    		$("#scroll").addClass('scrolling');
		    	$("#scroll").removeClass('scroll');
		    }
    	}
		curr_position = $('#lyrics_show pre').scrollTop();
    	scrollDown(curr_position)
    }

    $("#scroll_fast").click(function () {
    	var label = $("#scroller span");
    	var label_num = Number(label.text());
		var callback_label_num =  Number($("#scroller nav").text());

		label.text(label_num+1);
		$("#scroller nav").text(label_num+1);
		scrollDown_req('stop')
    });

    $("#scroll_slow").click(function () {
    	var label = $("#scroller span");
    	var label_num = Number(label.text());
		var callback_label_num =  Number($("#scroller nav").text());
		if ((label_num-1) >= 0){
			label.text(label_num-1);
			$("#scroller nav").text(label_num-1);
			if ((label_num-1) == 0){
    			scrollDown_req('start');
			}
			else{
				scrollDown_req('stop')
			}
		}
    });

});