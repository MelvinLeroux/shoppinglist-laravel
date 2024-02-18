<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
class CategoryController extends Controller
{
    public function list()
    /**
     * This methods displays all the Categories in the database
     */
    {
    return response()->json(Category::all());
    }

    public function read (int $id)
    /**
     * This method display a categroy asked with an id
     */
    {
        return response()->json(Category::find($id));
    }

}
