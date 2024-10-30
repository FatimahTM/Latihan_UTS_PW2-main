<?php

use App\Http\Controllers\BukuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('bukus')->group(function () {
    Route::get('/', [BukuController::class, 'index']);          // GET all books
    Route::post('/', [BukuController::class, 'store']);         // POST a new book
    Route::get('/{buku}', [BukuController::class, 'show']);     // GET a specific book
    Route::put('/{buku}', [BukuController::class, 'update']);   // PUT (update) a book
    Route::delete('/{buku}', [BukuController::class, 'destroy']);// DELETE a book
});
