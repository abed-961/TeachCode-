<?php

namespace App\Util;

use ArrayObject;

class Trim
{


    public static function trimData($data)
    {
        $trim_arr = [];
        foreach ($data as $key => $value) {
            $trim_arr[$key] = is_string($value) ? trim($value) : $value;
        }
        return $trim_arr;
    }


}