@extends('home.layout')
@section('content')
	<div id="register_form">
		<h1>create new account</h1>
		<div id="inner-content">
			{!! FORM::open(['url' => 'auth/register', 'name' => 'register']) !!}
			<div id="inputs">
				<!-- {!! FORM::text('firstname', null, ['placeholder' => 'First Name', 'onkeyup' => 'button()', 'onblur' => 'button()']) !!}
				{!! FORM::text('lastname', null, ['placeholder' => 'Last Name', 'onkeyup' => 'button()', 'onblur' => 'button()']) !!}
				<hr> -->
				{!! FORM::label('username') !!}
				{!! FORM::text('username', null, ['placeholder' => 'Username', 'autofocus', 'onkeyup' => 'checkUser(this.value)', 'onblur' => 'checkUser(this.value)']) !!}
				
				{!! FORM::label('email') !!}
				{!! FORM::email('email', null, ['placeholder' => 'Email', 'onkeyup' => 'checkEmail(this.value)', 'onblur' => 'checkEmail(this.value)']) !!}
				
				{!! FORM::label('password') !!}
				{!! FORM::password('password', ['placeholder' => 'Password', 'onkeyup' => 'pass(this.value), match(this.value)', 'onblur' => 'pass(this.value), match(this.value)']) !!}
				
				{!! FORM::label('password_confirmation', 'Re-Type') !!}
				{!! FORM::password('password_confirmation', ['placeholder' => 'Re-type Password', 'onkeyup' => 'match(this.value)', 'onblur' => 'match(this.value)']) !!}
				<span id="lbl_pass">
					<input type="hidden" id="level" value="0">
					<li id="w">Weak</li>
					<li id="n">Normal</li>
					<li id="g">Good</li>
					<li id="s">Strong</li>
					<span></span>
				</span>
				@if (count($errors) > 0)
					<strong>Whoops!</strong><br>
					@foreach ($errors->all() as $error)
						<li>{{ $error }}</li>
					@endforeach
				@endif
			</div>
			<div id="label">
				<span id="lbl_username"><li id='tip'></li><span>required</span></span>
				<span id="lbl_email"><li id='tip'></li><span>required</span></span>
				{!! FORM::submit('Register', ['id'=>'button', 'disabled']) !!}
			</div>
			{!! FORM::close() !!}
		</div>
	</div>
@stop