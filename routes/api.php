<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RfidController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

route::get('/rfid/reads', [RfidController::class, 'read'])->name('rfid.read');
route::get('/rfid/attend', [RfidController::class, 'attend'])->name('rfid.attend');
