<?php namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Song extends Eloquent{
	//This is optional---the class "Song" has the default table of its plural form "songs"
	 protected $table = 'songs';
	// protected $timestamps = true ;
}