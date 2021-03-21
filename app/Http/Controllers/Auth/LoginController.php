<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum")->only('checkAuth');
    }

    public function login(Request $request){
        try{
            // $request->validate([
            //     'email' => 'email|required',
            //     'password' => 'required',
            // ]);
            
            $validator = Validator::make($request->all(), [
                'email' => 'email|required',
                'password' => 'required',
            ]);

            // $credentials = request(['email', 'password']);

            // // if email is not found in DB
            // if (!Auth::attempt($credentials)){
            //     return response()->json([
            //         'status_code' => 422,
            //         'message' => 'Email address is not found!',
            //     ]);
            // };

            // get user model by email or thow exception
            $user =  User::where('email', $request->email)->firstOrFail();
            // check password
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status_code' => 422,
                    'message' => 'Password is not correct',                 
                ], 422);
            }

            ////// if user and password match ////////
            // delete if user has prev token
            if($user->tokens()){
                $user->tokens()->delete();
            }
            // create token using sanctum and response
            $api_token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'status_code' => 200,
                'api_token' => $api_token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }
        // ===========================================================================

        // if there is validation error
        catch(Validationexception $error){
            return response()->json([
                'status_code' => 422,
                'message' => 'Enter email and password correctly',
                // 'error' => $error->validator,
                'error' =>  $validator->errors()->all()
            ], 422);
        }
        // if model is not found by email address
        catch(ModelNotFoundException $error){
            return response()->json([
                'status_code' => 422,
                'message' => 'Email address is not found',
                'error' => $error,
            ], 422);
        }
        // if there is some other error
        catch(Exception $error){
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in login',
                'error' => $error,
            ]);
        }
    }

    // needs authentication
    public function checkAuth(){

        if(auth()->user()->is_admin) {
            return response()->json(['auth' => true, 'message' => 'User is Admin'], 200);
        }
        else{
            return response()->json(['auth' => false, 'message' => 'Unauthorized!'], 500);
        }
    }

}