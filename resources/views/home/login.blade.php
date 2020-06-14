@extends('home.layout')
@section('content')
	<div id="login_form">
		<div id="inner-content">
			<h1>stitch</h1>
			<img src="{{ URL::asset('img/logo2.png') }}">
			<hr>
			{!! FORM::open(['url' => 'auth/login']) !!}
			{!! FORM::text('user', null, ['placeholder' => 'Email | Username', 'autofocus']) !!}
			{!! FORM::password('password', ['placeholder' => 'Password']) !!}
			{!! FORM::submit('Login', ['id'=>'button']) !!}
			{!! HTML::link('register', 'Register') !!}<br>
			{!! HTML::link('retrieve', 'Forgot Password?') !!}
			{!! FORM::close() !!}
		</div>
		<div id="errors">
			@if (count($errors) > 0)
				<strong>Oops!</strong><br>
				@foreach ($errors->all() as $error)
					<li><img src="{{ URL::asset('img/cross.png') }}">{{ $error }}</li>
				@endforeach
			@endif
		</div>
	</div>
@stop