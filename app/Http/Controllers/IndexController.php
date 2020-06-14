<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Auth;
use App\Layout;
use App\Song;
use App\User;
use App\Extension;
use DB;

class IndexController extends Controller {

	private $user_id;
	public function __construct(){
		if(\Auth::check() ) {
			$this->user_id = Auth::user()->id;
		}
	}

	public function index(Request $song){
		if(\Auth::check() ) {
			$outputs['songs'] = Song::join('users', 'songs.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
			$outputs['songs_paging'] = Song::limit(5)->join('users', 'songs.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
			$outputs['sorted_songs_recent'] = Song::join('users', 'songs.creator', '=', 'users.id')->orderby('songs.id', 'desc')->where('users.id','=',$this->user_id)->get();
			$outputs['sorted_songs_asc'] = Song::join('users', 'songs.creator', '=', 'users.id')->orderby('title', 'asc')->where('users.id','=',$this->user_id)->get();
			$outputs['sorted_songs_desc'] = Song::join('users', 'songs.creator', '=', 'users.id')->orderby('title', 'desc')->where('users.id','=',$this->user_id)->get();
			$outputs['layouts'] = Layout::join('users', 'layouts.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
			$outputs['extensions'] = Extension::join('users', 'extensions.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
		}
		else{

			$outputs['songs'] = Song::get();
			$outputs['songs_paging'] = Song::limit(5)->skip(5)->get();
			$outputs['sorted_songs_recent'] = Song::orderby('id', 'desc')->get();
			$outputs['sorted_songs_asc'] = Song::orderby('title', 'asc')->get();
			$outputs['sorted_songs_desc'] = Song::orderby('title', 'desc')->get();

			//PENDING! make general data
			$outputs['extensions'] = Extension::get();
			$outputs['layouts'] = Layout::get();

		}

		// $outputs['tables'] = DB::raw('show tables'); list of tables
		$outputs['songs_recent'] = Song::orderby('id','desc')->take(5)->get();
		$outputs['typemodal'] = "index";
		return view('layouts.index', $outputs, compact('song'));
	}

	public function show($song){

		$outputs['songs'] = Song::join('users', 'songs.creator', '=', 'users.id')->get();
		$outputs['sorted_songs_recent'] = Song::orderby('id', 'desc')->get();
		$outputs['sorted_songs_asc'] = Song::orderby('title', 'asc')->get();
		$outputs['sorted_songs_desc'] = Song::orderby('title', 'desc')->get();
		$outputs['typeview'] = "view";
		$outputs['typemodal'] = "show";

		if(\Auth::check() ) {
			$outputs['layouts'] = Layout::join('users', 'layouts.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
		} else{ $outputs['layouts'] = Layout::get(); }

		return view('layouts.show', $outputs, compact('song'));

	}

	public function edit($song, $req){

		if(\Auth::check() &&  \Auth::user()->id == $song->creator) {

			$outputs['songs'] = Song::join('users', 'songs.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
			$outputs['sorted_songs_recent'] = Song::orderby('id', 'desc')->get();
			$outputs['sorted_songs_asc'] = Song::orderby('title', 'asc')->get();
			$outputs['sorted_songs_desc'] = Song::orderby('title', 'desc')->get();
			$outputs['typeview'] = "edit";
			$outputs['typemodal'] = "show";
			$outputs['error'] = $req;
			$outputs['msg'] = 'No Changes!';
			$outputs['layouts'] = Layout::join('users', 'layouts.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();

			return view('layouts.show', $outputs, compact('song'));

		}
		else{

			$outputs['songs'] = Song::get();
			$outputs['layouts'] = Layout::get();
			return view('errors.401', $outputs, compact('song'));

		}

	}
	public function user_profile(Request $request){

		$outputs['songs'] = Song::join('users', 'songs.creator', '=', 'users.id')->get();
		$outputs['sorted_songs_recent'] = Song::orderby('id', 'desc')->get();
		$outputs['sorted_songs_asc'] = Song::orderby('title', 'asc')->get();
		$outputs['sorted_songs_desc'] = Song::orderby('title', 'desc')->get();
		$outputs['extensions'] = Extension::get();
		$outputs['layouts'] = Layout::get();

		//Profile Info
		$username = $request->user->username;
		$id = $request->user->id;
		$outputs['user_info'] = User::where('username', $username)->where('id', $id)->first();
		$outputs['songs'] = Song::join('users', 'songs.creator', '=', 'users.id')->where('users.username','=',$username)->get();

		//Logged In User
		if(\Auth::check() ) {
			$outputs['layouts'] = Layout::join('users', 'layouts.creator', '=', 'users.id')->where('users.id','=',$this->user_id)->get();
		}

		return view('user.profile', $outputs);
	}

	public function search(Request $request) {

    if($request->ajax()) {
      $output = "";
      $songs = DB::table('songs')->where('title','LIKE','%'.$request->search."%")->take(10)->get();
      if($songs) {
        foreach ($songs as $key => $song) {
					$artist 	= ($song->artist != '' ? " " . $song->artist : '' );
					$ver 			= ($song->version > 1 ? ' v.' . $song->version : '');
					$siteURL 	= url('/');
					$output 	.= "<option value=\"" . $song->title . $ver . "\" link=\"" . $siteURL . "/songs/" . $song->slug . "\">" . $artist . "</option>";
        }
        return Response($output);
        }
     }

  }

}
