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
    public function delete(int $id)
    {
        /**
        * This method deletes a category
        */
        // Get the category
        $categoryToDelete = Category::find($id);

        // if category does not exist
        if (!$$categoryToDelete) {
            return response()->json([
                "error" => "task not found"
            ], 404);
        }
        // if exist delete + 204
        $categoryToDelete->delete();
        // return the response
        return response(null, 204);
    }

    public function update(int $id, Request $request)
    {
        /**
         * This method update a Category
        */
        $categorytoUpdate = Category::find($id);
        // validator to check the field
        $validator = Validator::make($request->all(), [
            "name" => 'min:1|max:100',
            "category" => 'max:100'
        ]);
        // if category does not exist
        if ($validator->fails()) {
            return response()->json([
                // errors est une méthode du validator qui retourne les erreurs au format champ => [errors]
                "error" => $validator->errors()
            ], 422);
        }
        // if exist update
        $categorytoUpdate->fill($request->all());
        $categorytoUpdate->save();

        return response()->json([
            "data" => $categorytoUpdate
        ], 200);
    }
}
