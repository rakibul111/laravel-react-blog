<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $appends = ["image_url", "date_formatted", "excerpt"];
    /**
    * return the image url to be displayed on react templates
    */
    public function getImageUrlAttribute()
    {
        return $this->image!=""?url("uploads/" . $this->image):"";
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments()
    {
        //Eager loading realated models with comment model (reduces query number)
        return $this->hasMany(Comment::class, 'post_id')->with('user', 'post');
    }
    /**
    * approved comments to be displayed on react website
    */
    public function approvedComments()
    {  
        return $this->hasMany(Comment::class, 'post_id')->with('user', 'post')->where('approved', 1);
    }
    public function tags()
    {
        // many to many relationship
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');
    }
    public function getDateFormattedAttribute()
    {
        // ...!!!...
        return \Carbon\Carbon::parse($this->created_at)->format('F d, Y');
    }
    public function getExcerptAttribute()
    {
        //strip_tags return a string with all NULL bytes, HTML and PHP tags stripped from a given string
        return substr(strip_tags($this->content), 0, 100);
    }
}
