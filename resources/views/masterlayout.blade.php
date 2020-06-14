<!DOCTYPE html>
<html>
<head>
	<meta name="_token" content="{{ csrf_token() }}">
	<title>@yield('title')</title>
	@include('resources._head')
	@yield('head')
	@yield('header')
</head>
<body>
	<div class="loading">
		<div class="content">
			<img src="{{URL::asset('img/svgs/RDbg.svg')}}"/>
		</div>
	</div>

	@yield('body')
	@include('layouts._footer')

	<script type="text/javascript">
		$('#search_ajax').on('keyup',function(){
			var q = $(this).val();
			$.ajax({
				type 		: 'get',
				url 		: '{{URL::to('search')}}',
				data		:	{'search': q},
				success	:function(data){
					$('#txtHint').html(data);
				}
			});
		})
	</script>
	<script type="text/javascript">
		$.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
	</script>
</body>
</html>
