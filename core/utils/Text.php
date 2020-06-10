<?php
namespace MonsieurM\Core\Utils;

use MonsieurM\Core\Utils\Translation;

class Text {
    public static function wrapWord(string $sentence, string $balise) {
        $string = '';
        $sentence = str_replace('<br />', ' [br] ', $sentence);
        $sentence = str_replace('<p>', '', $sentence);
        $sentence = str_replace('</p>', '', $sentence);

        preg_match_all('/<strong>(.*?)<\/strong>/', $sentence, $matchs);

        foreach($matchs[0] as $k => $v) {
            $sentence = str_replace($v, "[$k]", $sentence);
        }

        $s = explode(' ', $sentence);

        foreach($s as $i => $w) {
            if (!preg_match('/(\[.*?\])/', $w, $match)) {
                $string .= "<$balise>$w</$balise> ";
            } else {
                $string .= "$w";
            }
        }

        foreach($matchs[0] as $k => $v) {
            $string = str_replace("[$k]", $v, $string);
        }

        $string = str_replace('[br]', '<br />', $string);

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