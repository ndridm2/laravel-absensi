<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Auth;


class AttendanceController extends Controller
{
    static function isTodayAttendanceSubmitted(): bool
    {
        return Attendance::where('user_id', auth()->id())
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }
    public function index(): Response
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
            "mode" => 'required',
            "description" => "required_if:status,sick,leave,permit,business_trip,remote|max:500",
            "latitude" => "required",
            "longitude" => "required",
        ]);

        Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'mode' => $request->mode,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => "Indonesia",
        ]);

        return redirect::route('dashboard');
    }

    public function faceRecognition(Request $request)
    {
        $pythonPath = '/Users/admin/Developments/laravel-project/absensi-python/.venv/bin/python3.13';
        $scriptPath = 'facialRecognition.py';

        $process = new Process([
            $pythonPath,
            $scriptPath,
        ]);
        $process->setWorkingDirectory('/Users/admin/Developments/laravel-project/absensi-python');
        $process->run();

        // Cek apakah proses berhasil
        if (!$process->isSuccessful()) {
            // Jika proses gagal, kembalikan pesan error
            return response()->json([
                'error' => 'Proses gagal',
                'message' => $process->getErrorOutput()
            ]);
        }
    }
}