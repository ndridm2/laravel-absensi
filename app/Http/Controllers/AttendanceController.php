<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;


class AttendanceController extends Controller
{
    static function isTodayAttendanceSubmitted(): bool
    {
        return Attendance::where('user_id', auth()->id())
        ->whereDate('created_at', now()->toDateString())
        ->exists();
    }
    public function index():Response
    {
        $attendances = Attendance::with('user')->paginate(10);

        return Inertia::render('Attendance/index', [
            'attendances' => $attendances,
        ]);
    }
    public function submit(Request $request)
    {
        $request->validate([
            "status" => "required",
            "description" => "required_if:status,sick,leave,permit,business_trip,remote|max:500",
            "latitude" => "required",
            "longitude" => "required",
        ]);

        Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => "Jakarta raya",
        ]);

        return redirect::route('dashboard');
    }
}
