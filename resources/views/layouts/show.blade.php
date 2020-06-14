@extends('layout')

@section('title')
	{{$song->title}}
@stop

@section('tools')

	<div class="inner_content">
		<span id="label" class="default">transpose</span>
		<div id="buttons">
			<input id="transposeUp" class="button" type="button" value="▲" />
			<input id="standard" class="button reset" type="button" value="reset" />
			<input id="transposeDown" class="button" type="button" value="▼" />
		</div>
	</div>
	
@stop

@section('similar')
	<?php $count = 0; ?>
	@foreach($songs as $listsong)
		@if (($listsong) && ($listsong->title == $song->title) && ($listsong->slug != $song->slug))
			@if ($listsong->version >= 1)
					<?php $count++ ; ?>
			@endif
		@endif
	@endforeach
	@if ($count >= 1)
		<div class="divider">
			<label>Other Version / s</label>
			@foreach($songs as $listsong)
					@if (($listsong) && ($listsong->title == $song->title) && ($listsong->slug != $song->slug))
						<li>
							<a href="{{ route('songs_path', [$listsong->slug]) }}" id="similar">{{$listsong->title}}</a>
							@if ($listsong->version >= 1)
								<span>v.{{$listsong->version}}</span>
							@endif
							<span id="artist">
								@if ($listsong->artist <> "")
									by:{{$listsong->artist}}
								@else
									by:Unknown
								@endif
							</span>
						</li>
					@endif
			@endforeach
		</div>
	@endif
@stop

@section('content')
	<div id="inner-content">
		@if ($typeview == "view")
			@include('layouts._lyrics')
		@elseif ($typeview == "edit")
			@include('layouts._lyrics_update')
		@endif
	</div>
@stop

@include('layouts._modal')

@section('other-sources')
	<div id="sticky-right" class="mousescroll">
		@if ($song->mp3)
			<div id="navs">
				<?php echo html_entity_decode($song->mp3); ?>
			</div>
		@endif
	</div>
@stop

@section('chords_used')
	<div class="divider">
		<label>Original Chords Used</label>
		<div class="inner_content">
			<div id="chord-list"></div>
		</div>
	</div>
@stop