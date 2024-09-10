<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasUuids;
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:d-m-Y | H:i:s',
    ];
    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'status',
        'description',
    ];

    public function newUniqueId()
    {
        return (string) Uuid::uuid4();
    }
    public function user(): BelongsTo
    {
        // akses databel utama (users -> id from userId)
        return $this->belongsTo(User::class);
    }
}
