@extends ('masterlayout')

@section('head')
	{!! HTML::style('css/default.css') !!}
	@include('layouts.ajax._ajax')
@stop

@section('header')
<div id="background">
	<div id="gradient"></div>
</div>
<div id="header">
	<div id="header-bg-white"></div>
	<div id="header-bg"></div>
	<div id="header-content">
		<div id="inner-content">
			<div id="left">
				<form id="formSearch" method="post">
					<input list="txtHint" tabindex="1" type="text" placeholder="Search.." id="search_ajax" value="{{$song->title}}">
					<datalist id="txtHint"></datalist>
				</form>
			</div>
			<div id="middle">
				<div id="nav">
					<div class="tooltip-subject">
						<a href="/" class="tooltip" label="home"><img src="{{ URL::asset('img/knot_small.png') }}"></a>
					</div>
				</div>
			</div>
			<div id="right">
				@if (Auth::user())
						@if (Auth::user()->firstname || Auth::user()->lastname)
							<a id="user_link"><?php echo ucfirst(Auth::user()->firstname.' '.Auth::user()->lastname); ?></a>
						@else
							<a id="user_link"><?php echo ucfirst(Auth::user()->username); ?></a>
						@endif
				<img id="user" class="user_link" src="{{URL::asset('img/user.png')}}">
				<img id="menu" src="{{URL::asset('img/menu.png')}}">
				@else
					<button class="login_link">Login</button>
					<div id="user-login">
						<div id="tooltip" class="hide">
							<div id="tip"></div>
							<div id="content">
								{!! FORM::open(['url' => 'auth/login']) !!}
								{!! FORM::text('user', null, ['placeholder' => 'Email | Username', 'autofocus']) !!}
								{!! FORM::password('password', ['placeholder' => 'Password']) !!}
								{!! FORM::submit('Login', ['id'=>'button']) !!}
								{!! HTML::link('register', 'Register') !!}<br>
								{!! HTML::link('retrieve', 'Forgot Password?') !!}
								{!! FORM::close() !!}
							</div>
						</div>
					</div>
				@endif
			</div>
			@if (Auth::user())
			<div id="user">
				<div id="tooltip" class="hide">
					<div id="tip"></div>
					<div id="content">
						<span>User</span>
						<a href="{{ route( 'logout') }}">
							<div id="link">Logout</div>
						</a>
					</div>
				</div>
			</div>
			@endif
		</div>
	</div>
</div>
@stop

@section('body')

	<div id="body">

		@yield('modal')
		<div id="left_content">
			<div id="bg"></div>
			<div id="inner-content" class="mousescroll">
				@include('layouts._leftpanel')
			</div>
		</div>
		<div id="content">
			<div id="bg_content"></div>
			@yield('content')
		</div>

		@yield('other-sources')

		<div id="right_content">
			@include('layouts._rightpanel')
		</div>
	</div>
@stop
