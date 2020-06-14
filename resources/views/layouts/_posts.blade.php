<div id="posts" class="mousescroll">
@foreach($songs_paging as $listsong)
	<div class="post">
		<div class="inner-content">
			<div id="username">
				<div id="border"></div>
				<a href=""><img id="avatar" src="{{URL::asset('img/logo.png')}}"></a>
				<a id="user" href="">{{ $listsong->username }}</a>
				<i class="fa fa-chevron-down"></i>
				<hr>
			</div>
			<div id="post-content">
				<a href="{{ route('songs_path', [$listsong->slug]) }}"><span id="title">{{ $listsong->title }}</span></a>
				@if ($listsong->artist != "")
					<i>by {{ $listsong->artist }}</i>
				@endif
				<pre class="post_content"><?php echo htmlspecialchars($listsong->lyrics) ?></pre>
			</div>
			@if (Auth::user())
				<div id="user-tools">
					<!-- <i class="fa fa-thumbs-up"><div>Like</div></i> -->
					<div id="beat_ajax"><i class="fa fa-heartbeat"><span>+1</span></i></div>
					<div id="save_ajax"><i class="fa fa-star"><span>save</span></i></div>
					<div id="info">
						<?php $beats = 0; $saves = 0;?>
						@foreach ($extensions as $data)
							<?php $beats = $beats + ($data->beat);  $saves = $saves + ($data->save); ?>
							<li>{{ $beats }} @if($beats>1) beats @else beat @endif </li>
							<li>{{ $saves }} @if($saves>1) saves @else save @endif </li>
						@endforeach
					</div>
				</div>
				<div id="comments">
					@foreach ($extensions as $data)
						<div>
							<div id="info">
								<a href=""><img id="avatar" src="{{URL::asset('img/logo.png')}}"></a>
								1hr
							</div>
							<div id="comment">{{ $data->comment }}

1
down vote
favorite
1
I am trying to make an array from elements with a certain class in my web page. The array should get the videofile attribute value from all a tags with the class videoLink.

The final values in the array should be. </br> </br> Like Reply </br> </br> 
							</div>
						</div>
					@endforeach
				</div>
				<div id="comments">
					@foreach ($extensions as $data)
						<div>
							<div id="info">
								<a href=""><img id="avatar" src="{{URL::asset('img/logo.png')}}"></a>
								1hr
							</div>
							<div id="comment">{{ $data->comment }} <span></br> </br> Like Reply</div> </br> </br> </span>
						</div>
					@endforeach
				</div>
			@endif
			<!-- <div id="real-content">
				<div id="user-tools">
					<i class="fa fa-thumbs-up"><div>Like</div></i>
					<i class="fa fa-heartbeat"><div>+1</div></i>
					<i class="fa fa-star"><div>Favorite</div></i>
					<textarea placeholder="Write your comment here..."></textarea>
				</div>
			</div> -->
		</div>
		@if (Auth::user())
			<!-- <div id="write">
				<a href=""><img id="avatar" src="{{URL::asset('img/logo.png')}}"><?php echo ucfirst(Auth::user()->username); ?></a>
				<textarea placeholder="Write your comment here..."></textarea>
			</div> -->
		@endif
	</div>
@endforeach
</div>