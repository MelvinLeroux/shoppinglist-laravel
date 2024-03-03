<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grocery extends Model
{
    protected $fillable = [
        'name',  // Ajoutez les noms d'attributs que vous souhaitez permettre ici
    ];
    use HasFactory;
    public function Category(): BelongsTo
    {
        return  $this->belongsTo(Category::class);
    }
}
