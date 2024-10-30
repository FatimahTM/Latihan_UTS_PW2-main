<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'judul',
        'author',
        'penerbit',
        'tahun_terbit',
        'jumlah_halaman',
        'genre',
        'sinopsis'
    ];
}
