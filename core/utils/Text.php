<?php
namespace MonsieurM\Core\Utils;

use MonsieurM\Core\Utils\Translation;

class Text {
    public static function isolateWord(string $sentence, int $number = 1) {
        $s = explode(' ', $sentence);
        $b = '';
        $a = '';

        foreach($s as $i => $w) {
            if($i < $number) {
                $b .= $w . ' ';
            } else {
                $a .= $w . ' ';
            }
        }
        return '<span>' . $b . '</span>' . $a;
    }

    public static function wrapWord(string $sentence, string $balise) {
        $s = explode(' ', $sentence);
        $string = '';
        foreach($s as $i => $w) {
            $string .= "<$balise>$w</$balise> ";
        }

        return $string;
    }

    public static function createSentence(string $sentence, $wordCount = array(10)) {
        $s = explode(' ', $sentence);
        $string = '';

        $wordCountIndex = 0;
        $index = 0;

        foreach($s as $i => $w) {
            $string .= $w . ' ';
            $index++;
        
            if ($index === $wordCount[$wordCountIndex]) {
                $string .= '</span><span>';
                $wordCountIndex++;
                $index = 0;

                if($wordCountIndex >= count($wordCount)) {
                    $wordCountIndex = 0;
                }
            }
        }

        return '<span>' . $string . '</span>';
    }

    public static function cleanWpEditor(string $html) {
        $html = preg_replace('/class=".*?"/', '', $html);
        return $html;
    }

    public static function getYear(string $date) {
        $date = explode('/', $date);
        return $date[count($date) - 1];
    }

    public static function getMonthAndYear(string $date) {
        $date = explode('/', $date);
        $month = (int) $date[count($date) - 2];
        $year = $date[count($date) - 1];
        return Translation::get('month', $month - 1) . ' ' .$year;
    }

    public static function paragraphsToColumns(string $text, int $pCount = 2) {
        $columns = array();
        preg_match_all('/<p>(.*?)<\/p>/', $text, $paragraphs);

        if (count($paragraphs[0])) {
            $index = 0;
            $count = 0;
            foreach($paragraphs[0] as $i => $p) {

                if(!isset($columns[$index])) {
                    $columns[$index] = '';
                }

                $columns[$index] .= $p;

                $count++;
                if ($count >= $pCount) {
                    $index++;
                    $count = 0;
                }
            }
        } else {
            $columns = self::textToColumns($text, $pCount);
        }

        return $columns;
    }

    public static function textToColumns(string $text, int $pCount = 2) {
        $columns = array();
        $words = explode(' ', $text);
        $colLength = ceil(count($words) / $pCount);

        for($i = 0; $i < $pCount; $i++) {
            $columns[] = '';
        }

        $index = 0;
        $counter = 0;

        foreach($words as $w) {
            $columns[$index] .= $w . ' ';

            $counter++;

            if ($counter >= $colLength) {
                $counter = 0;
                $index++;
            }
        }

        return $columns;
    }

    public static function breakLineAt(string $sentence, array $words) {
        for($i = 0; $i < count($words); $i++) {

            $sentence = preg_replace("/($words[$i])/i", "$1 <br/>", $sentence);
        }
        
        return $sentence;
    }

    public static function breakLineAtNumber(string $sentence) {
        $s = explode(' ', $sentence);
        $string = '';

        foreach($s as $word) {
            if ((int) $word !== 0) {
                $string .= '<br>';
            }
            $string .= $word . ' ';
        }

        return $string;
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