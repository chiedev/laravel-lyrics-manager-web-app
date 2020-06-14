<div id="bg"></div>
<div id="space">
    @if (Auth::user()) @yield('add_song_link')<div id="title">my songs</div>
    @else <div id="title">top 100 songs</div>
    @endif
    <div id="nav">
        <div id="drop-down" class="cursor"></div>
        <div id="drop-down-content" class="hide">
            <span>sort</span>
            <div id ="name_asc">name (ASC)</div>
            <div id ="name_desc">name (DESC)</div>
            <div id="recent">recent</div>
        </div>
    </div>
</div>

<div class="inner_content mousescroll">
    <div id="sorted-name-asc" hidden="hidden">
        @foreach($sorted_songs_asc as $mysong)
            @if ($mysong->slug == $song->slug)
                <a><div id="links" class="selected">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @else
                <a href="{{ route('songs_path', [$mysong->slug]) }}"><div id="links">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @endif
        @endforeach
    </div>
    <div id="sorted-name-desc" hidden="hidden">
        @foreach($sorted_songs_desc as $mysong)
            @if ($mysong->slug == $song->slug)
                <a><div id="links" class="selected">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @else
                <a href="{{ route('songs_path', [$mysong->slug]) }}"><div id="links">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @endif
        @endforeach
    </div>
    <div id="sorted-name-recent" hidden="hidden">
        @foreach($sorted_songs_recent as $mysong)
            @if ($mysong->slug == $song->slug)
                <a><div id="links" class="selected">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @else
                <a href="{{ route('songs_path', [$mysong->slug]) }}"><div id="links">{{$mysong->title}}<span>@if($mysong->version>1) v.{{$mysong->version}}@endif</span></div></a>
            @endif
        @endforeach
    </div>   
</div>
