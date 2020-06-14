<!DOCTYPE html>
<html>
<head>
	<title>Stitch</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="{{ URL::asset('js/initial.js') }}"></script>
	<link href='//fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
	{!! HTML::style('//fonts.googleapis.com/css?family=Yanone+Kaffeesatz') !!}
	{!! HTML::style('css/default.css') !!}
	{!! HTML::style('css/initial.css') !!}
	@include('layouts.ajax._ajax')
</head>
<body>
	<div id="initial_background">
		<div id="main"></div>
		<img id="cloud1" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<img id="cloud2" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<img id="cloud3" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<div id="birds">
			<img id="bird1" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird2" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird3" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird4" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird5" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird6" src="{{ URL::asset('img/flying-bird.gif') }}">
			<img id="bird7" src="{{ URL::asset('img/flying-bird.gif') }}">
		</div>
		<img id="bird" src="{{ URL::asset('img/flying-bird.gif') }}">
		<img id="cloud4" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<img id="cloud5" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<img id="cloud6" src="{{ URL::asset('img/lowpoly-cloud.png') }}">
		<div id="gradient">
			<div></div>
		</div>
	</div>
	<div id="body">
		@yield('content')
	</div>
</body>
</html>
