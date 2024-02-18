<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroceryController;
use App\Http\Controllers\CategoryController;
use App\Models\Category;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// * GROCERY* //
Route::get('/groceries', [GroceryController::class, 'list']);
Route::get('/groceries/{id}', [GroceryController::class, 'read'])->where("id", "[0-9]+");
Route::post('/groceries', [GroceryController::class, 'create']);
Route::delete('/groceries/{id}', [GroceryController::class, 'delete'])->where("id", "[0-9]+");
Route::patch('/groceries/{id}', [GroceryController::class, 'update'])->where("id", "[0-9]+");
// * CATEGORIES* //
Route::get('/categories', [CategoryController::class, 'list']);
Route::get('/categories/{id}', [CategoryController::class, 'read'])->where("id", "[0-9]+");
Route::post('/categories', [CategoryController::class, 'create']);
Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->where("id", "[0-9]+");
Route::patch('/categories/{id}', [CategoryController::class, 'update'])->where("id", "[0-9]+");
