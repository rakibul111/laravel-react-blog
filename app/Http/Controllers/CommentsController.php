<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Lib\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
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
        if($request->input('post_id')) {
            $comments = Comment::with('user', 'post')
                ->where('approved', 1)
                ->where('post_id', $request->input('post_id'))
                ->paginate(10);
        } else {
            $comments = Comment::with('user', 'post')->orderBy('id', 'DESC')->paginate(10);
        }

        return response()->json(['data' => $comments], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // protected by sanctum middleware // user must be authenticated //
        // $this->validate($request, [
        //     'post_id' => 'required',
        //     'comment' => 'required'
        // ]);

        $validator = Validator::make($request->all(), [
            'post_id' => 'required',
            'comment' => 'required'
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => [ 'post_id' => $validator->errors()->get('post_id'),
                              'comment' => $validator->errors()->get('comment')]                          
            ], 422);
        }

        $comment = new Comment();

        $comment->user_id = auth()->user()->id;
        $comment->post_id = $request->post_id;
        $comment->comment = $request->comment;

        $comment->save();

        return response()->json(['data' => $comment, 'message' => 'Comment created successfully! we will review and publish it soon'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::with('user', 'post')->findOrFail($id);

        return response()->json(['data' => $comment], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // -------------------------------------------------------------------------
    public function update(Request $request, $id)
    {
        // protected by sanctum middleware // user must be authenticated //

        $comment = Comment::with('user', 'post')->findOrFail($id);

        // if request has comment and user owns the comment, then update the comment
        if($request->has('comment') && ($comment->user_id == auth()->user()->id)) {

            $validator = Validator::make($request->all(), [
                'comment' => 'required'
            ]);
            if($validator->fails()){
                return response([
                    'message' => 'Validation error!',
                    'errors' => [ 'comment' => $validator->errors()->get('comment')]
                ], 422);
            }    

            $comment->comment = $request->comment;
            $comment->save();
            return response()->json(['data' => $comment, 'message' => 'Updated successfully'], 200);
        }
        // ================================================================================

        // if request has 'approved' field then update the approved
        // only for admin
        elseif(isset($request->approved)) {

            if(!auth()->user()->is_admin) {
                return response()->json(['message' => 'Unauthorize'], 500);
            }

            $comment->approved = $request->approved;
            $comment->save();
            return response()->json(['data' => $comment, 'message' => 'Updated successfully'], 200);
        }

        //  if user is not owner of the comment
        elseif($request->has('comment') && ($comment->user_id != auth()->user()->id)) {
            return response()->json([
                'message' => 'Unauthorized!',
                'errors' => [ 'comment' => 'Only owner can edit comment!']
            ], 500);
        }

        // if there is no comment/approved update
        else{
            return response()->json(['message' => 'Unexpected query!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // protected by sanctum middleware // user must be authenticated //

        $comment = Comment::findOrFail($id);
        // if user is admin, he can delete any comments
        if(auth()->user()->is_admin) {
            $comment->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
        // if user owns the comment
        elseif(($comment->user_id == auth()->user()->id)) {
            $comment->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
        else{
            return response()->json(['message' => 'Error! in deletion'], 500);
        }
    }
}