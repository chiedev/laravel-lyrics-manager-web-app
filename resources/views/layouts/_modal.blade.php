@if (Auth::user())
	@section('modal')
		<div id="create-song" class="pop-up">
			<?php $type = 'modal'; ?>
			@include('layouts.modals._add_song')
		</div>
	@stop

	@section('add_song_link')
		<div class="button icon add-new pop-up-trigger" pop-trigger="create-song" title="create new">+</div>
	@stop

@endif
