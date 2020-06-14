@extends ('masterlayout')

@section('head')
	{!! HTML::style('css/default.css') !!}
	@include('layouts.ajax._ajax')
@stop

@section('body')
	<div id="body" >
		<div class="error">
			<div class="content">
				403 Access Denied
			</div>
		</div>
	</div>
@stop