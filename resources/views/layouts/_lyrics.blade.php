{!! HTML::style('css/chords/layout.css') !!}
{!! HTML::style('css/chords_custom.css') !!}
<div id="lyrics_module">
	<form method="POST" action="{{ route('song_delete', [$song->slug]) }}">
		<div id="lyrics_title">
			<pre>{{$song->title}}@if ($song->version > 1)<span id="v"> v. {{$song->version}}</span>@endif @if ($song->artist <> "")<span id="by">by {{$song->artist}}</span>@endif</pre>
			@if (Auth::user() && Auth::user()->id == $song->creator)
				<div id="user-tools">
					<a href="{{ route('song_edit', [$song->slug, 'edit']) }}"><img id="edit" src="{{URL::asset('img/Clean-Icons-Designed-by-Matt-Gentile-icondeposit-com/PNG Files/16x16/69.png')}}" title="Edit"></a>
					<input id="delete" type="image" src="{{URL::asset('img/Pixel UI Icon Set - PNG Icons/Trash.png')}}" alt="Submit" title="Delete">
					<!-- APPEND SCREEN MODE -->
				</div>
			@endif
		</div>
		<div id="lyrics_show" class="default">
			<pre class="mousescroll"><?php echo $song->lyrics; ?></pre>
		</div>
		<input type="hidden" name="id" value="{{$song->id}}" />
		<input type="hidden" name="slug" value="{{$song->slug}}" />
		<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
		<input type="hidden" name="chords" value="{{$song->chords}}" />
	</form>
</div>
<script type="text/javascript" src="{{URL::asset('js/chords/generate.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/chords/chords.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/plugins/html2canvas.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/chords/script.js')}}"></script>