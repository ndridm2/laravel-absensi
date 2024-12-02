<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Events\ReadRfidEvent;
use App\Events\AttendEvent;
use App\Models\Attendance;

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
                'code' => 'SUCCESS',
                'UID' => $request->uid
            ]);
        }
    }

    public function attend(Request $request)
    {
        $request->validate([
            "uid" => "required",
        ]);

        if ($user = User::where('uid', $request->uid)->first()) {
            Attendance::create([
                'user_id' => $user->id,
                'status' => "attend",
                'description' => "",
                'mode' => "rfid",
                'latitude' => "",
                'longitude' => "",
                'address' => "",
            ]);

            // tampilkan user yg absen
            event(new AttendEvent($user->name));

            return response()->json([
                'message' => 'RFID submited succesfully',
                'code' => 'SUCCESS',
                'uid' => $request->uid
            ]);
        } else {
            return response()->json([
                'message' => 'RFID not found',
                'code' => 'NOT_FOUND',
                'uid' => $request->uid
            ], 404);
        }
    }
}