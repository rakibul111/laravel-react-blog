<?php

namespace App\Http\Controllers;

use App\Lib\Helper;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
// use Symfony\Component\HttpFoundation\File\File;
use File;

class PostsController extends Controller
{
    use Helper;

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
        try{
            if($request->input('recent')) {   // in case of recent posts in website homepage

                // Eager load related models using with() method
                $posts = Post::with('category', 'user', 'tags')->where('published', 1)->orderBy('id', 'DESC')->limit(7)->get();
            }
            
            else if($request->input('category')) {   // in case of posts per category page
    
                // $posts = Post::with('category', 'user', 'tags')->whereHas('category', function ($query) use ($request) {
                //     $query->where('id', $request->input('category'));
                // })->where('published', 1)->orderBy('id', 'DESC')->paginate(10);
    
                $posts = Post::with('category', 'user', 'tags')
                ->where('category_id', $request->input('category'))
                ->where('published', 1)->orderBy('id', 'DESC')->paginate(10);
            }
    
            else if($request->input('tag')) {    // in case of posts per tag page
              
                $tag = $request->input('tag'); 
    
                $posts = Tag::findOrFail($tag)->posts()->where('published', 1)->with('category', 'user', 'tags')->orderBy('id', 'DESC')->paginate(10);
                
                // $posts = Post::with('category', 'user', 'tags')->whereHas('tags', function ($query) use ($request) {
                //     $query->where('id', $request->input('tag'));
                // })->where('published', 1)->orderBy('id', 'DESC')->paginate(10);
            }
    
            else {   // the default case for the admin posts
                $posts = Post::with('category', 'user', 'tags')->orderBy('id', 'DESC')->paginate(10);
            }
    
            return response()->json(['data' => $posts], 200);
        }
        catch(Exception $error){
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in fetching posts!',
                'errors' => $error,
            ]);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized action'], 500);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',

                'errors' => ['title' => $validator->errors()->get('title'),
                    'content' => $validator->errors()->get('content'),
                    'category_id' => $validator->errors()->get('category_id')]
            ], 422);
        }

        $post = new Post();

        $post->title = $request->input('title');

        $post->slug = $this->slugify($post->title, Post::class);

        $post->content = $request->input('content');

        if($request->has('published')){
            $post->published = $request->input('published');
        }

        $post->category_id = $request->input('category_id');

        // add authenticated user id
        $post->user_id = auth()->user()->id;

        // if there is file in image field
        if($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $post->image = $filename;
        }

        $post->save();

        // store tags
        // many to many association (intermediate table update)
        if($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        }

        $post = Post::with('tags')->find($post->id);

        return response()->json(['data' => $post, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 
        $post = Post::with('category', 'user', 'tags', 'comments', 'approvedComments')->findOrFail($id);

        $post->prev_post = Post::where('id', '<', $id)->orderBy('id', 'desc')->first();

        $post->next_post = Post::where('id', '>', $id)->first();

        return response()->json(['data' => $post], 200);
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

        $post = Post::with('tags')->findOrFail($id);

        $rules = [
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required',
            'published' => 'required'
        ];

        if($post->image == "" || ($post->image != "" && \File::exists('uploads/' . $post->image))) {
            $rules['image'] = 'required';
        }

        // $this->validate($request, $rules);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'category_id' => 'required',
            'published' => 'required'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                
                'errors' => ['title' => $validator->errors()->get('title'),
                    'content' => $validator->errors()->get('content'),
                    'category_id' => $validator->errors()->get('category_id'),
                    'published' =>$validator->errors()->get('published')]
            ], 422);
        }

        $post->title = $request->input('title');

        $post->slug = $this->slugify($post->title, Post::class);

        $post->content = $request->input('content');

        if($request->has('published')){
            $post->published = $request->input('published');
        }

        $post->category_id = $request->input('category_id');

        if($request->hasFile('image')) {

            // remove image
            $this->removeImage($post);

            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $post->image = $filename;
        }

        $post->save();


        // remove tags
        foreach ($post->tags as $tag) {
            $post->tags()->detach($tag->id);
        }

        // store tags
        if($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        }
        $post = Post::with('tags')->find($post->id);

        return response()->json(['data' => $post, 'message' => 'Updated successfully'], 200);
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

        $post = Post::findOrFail($id);

        // remove image
        $this->removeImage($post);

        $post->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }

    private function removeImage($post)
    {
        if($post->image != "" && \File::exists('uploads/' . $post->image)) {
            @unlink(public_path('uploads/' . $post->image));
        }
    }
}