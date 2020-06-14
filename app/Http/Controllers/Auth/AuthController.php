<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

use Illuminate\Http\Request;

class AuthController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Registration & Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles the registration of new users, as well as the
	| authentication of existing users. By default, this controller uses
	| a simple trait to add these behaviors. Why don't you explore it?
	|
	*/

	use AuthenticatesAndRegistersUsers;

	protected $redirectTo = '/';
	protected $loginPath = '/login';

	public function postLogin(Request $request)
	{
		$field = filter_var($request->user, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
	    $this->validate($request, [
	        'user' => 'required',
	        'password' => 'required',
	    ]);

	    $credentials = array($field => $request->user, 'password' => $request->password);

	    if ($this->auth->attempt($credentials, $request->has('remember')))
	    {
	        return redirect()->intended($this->redirectPath());
	    }

	    return redirect($this->loginPath())
	                ->withInput($request->only($field, 'remember'))
	                ->withErrors([
	                    $field => 'These credentials do not match our records.',
	                ]);
	}

	/**
	 * Create a new authentication controller instance.
	 *
	 * @param  \Illuminate\Contracts\Auth\Guard  $auth
	 * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
	 * @return void
	 */
	public function __construct(Guard $auth, Registrar $registrar)
	{
		$this->auth = $auth;
		$this->registrar = $registrar;

		$this->middleware('guest', ['except' => 'getLogout']);
	}

}
