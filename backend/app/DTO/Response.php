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
        return self::to_json(true, $message, $data);
    }

    public static function error($message, $data = null)
    {
        return self::to_json(false, $message, $data);
    }

    public static function to_json($status, $message, $data)
    {
        return response()->json(
            [
                'status' => $status,
                'message' => $message,
                'data' => $data
            ]

        );
    }
}