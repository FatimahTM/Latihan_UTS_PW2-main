<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all books
        $books = Buku::all();
        return response()->json($books, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'judul' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|integer',
            'jumlah_halaman' => 'required|integer',
            'genre' => 'required|string|max:255',
            'sinopsis' => 'required|string'
        ]);

        // Create a new book
        $book = Buku::create($request->all());
        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Buku $buku)
    {
        // Show a specific book
        return response()->json($buku, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Buku $buku)
    {
        // Validate the request
        $request->validate([
            'judul' => 'sometimes|string|max:255',
            'author' => 'sometimes|string|max:255',
            'penerbit' => 'sometimes|string|max:255',
            'tahun_terbit' => 'sometimes|integer',
            'jumlah_halaman' => 'sometimes|integer',
            'genre' => 'sometimes|string|max:255',
            'sinopsis' => 'sometimes|string'
        ]);

        // Update the book with validated data
        $buku->update($request->all());
        return response()->json($buku, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buku $buku)
    {
        // Delete the specified book
        $buku->delete();
        return response()->json(['message' => 'Book deleted successfully'], 200);
    }
}
