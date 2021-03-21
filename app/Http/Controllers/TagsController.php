<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->has('all')) {
            $tags = Tag::all();
        } else {
            $tags = Tag::with('posts')->paginate(10);
        }

        return response()->json(['data' => $tags], 200);
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   // if the user is not admin
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

        $tag = new Tag();

        $tag->title = $request->input('title');

        $tag->save();

        return response()->json(['data' => $tag, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tag = Tag::findOrFail($id);

        return response()->json(['data' => $tag], 200);
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

        $tag = Tag::findOrFail($id); //no need to handle if fail

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

        $tag->title = $request->input('title');

        $tag->save();

        return response()->json(['data' => $tag, 'message' => 'Updated successfully'], 200);
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

        $tag = Tag::findOrFail($id);

        $tag->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}