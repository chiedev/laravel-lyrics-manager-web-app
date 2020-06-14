<?php namespace App\Http\Controllers;

  use Illuminate\Http\Request;
  use DB;

class SearchController extends Controller {

  public function index() {
   return view('search.search');
  }

  public function search(Request $request) {

    if($request->ajax()) {
      $output="";
      $songs=DB::table('songs')->where('title','LIKE','%'.$request->search."%")->get();

      if($songs) {

        foreach ($songs as $key => $song) {

          $output.='<tr>'.

          '<td>'.$song->id.'</td>'.

          '<td>'.$song->title.'</td>'.

          '<td>'.$song->artist.'</td>'.

          '<td>'.$song->lyrics.'</td>'.

          '</tr>';

          }

          return Response($output);

        }

     }

  }

}
