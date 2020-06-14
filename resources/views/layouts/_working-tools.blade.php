<div id="working-tools">
	<div id="section">
		<div id="container">
			<span id="title">SQL Statements</span>
			<hr>
			<div id="inner-content">
				<select class="dark-theme">
					<option>Create Database</option>
					<option>Create Table</option>
					<option>Drop Database</option>
					<option>Drop Table</option>
					<option selected>Select Table</option>
					<option>Truncate Table</option>
				</select>
			</div>
			<div id="innner-content">
				<select class="dark-theme">
					@foreach($tables as $table)
					<option>{{ $tables }}</option>
					@endforeach
				</select>
			</div>
			<div id="inner-content">
				<input class="dark-theme" type="text">
			</div>
		</div>
		<div id="container">
			<span id="title">Playlists</span>
			<hr>
			<div id="inner-content">
				<select class="dark-theme">
					@foreach($songs as $song)
					<option>{{ $song->title }}</option>
					@endforeach
				</select>
			</div>
		</div>
	</div>
</div>