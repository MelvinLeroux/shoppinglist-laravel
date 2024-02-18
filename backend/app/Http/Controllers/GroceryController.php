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
    return response()->json(Grocery::all());
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
        * This method create a Grocery
        */
        // On utilise le validator pour venir vérifier la conformité des champs dans la requête
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);
        // si un champ ou plusieurs champs "foirent" on renvoi un json avec un code 422
        if ($validator->fails()) {
            return response()->json([
                // errors est une méthode du validator qui retourne les erreurs au format champ => [errors]
                "error" => $validator->errors()
            ], 422);
        }
        $Grocery = new Grocery();
        $Grocery->name = $request->name;
        $Grocery->save();
        return response()->json(["data"=>$Grocery],201);
    }
}
