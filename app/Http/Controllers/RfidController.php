<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Events\ReadRfidEvent;

class RfidController extends Controller
{
    // read
    public function read(Request $request)
    {
        if (User::where('uid', $request->uid)->exists()) {

            event(new ReadRfidEvent($request->uid, 'EXISTS', 'RFID already exits'));

            return response()->json([
                'message' => 'RFID alredy exists',
                'code' => 'EXISTS',
                'uid' => $request->uid
            ]);
        } else {

            event(new ReadRfidEvent($request->uid, 'SUCCESS', 'RFID already successfully'));

            return response()->json([
                'message' => 'RFID read successfully',
                'code'=> 'SUCCESS',
                'UID' => $request->uid
            ]);
        }
    }
}
