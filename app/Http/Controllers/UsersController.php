<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $users = User::paginate(10);

        return response()->json(['data' => $users], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // admin can create user including admin
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $validator = Validator::make($request->all(), [
            // 'name' => 'required|unique:users',
            'name' => 'required|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => ['name' => $validator->errors()->get('name'),
                             'email' => $validator->errors()->get('email'),
                             'password' => $validator->errors()->get('password')]
            ], 422);
        }

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        // make the user admin
        if($request->has('is_admin') && $request->is_admin == 1) {
            $user->is_admin = 1;
        }

        $user->save();
        // again query to get all properties
        $user = $user->find($user->id);

        return response()->json(['data' => $user, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $user = User::findOrFail($id);

        return response()->json(['data' => $user], 200);
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

        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            // 'name' => 'required|unique:users,name,'.$user->id,
            'name' => 'required|max:100',
            // if requested email and user email same, no validation applied
            'email' => ($request->email != $user->email ? 'required|email|unique:users,email,':''),
            // if the password field is blank, no validation applied
            'password' => ($request->password!=''?'min:6':''),
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        // if there is password & not blank then update password
        if($request->has('password') && !empty($request->password)) {
            $user->password = bcrypt($request->password);
        }
        // if validation fails
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => ['name' => $validator->errors()->get('name'),
                             'email' => $validator->errors()->get('email'),
                             'password' => $validator->errors()->get('password')]
            ], 422);
        }

        // will the user be admin or not
        if($request->has('is_admin') && $request->is_admin == 1) {
            $user->is_admin = 1;
        } else {
            $user->is_admin = 0;
        }

        $user->save();

        return response()->json(['data' => $user, 'message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // only admin can delete user
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        User::findOrFail($id)->tokens()->delete();
        User::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }


    /**
     * view user profile
     */
    public function profile()
    {
        return response()->json(['data' => auth()->user()], 200);
    }

    // update profile
    public function updateProfile(Request $request)
    {
        if(!auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            // 'name' => 'required|unique:users,name,'.$user->id,
            'name' => 'required|max:100',
            // if requested email and user email same, no validation applied
            'email' => ($request->email != $user->email ? 'required|email|unique:users,email,':''),
            // if the password field is blank, no validation applied
            'password' => ($request->password!=''?'min:6':''),
        ]);

        // if validation fails
        if($validator->fails()){
            return response([
                'message' => 'Validation error!',
                'errors' => ['name' => $validator->errors()->get('name'),
                             'email' => $validator->errors()->get('email'),
                             'password' => $validator->errors()->get('password')]
            ], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if($request->has('password') && !empty($request->password)) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response()->json(['data' => $user, 'message' => 'Profile updated successfully'], 200);
    }

    // Logout and delete the tokens
    public function logout(Request $request){

        $request->user()->tokens()->delete();
        // auth()->user()->tokens()->delete();
        return response()->json([
                'status' => 200,
                'message' => 'Logout successfull',
            ]);
    }
}