<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Song;
use App\User;
use Auth;

class FormController extends Controller {
	// public function __construct()
	// {
	//     $this->middleware('auth');
	// }

	public function getLogin(){
		if (Auth::user()) {
            // return redirect()->intended('/');
            return URL::previous();
        	// return Route::currentRouteName();
        }
		return view('home.login');
	}

	public function getRegister(){
		if (Auth::user()) {
            return redirect()->intended('/');
        }
		return view('home.register');
	}

	// public function postRegister(Request $input){
	// 	$insert_data['username'] = $input->input('username');
	// 	$insert_data['email'] = $input->input('email');
	// 	$insert_data['password'] = $input->input('password');
	// 	$insert_data['remember_token'] = csrf_token();

	// 	$rules = array('username' => 'required|unique:users', 'email' => 'required|unique:users', 'password' => 'required');
	// 	$validator = Validator::make($insert_data, $rules);
	// 	if ($validator->passes()){
	// 		User::insert($insert_data);
	// 	}
	// 	else{
	// 		echo "Please specified fields";
	// 	}
	// }

	public function logout(){
		Auth::logout();
		return redirect()->to('/');
	}
	public function add_new_song(Request $request){
		// function __construct()
		// {
		// 	$this->middleware('songs');
		// }
		/* Adding New Song|Lyrics */
		$insert_data['title'] = ucwords(strtolower(trim($request->input('form_title'))));
		$insert_data['artist'] = trim($request->input('form_artist'));
		$insert_data['lyrics'] = $request->input('form_lyrics');
		$insert_data['chords'] = $request->input('form_chords');
		$insert_data['mp3'] = $request->input('form_mp3');
		$insert_data['version'] = 1;
		$insert_data['slug'] = str_replace(' ', '_', strtolower($insert_data['artist']."-".$insert_data['title']));
		$insert_data['remember_token'] = $request->input('_token');
		$insert_data['creator'] = Auth::user()->id;
		// $insert_data['created_at'] = date('Y-m-d H:i:s');

		// $type = $request->input('type');
		// /*Retrieving the latest version of same song*/
		// $song = Song::where('title',$insert_data['title'])->where('artist',$insert_data['artist'])->orderby('version', 'desc')->first();
		//
		// $rules = array('title' => 'required', 'lyrics' => 'required');
		// $validator = Validator::make($insert_data, $rules);
		// if ($validator->passes()){
		// 	if (count($song) > 0){
		// 		$insert_data['version'] = ($song->version)+1;
		// 		$insert_data['slug'] = $insert_data['slug']."_v".$insert_data['version'];
		// 		Song::insert($insert_data);
		// 		return redirect()->to('songs/'.$insert_data['slug']);
		// 	}
		// 	else{
		// 		Song::insert($insert_data);
		// 		return redirect()->to('songs/'.$insert_data['slug']);
		// 	}
		// }
		// else if ($validator->fails()){
		// 	foreach ($insert_data as $data) {
		// 		return redirect()->to('/');
		// 	}
		// }

		// $song = Song::where('title',$insert_data['title'])->where('artist',$insert_data['artist'])->orderby('version', 'desc')->first();
		// //-----------------------------------------------------------------------------------------------------------------------------------------------
		// if (($insert_data['title'] == "" && $insert_data['lyrics'] == "")||($insert_data['title'] == "" ) || ($insert_data['lyrics'] == "" )){
    //         //DB::table('tbl_echie')->where('id','23')->update($insert_data);
    //         //DB::table('tbl_echie')->where('id','23')->delete();
		// 	echo "<script> alert('Sorry Please Try Again. Fill up all the required field.');
		// 	history.back(-1);
		// 	</script>";
		// }
		// elseif (count($song) > 0){
		// 	$insert_data['version'] = ($song->version)+1;
		// 	$insert_data['slug'] = $insert_data['slug']."_v".$insert_data['version'];
		// 	Song::insert($insert_data);
		// 	if ($type == "index"){
		// 		echo "<script>location.href='/';</script>";
		// 	}
		// 	elseif ($type == "show"){
		// 		echo "<script>location.href='/songs/".$insert_data['slug']."';</script>";
		// 	}
		// }
		// else{
			Song::insert($insert_data);
		// 	if ($type == "index"){
		// 		echo "<script>location.href='/';</script>";
		// 	}
		// 	elseif ($type =="show"){
		// 		echo "<script>location.href='/songs/".$insert_data['slug']."';</script>";
		// 	}
		// }

	}

	public function update_song(Request $request){
		/* Updating A Song|Lyrics */
		$insert_data['title'] = ucwords(strtolower(trim($request->input('edit_title'))));
		$insert_data['artist'] = trim($request->input('edit_artist'));
		$insert_data['lyrics'] = $request->input('edit_lyrics');
		$insert_data['chords'] = $request->input('set_chords');
		$insert_data['mp3'] = $request->input('mp3_link');
		$insert_data['slug'] = str_replace(' ', '_', strtolower($insert_data['artist']."-".$insert_data['title']));
		$insert_data['id'] = $request->input('id');
		/*Song that you want to update*/
		$song = Song::where('id',$insert_data['id'])->first();
		$insert_data['version'] = $song->version;
		/*Retrieving the latest version of same song*/
		$existing = Song::where('title',$insert_data['title'])
						->where('artist',$insert_data['artist'])
						->where('id','<>',$insert_data['id'])
						->orderby('version','desc')->first();


		$rules = array('title' => 'required', 'lyrics' => 'required');
		$validator = Validator::make($insert_data, $rules);
		if ($validator->passes()){
			if (($insert_data['title'] == $song->title)&&($insert_data['lyrics'] == $song->lyrics)
				&&($insert_data['artist'] == $song->artist)&&($insert_data['mp3'] == $song->mp3)
				&&($insert_data['chords'] == $song->chords)){
				$slug = $request->input('slug');
				return redirect()->to( route('song_edit', [$slug, 'edit-error']) );
			}
			else{
				if ((count($existing) > 0 ) && ($existing->version > 0 )
					&& ($insert_data['title'] != $song->title)){
					$insert_data['version'] = number_format($existing->version)+1;
					$insert_data['slug'] = $insert_data['slug']."_v".$insert_data['version'];
				}
				else if (($insert_data['title'] == $song->title)
					&&($insert_data['artist'] == $song->artist)){
					$insert_data['slug'] = $request->input('slug');
				}
				else {
					$insert_data['version'] = 1;
				}
				Song::where('id',$insert_data['id'])->update($insert_data);
				return redirect()->to( route('songs_path', $insert_data['slug']) );
			}
		}
	}

	public function delete_song(Request $request){
		/* Deleting A Song|Lyrics */
		$insert_data['id'] = $request->input('id');
		$song = Song::where('id',$insert_data['id'])->first();
		if ($insert_data['id'] == $song->id){
			Song::where('id',$insert_data['id'])->delete();
			echo "<script>window.location.href = '/' ;</script>";
		}
	}

}
