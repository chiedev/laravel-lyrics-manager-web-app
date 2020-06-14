@extends ('masterlayout')

@section('head')
	{!! HTML::style('css/default.css') !!}
	@include('layouts.ajax._ajax')
@stop

@section('body')
	<div id="body" >
		<div class="error">
			<div class="content">
				401 Unauthorized
			</div>
		</div>
	</div>
@stop