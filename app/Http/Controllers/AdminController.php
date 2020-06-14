<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller {

	public function getIndex(){
		return view('layouts.index');
	}
}
