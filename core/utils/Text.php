<?php
namespace MonsieurM\Core\Utils;

use MonsieurM\Core\Utils\Translation;

class Text {
    public static function wrapWord(string $sentence, string $balise) {
        $s = explode(' ', $sentence);
        $string = '';
        foreach($s as $i => $w) {
            $string .= "<$balise>$w</$balise> ";
        }

        return $string;
    }

    public static function cleanWpEditor(string $html) {
        $html = preg_replace('/class=".*?"/', '', $html);
        return $html;
    }

    public static function slugify(string $string) {
        return strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', preg_replace('/\s+/', '-', $string)));
    }

    public static function toJson($arr) {
        if (is_array($arr) || is_object($arr)) {
            return json_encode($arr);
        }

        return "{}";
    }
}