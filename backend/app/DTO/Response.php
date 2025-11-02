<?php

namespace App\DTO;

class Response
{
    public $status;
    public $message;
    public $data;

    public function __construct($status, $message, $data = null)
    {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
    }

    public static function success($message, $data = null)
    {
        $data = [
            "status" => true,
            "message" => $message,
            "data" => $data
        ];
        return self::to_json($data);
    }

    public static function error($message, $data = null)
    {
        $data = [
            "status" => false,
            "message" => $message,
            "data" => $data
        ];
        return self::to_json($data);
    }

    public static function to_json($data)
    {
        return response()->json(
            $data
        );
    }
}