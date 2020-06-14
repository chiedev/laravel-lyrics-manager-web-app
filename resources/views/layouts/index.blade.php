@extends('layout')

@section('title')
	Song Lists
@stop

@section('recent')
	<label>Recent</label>
	@foreach($songs_recent as $listsong)
		<li>
			<a href="{{ route('songs_path', [$listsong->slug]) }}" class="recent">{{$listsong->title}}</span></a>
			@if ($listsong->version > 1)
				<span>v.{{$listsong->version}}</span>
			@endif
			<span class="artist">
				@if ($listsong->artist <> "")
					by:{{$listsong->artist}}
				@else
					by:Unknown
				@endif
			</span>
		</li>
	@endforeach
@stop

@section('soundcloud')
	<div class="divider">
		<label>Spotify</label>
		<div id="tools">
			<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A0koYU8F8TUvbblUYZZrSKu" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>
			<!-- <iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fperfect_seven&color=white_transparent&size=64" style="width: 64px; height: 64px;"></iframe>
			<iframe src="https://embed.spotify.com/?uri=https://open.spotify.com/user/12163822076/playlist/5ta3bOYMxEXFriXoJ8j5gd" width="100%" height="100" frameborder="0" allowtransparency="true"></iframe> -->
		</div>
	</div>
@stop

@section('content')
	<div id="left">
		@include('layouts._posts')
	</div>
	<div id="right">
		PENDING!
	</div>
	
@stop

@include('layouts._modal')