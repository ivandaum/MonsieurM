<?php
namespace MonsieurM\Core\Utils;

class Number {
    public static function isEven(int $number) {
        return $number % 2 === 0;
    }

    public static function tel(string $number = '') {
        $a = str_split($number);
        $n = '';

        foreach($a as $k => $v) {
            $n .= $v;
            if($k % 2 !== 0) {
                $n .= ' ';
            }
        }

        return $n;
    }
}