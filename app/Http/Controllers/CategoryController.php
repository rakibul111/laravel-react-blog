<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use App\Lib\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use Helper;

    public function __construct()
    {
        // authenticate only these methods
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->input('all')) {
            $categories = Category::orderBy('id', 'DESC')->get();
        } else {
            $categories = Category::paginate(10);
        }

        return response()->json(['data' => $categories], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // if the user is not admin
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        // data validation
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => $validator->errors()->all()
            ], 422);
        }
        // $category = new Category();
        // $category->title = $request->input('title');
        // $category->slug = $this->slugify($category->title);
        // $category->save();

        // ORM
        // get the title from input 
        $title = $request->input('title');

        // make slug for specific model
        $slug = $this->slugify($title, Category::class);

        $category = Category::create(['title' => $title, 'slug' => $slug]);

        return response()->json(['data' => $category, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['data' => $category], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => $validator->errors()->all()
            ], 422);
        }

        $category = Category::findOrFail($id);
            
        $category->title = $request->input('title');

        $category->slug = $this->slugify($category->title, Category::class);

        $category->save();

        return response()->json(['data' => $category, 'message' => 'Updated successfully'], 200);

        // if model is not found, 404 error will be shown 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }

    // Error handling...
}