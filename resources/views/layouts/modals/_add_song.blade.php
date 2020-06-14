@if ($type == 'modal')
	<div class="tabs">
		<div class="navs">
			<div class="tab">
				<nav role="modal-tab1" class="active"></nav>
				<span>HTML Code</span>
			</div>
			<div class="tab">
				<nav role="modal-tab2"></nav>
				<span>View Mode</span>
			</div>
			<div class="tab">
				<nav role="modal-tab3"></nav>
				<span>Embed Code</span>
			</div>
		</div>

		<form method="POST" action="../add-new-song" id="add-song">
			<div class="panels">
				<content role="modal-tab1">
						<input type="text" id="title" name="form_title" placeholder="Song Title" required>
						<input type="text" id="artist" name="form_artist" placeholder="Artist">
						<input type="text" id="chords" name="form_chords" placeholder="Chords used (e.g C,G,Am,F)">
						<textarea class="mousescroll" name="form_lyrics" id="form_lyrics" placeholder="Lyrics"></textarea>
						<input type="submit" class="button green" value="OK">
				</content>
				<content role="modal-tab2">
					<pre class="mousescroll" id="form_html_lyrics"></pre>
				</content>
				<content role="modal-tab3">
					<!-- <div id="info">
						<span>Change Color to Blue : <i>7D98B9 ;</i></span>
						<span>Autoplay : <i>auto_play=true ;</i></span>
						<span>Hide related : <i>hide_related=true ;</i></span>
					</div> -->
					<textarea class="mousescroll" spellcheck="false" name="form_mp3" id="form_mp3" placeholder="Embed Code"></textarea>
					<div id="form_embed_view" class="mousescroll"></div>
				</content>
			</div>
			<input type="hidden" name="type" value="{{$typemodal}}" />
			<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
		</form>
	</div>

@elseif ($type == 'new-post')
<!-- PENDING! -->
<form method="POST" action="../add-new-song" id="add-song">
	<div class="text"><i class="fa fa-music"></i><input type="text" id="title" name="form_title" placeholder="Song Title" required></div>
	<div class="text"><i class="fa fa-microphone"></i><input type="text" id="artist" name="form_artist" placeholder="Artist"></div>
	<textarea name="form_lyrics" id="form_lyrics" placeholder="Lyrics"></textarea>
	<input type="submit" id="button" value="POST">
	<input type="hidden" name="type" value="{{$typemodal}}" />
	<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
</form>
@endif
