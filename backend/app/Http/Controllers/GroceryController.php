<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grocery;

class GroceryController extends Controller

{
    public function list()
    /**
     * This methods displays all the groceries in the database
     */
    {
    return response()->json(Grocery::all());
    }

    public function read (int $id)
    /**
     * This method display a grocery asked with an id
     */
    {
        return response()->json(Grocery::find($id));
    }
}
