@extends ('user.layout')

@section('title')
	<?php echo ucfirst($user_info->username); ?>
@stop

@section('content')
	<div id="profile">
		<div id="profile-pic">
			<photo index="0" path="{{ URL::asset('img/6.jpg') }}"></photo>
			<div id="filter"></div>
		</div>
		<div id="name_info">
			<a id="name" href="{{ route( 'user_profile', [$user_info->username]) }}">{{ $user_info->username }}</a>
			<followers>1,363,567 Followers</followers>
			<visitors>23,363,567 Visitors</visitors>
		</div>
	</div>
	<div id="user-header">
		<div id="banner">
			<!-- <img src="{{ URL::asset('img/6.jpg') }}"> -->
		</div>
	</div>
	<div id="tabs">
		<li class="selected">Posts</li>
		<li>Songs</li>
		<li>Photos</li>
	</div>
	<div id="main-content">
	<div id="separator"></div>
		<div id="posts">
			<div id="user-post">
			<div id="user-info">
				<div id="dp"></div>
				<name>{{ $user_info->username }}</name>
			</div>
				<div id="caption">1st static post</div>
				<div id="media-container"><photo index="1" path="{{ URL::asset('img/dp.jpg') }}"></photo></div>
				<div id="media-container"><photo index="2" path="{{ URL::asset('img/2.png') }}"></photo></div>
			</div>
			<div id="user-post">
				<div id="caption">2nd static post</div>
				<div id="media-container"><photo index="3" path="{{ URL::asset('img/6.jpg') }}"></photo></div>
			</div>
			<div id="user-post">
				<div id="caption">3rd static post</div>
				<div id="media-container"><photo index="4" path="{{ URL::asset('img/3.png') }}"></photo></div>
			</div>
			<div id="user-post">
				<div id="caption">3rd static post<br>dfssdfsdfsdfd<br>sdfsdf</div>
				<div id="media-container"><vid index= '5' path="{{ URL::asset('video/JANELLA SALVADOR - Give Thanks (Official Lyric Video).mp4') }}"></vid></div>
			</div>
		</div>
		<div id="songs">
			@include('layouts._posts')
		</div>
		<div id="photos">
			<div id="user-post">
				<div id="caption">3rd static post<br>dfssdfsdfsdfd<br>sdfsdf</div>
				<div id="media-container"><vid index= '5' path="{{ URL::asset('video/JANELLA SALVADOR - Give Thanks (Official Lyric Video).mp4') }}"></vid></div>
			</div>
			<div id="user-post">
				<div id="caption">3rd static post<br>dfssdfsdfsdfd<br>sdfsdf</div>
				<div id="media-container"><vid index= '5' path="{{ URL::asset('video/JANELLA SALVADOR - Give Thanks (Official Lyric Video).mp4') }}"></vid></div>
			</div>
		</div>
	<br><br><br>
	</div>
@stop

@section('media-modal')
	<div id="media-modal" class="hide">
		<div id="bg-modal"></div>
		<div id="form">
			<div id="left">
				<div id="content">
					<div id="profile-pic">
						<img src="{{ URL::asset('img/dp.jpg') }}">
						<name><a href="{{ route('user_profile', ['$user_info->username']) }}"><?php echo ucfirst($user_info->username); ?></a></name>
					</div>
					INFO
				</div>
				<div id="user-tools">
					<li>Like</li>
					<li>Share</li>
				</div>
				<div id="comments">
					COMMENT
				</div>
			</div>
			<div id="right">
				<div id="navs">
					<div id="info">
						<li>Like</li>
						<li>Share</li>
					</div>
					<div id="tools">
						<li>324,323 views</li>
					</div>
				</div>
				<div id="transfer" hidden></div>
				<!-- <div id="content">
					<video width="400" controls>
					  <source src="{{ URL::asset('video/JANELLA SALVADOR - Give Thanks (Official Lyric Video).mp4') }}" type="video/mp4">
					  Your browser does not support HTML5 video.
					</video>
				</div> -->
			</div>
		</div>
	</div>
	Hello
@stop