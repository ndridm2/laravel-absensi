<?php

namespace App\Http\Controllers;

use App\Events\ReadRfidEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Symfony\Component\Process\Process;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);

        return Inertia::render('User/index', [
            'users' => $users,
        ]);
    }
    public function create()
    {
        return Inertia::render('User/create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'uid' => 'nullable|unique:users,uid',
        ]);
        User::create($request->all());
        return redirect()->route('users');
    }
    public function edit(User $user)
    {
        return Inertia::render('User/edit', ['user' => $user]);
    }
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'uid' => 'nullable|unique:users,uid,' . $user->id,
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password'
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'uid' => $request->uid,
            'role' => $request->role,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);
        return redirect()->route('users');
    }

    public function readRfid(Request $request)
    {
        if (User::where('uid', $request->uid)->exists()) {
            event(new ReadRfidEvent($request->uid, 'EXISTS', 'RFID alredy exists'));

            return response()->json([
                'message' => 'RFID alredy exists',
                'uid' => $request->uid
            ], 400);
        } else {
            event(new ReadRfidEvent($request->uid, 'SUCCESS', 'RFID read successfully'));

            return response()->json([
                'message' => 'RFID read successfully',
                'uid' => $request->uid
            ]);
        }
    }

    public function takePhoto(Request $request, $userId)
    {
        $pythonPath = '/Users/admin/Developments/laravel-project/absensi-python/.venv/bin/python3.13';
        $scriptPath = 'saveDataset.py';

        $process = new Process([
            $pythonPath,
            $scriptPath,
            $userId,
        ]);
        $process->setWorkingDirectory('/Users/admin/Developments/laravel-project/absensi-python/');
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

    public function facialRecognition(Request $request)
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