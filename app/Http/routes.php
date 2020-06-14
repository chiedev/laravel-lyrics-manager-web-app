<?php
use App\Song;
use App\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
$router->bind('song', function($slug){
	return Song::whereSlug($slug)->first();
});
$router->bind('user', function($user){
	return User::where('username', $user)->first();

});

/*----------------------------------------------------------------------------*/
//------------------------------AUTHENTICATION--------------------------------//
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
Route::any('/', 'IndexController@index');
Route::get('/search','IndexController@search');
Route::get('/login', 'FormController@getLogin');
Route::get('/register', 'FormController@getRegister');
Route::post('/register', 'FormController@postRegister');
Route::get('/logout', ['as' => 'logout', 'uses' => 'FormController@logout']);

/*----------------------------------------------------------------------------*/
//---SongsController---//
// Route::resource('songs', 'SongsController');
// Route::resource('songs/link', 'SongsController');

Route::post('/add-new-song', 'FormController@add_new_song');
Route::post('songs/add-new-song', 'FormController@add_new_song');

Route::post('/songs/{song}/update-song', 'FormController@update_song');

Route::post('/songs/{song}/delete', ['as' => 'song_delete', 'uses' => 'FormController@delete_song']);
Route::any('/songs/{song}', ['as' => 'songs_path', 'uses' => 'IndexController@show']);
Route::any('/songs/{song}/{req}', ['as' => 'song_edit', 'uses' => 'IndexController@edit']);


//--------------------------------USER-AREA-----------------------------------//
Route::get('/{user}',['as' => 'user_profile', 'uses' => 'IndexController@user_profile']);
// Route::get('/profile',['as' => 'user_profile', 'uses' => 'IndexController@user_profile']);

/*----------------------------------------------------------------------------*/
