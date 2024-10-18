<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('attend-channel', function ($user) {
    if ($user->role == 'admin'){
        return true;
    }
});
