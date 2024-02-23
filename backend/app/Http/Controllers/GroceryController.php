<?php

namespace App\Http\Controllers;

use App\Models\Grocery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroceryController extends Controller

{
    public function list()
    /**
     * This methods displays all the groceries in the database
     */
    {
    return response()->json(Grocery::with("category")->get());
    }

    public function read (int $id)
    /**
     * This method display a grocery asked with an id
     */
    {
        return response()->json(Grocery::find($id));
    }

    public function create(Request $request)
    {
        /**
        * This method creates a Grocery
        */
        // Validator to check if the request is ok
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
            'category_id' => 'integer',
        ]);
        // if one of the field is not okay return fail
        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()
            ], 422);
        }
        $grocery = new Grocery();
        $grocery->name = $request->name;
        $grocery->category_id = $request->category_id;
        $grocery->save();
        $grocery->load('category');
        return response()->json(["data"=>$grocery],201);
    }

    public function delete(int $id)
    {
        /**
        * This method deletes a grocery
        */
        // Get the grocery
        $groceryToDelete = Grocery::find($id);

        // if grocery does not exist
        if (!$groceryToDelete) {
            return response()->json([
                "error" => "task not found"
            ], 404);
        }
        // if exist delete + 204
        $groceryToDelete->delete();
        // return the response
        return response(null, 204);
    }

    public function update(int $id, Request $request)
    {
        /**
         * This method update a GRocery
        */
        $grocerytoUpdate = Grocery::find($id);
        // validator to check the field
        $validator = Validator::make($request->all(), [
            "name" => 'min:1|max:100',
            "category" => 'max:100'
        ]);
        // if grocery does not exist
        if ($validator->fails()) {
            return response()->json([
                // errors est une méthode du validator qui retourne les erreurs au format champ => [errors]
                "error" => $validator->errors()
            ], 422);
        }
        // if exist update
        $grocerytoUpdate->fill($request->all());
        $grocerytoUpdate->save();

        return response()->json([
            "data" => $grocerytoUpdate
        ], 200);
    }
}
