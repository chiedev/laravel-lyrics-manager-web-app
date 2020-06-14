@extends ('masterlayout')

@section('head')
	{!! HTML::style('css/user-profile.css') !!}
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/posts.css') }}">
	<!--<script type="text/javascript" src="{{ URL::asset('js/photos.js') }}"></script>-->
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
					<div id="nav">
						<div class="tooltip-subject">
							<a href="/" class="tooltip" label="home"><img src="{{ URL::asset('img/knot_small.png') }}"></a>
						</div>
					</div>
				</div>
				<div id="middle">
				</div>
				<div id="right">
					@if (Auth::user())
						@if (Auth::user()->firstname || Auth::user()->lastname)
							<a href="{{ route( 'user_profile', [Auth::user()->username]) }}" id="user_link"><?php echo ucfirst(Auth::user()->firstname.' '.Auth::user()->lastname); ?></a>
						@else
							<a href="{{ route( 'user_profile', [Auth::user()->username]) }}" id="user_link"><?php echo ucfirst(Auth::user()->username); ?></a>
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
							<a href="/profile">
								<div id="link">Profile</div>
							</a>
							<a href="/settings">
								<div id="link">Settings</div>
							</a>
							<a href="/logout">
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
		@yield('media-modal')
		<div id="content">
			<div id="bg_content"></div>
			<div id="inner-content">
				@yield('content')
			</div>
		</div>

		@yield('other-sources')
		
		@foreach ($layouts as $layout)
			@if ($layout->right_content == 'not-visible')
				<div id="right_content" class="not-visible">
					<div id="bg"></div>

				</div>
			@elseif ($layout->right_content == 'visible')
				<div id="right_content" class="visible">
					<div id="bg"></div>

				</div>
			@endif
		@endforeach
	</div>

@stop