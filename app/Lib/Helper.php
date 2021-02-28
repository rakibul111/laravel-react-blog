<?php

namespace App\Lib;
use App\Models;
use Illuminate\Database\Eloquent\Model;

trait Helper
{
    public function slugify($string, $Model)
    {
        $slug = str_replace(array(" ", '_', '-', ',','#', '$', '&', '@', '*', '^', '"', "'"), '-', $string);
    // ========== making the slug unique ================================
        $count = 0;
        $original_slug = $slug;

        while(true){
            $same_slug = $Model::where('slug', $slug)->first();
            if($same_slug){
                $slug = $original_slug.'-'.(++$count);
            }
            else{ 
                break;
            }
        } 
        return $slug;
        // ===================================================================
        // return $new_slug;
        // $same_slug = $Model::where('slug', $slug)->first();

        // if($same_slug){
        //     // return $slug.'-'.(uniqid('', true));
        //     return $slug.'-'.($same_slug->id + 1);
        // }
        // else return $slug;
    }
}
// we can add a number or id if two slugs are sameS