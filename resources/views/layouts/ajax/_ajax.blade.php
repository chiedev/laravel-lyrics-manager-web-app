<script>
	function checkUser(str) {
	    if (str.length == 0) {
	        document.getElementById("lbl_username").innerHTML = "<li id='tip'></li><span>required</span>";
	        return;
	    }
	    else {
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("lbl_username").innerHTML = xmlhttp.responseText;
	            }
	            button();
		    }
	        xmlhttp.open("GET", "{{ URL::asset('ajax/auth.php?user=') }}" + str, true);
	        xmlhttp.send();
	    }

	}
	function checkEmail(str) {
	    if (str.length == 0) {
	        document.getElementById("lbl_email").innerHTML = "<li id='tip'></li><span>required</span>";
	        return;
	    }
	    else {
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("lbl_email").innerHTML = xmlhttp.responseText;
	            }
	            button();
		    }
	        xmlhttp.open("GET", "{{ URL::asset('ajax/auth.php?email=') }}" + str, true);
	        xmlhttp.send();
	    }
	}
	function checkPass(str){
		if (str.length != 0) {
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                document.getElementById("lbl_pass").innerHTML = xmlhttp.responseText;
	            }
	            pass();
		    }
	        xmlhttp.open("GET", "{{ URL::asset('ajax/auth.php?pass=') }}" + str, true);
	        xmlhttp.send();
    	}
	}
	function pass(str){
		button();
		//----Must contain 5 characters or more
		//var WeakPass = /(?=.{5,}).*/;
		//----Must contain lower case letters and at least one digit.
		//var MediumPass = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;
		//----Must contain at least one upper case letter, one lower case letter and one digit.
		//var StrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;
		//----Must contain at least one upper case letter, one lower case letter and one digit.
		var VryStrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{5,}$/;
		var target_pass = $('#register_form #inner-content #inputs input[type=password][name=password]').val();
		var label = $('#register_form #inner-content #inputs #lbl_pass');
		var strength = Number($('#register_form #inner-content #inputs #lbl_pass #level').val());
		var arr = [/(?=.{5,}).*/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];

		if (str.length == 0) {
			check();
			return;
		}
		jQuery.map(arr, function(regexp) {
		  if(target_pass.match(regexp))
		     strength++;
		});
		if (strength == 1) {
			check();
			label.addClass('weak');
		}
		else if (strength == 2) {
			check();
			label.addClass('normal');
		}
		else if (strength == 3) {
			check();
			label.addClass('good');
		}
		else if (strength == 4){
			check();
			label.addClass('strong');
		}
		function check(){
			if (label.hasClass('weak')){
				label.removeClass('weak');
			}
			else if (label.hasClass('normal')){
				label.removeClass('normal');
			}
			else if (label.hasClass('good')){
				label.removeClass('good');
			}
			else if (label.hasClass('strong')){
				label.removeClass('strong');
			}
		}
	}
	function match(str){
		button();
		color();
		var target_pass = $('#register_form #inner-content #inputs input[type=password][name=password]').val();
		var target_repass = $('#register_form #inner-content #inputs input[type=password][name=password_confirmation]').val();
		var label = $('#register_form #inner-content #inputs #lbl_pass span');
		if (target_pass == '' || target_repass == '') {
			label.text('');
			return;
		}
		if (target_pass == target_repass) {
			label.text('matched!');
			label.addClass('green');
			color('g');
		}
		else if (target_pass != target_repass){
			label.text('mismatched!');
			label.addClass('red');
			color('r');
		}
		function color(c){
			var label = $('#register_form #inner-content #inputs #lbl_pass span');
			if (label.hasClass('red')) {
				label.removeClass('red');
			}
			else if (label.hasClass('green')) {
				label.removeClass('green');
			}

			if (c == 'r') {
				label.addClass('red');
			}
			else if (c == 'g') {
				label.addClass('green');
			}
		}

	}
	function button(){
		//-----------------------button DISABLED|ENABLED---------------------------------
        var target_user = $('#register_form #inner-content #label #lbl_username span');
        var target_email = $('#register_form #inner-content #label #lbl_email span');
        var target_pass = $('#register_form #inner-content #inputs input[type=password][name=password]');
        var target_repass = $('#register_form #inner-content #inputs input[type=password][name=password_confirmation]');
        var label = $('#register_form #inner-content #inputs #lbl_pass span');
        var label2 = $('#register_form #inner-content #inputs #lbl_pass');
	    if (target_user.hasClass('red') || target_email.hasClass('red') || target_pass.val() == '' || target_repass.val() == '' || label.hasClass('red') || label2.hasClass('weak') ){
	        $('#register_form #inner-content #label input[type=submit]').attr('disabled','disabled');
	    }
	    else if (target_user.hasClass('green') && target_email.hasClass('green') && target_pass.val() != '' && target_repass.val() != '' && label.hasClass('green') && (label2.hasClass('normal') || label2.hasClass('good') || label2.hasClass('strong')) ){
	        $('#register_form #inner-content #label input[type=submit]').removeAttr('disabled');
	    }
	    //-------------------------------------------------------------------------------
	}
</script>
