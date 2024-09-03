<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{
    /**
     * Display a listing of the reviews.
     */
    public function index()
    {
        try {
            // Retrieve all reviews with related user and book
            $reviews = Review::with(['users', 'buku'])->get();
            return response()->json($reviews);
        } catch (\Exception $exception) {
            Log::error('Error fetching reviews: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate incoming request
            $validated = $request->validate([
                'username' => 'required|exists:users,username',
                'judul_buku' => 'required|exists:buku,judul',
                'review_text' => 'nullable|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            // Get user ID and book ID from the validated data
            $userId = User::where('username', $validated['username'])->firstOrFail()->id_users;
            $bookId = Buku::where('judul', $validated['judul_buku'])->firstOrFail()->id_buku;

            // Create new review
            $review = Review::create([
                'id_users' => $userId,
                'id_buku' => $bookId,
                'review_text' => $validated['review_text'],
                'rating' => $validated['rating'],
            ]);

            return response()->json(['status' => 201, 'message' => 'Review created successfully!', 'data' => $review], 201);
        } catch (ValidationException $exception) {
            Log::warning('Validation failed while storing review: ' . $exception->getMessage());
            return response()->json(['status' => 422, 'message' => 'Validation failed!', 'errors' => $exception->errors()], 422);
        } catch (\Exception $exception) {
            Log::error('Error storing review: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Display the specified review.
     */
    public function show($id)
    {
        try {
            // Retrieve review by ID
            $review = Review::with(['users', 'buku'])->findOrFail($id);
            return response()->json($review);
        } catch (\Exception $exception) {
            Log::error('Error fetching review with ID ' . $id . ': ' . $exception->getMessage());
            return response()->json(['status' => 404, 'message' => 'Review not found!'], 404);
        }
    }

    /**
     * Update the specified review in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            // Validate incoming request
            $validated = $request->validate([
                'review_text' => 'nullable|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            // Find the review and update it
            $review = Review::findOrFail($id);
            $review->update($validated);

            return response()->json(['status' => 200, 'message' => 'Review updated successfully!', 'data' => $review]);
        } catch (ValidationException $exception) {
            Log::warning('Validation failed while updating review: ' . $exception->getMessage());
            return response()->json(['status' => 422, 'message' => 'Validation failed!', 'errors' => $exception->errors()], 422);
        } catch (\Exception $exception) {
            Log::error('Error updating review with ID ' . $id . ': ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Remove the specified review from storage.
     */
    public function destroy($id)
    {
        try {
            // Find the review and delete it
            $review = Review::findOrFail($id);
            $review->delete();

            return response()->json(['status' => 204, 'message' => 'Review deleted successfully!']);
        } catch (\Exception $exception) {
            Log::error('Error deleting review with ID ' . $id . ': ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }
}
