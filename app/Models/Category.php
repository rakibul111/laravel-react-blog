<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // getting the number of posts of a category
    protected $appends = ['num_posts'];
    public function getNumPostsAttribute()
    {
        return $this->posts()->count();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'category_id');
    }
}
