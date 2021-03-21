<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;

class RegisterController extends Controller
{
    public function register(Request $request){

        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if($validator->fails()){
                return response([
                    'message' => 'Please input correctly.',
                    'errors' => ['name' => $validator->errors()->get('name'),
                                 'email' => $validator->errors()->get('email'),
                                 'password' => $validator->errors()->get('password')]
                ], 422);
            }

            $request['password'] = Hash::make($request['password']);
            // $request['remember_token'] = Str::random(10);

            // create user in the db
            $user = User::create($request->toArray());

            if($user){
                $user = User::findOrFail($user->id);
            }

            // Create token after registration
            $api_token = $user->createToken('authToken')->plainTextToken;
            
            return response()->json([
                'message' => 'Registration Successfull',
                'api_token' => $api_token,
                'token_type' => 'Bearer',
                'user' => $user,
            ],200);
            // ================================================================

        }catch(Exception $error){
            return response()->json([
                'message' => 'Error in Registration',
                'errors' => $error,
            ], 500);
        }
    }
}
