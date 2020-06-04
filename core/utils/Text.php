<?php
namespace MonsieurM\Core\Utils;

use MonsieurM\Core\Utils\Translation;

class Text {
    public static function wrapWord(string $sentence, string $balise) {
        $string = '';
        $sentence = str_replace('<br />', ' [br] ', $sentence);
        $s = explode(' ', $sentence);
        foreach($s as $i => $w) {
            $string .= "<$balise>$w</$balise> ";
        }

        $string = str_replace('<span>[br]</span>', '<br />', $string);
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

    public static function addBeforeLastWord($w, $char) {
        $words = explode(' ', $w);
        $html = '';

        foreach($words as $k => $word) {
            if($k >= count($words) - 1) {
                $html .= '<br />' . $char . ' ';
            }

            $html .= $word . ' ';
        }

        return substr($html, 0, -1);
    }
}