<?php

namespace MonsieurM\Core\Utils;

class Video {

    public static function create($source, $muted = true, $loop = true, $fitHeight = false) {

        if(!$source) return "";

        $ratio = $source['height'] / $source['width'];
        $mimeType = $source['mime_type'];
        $url = $source['url'];

        $params = 'preload="none"';

        if($muted) {
            $params .= ' muted playsinline';
        }

        if ($loop) {
            $params .= ' loop';
        }

        $className = '';
        if($fitHeight) {
            $className .= 'fit-height';
        }
        $html = '';
        $html .= '<video ' . $params . ' class="js-video ' . $className . '" data-ratio="' . $ratio . '">';
        $html .= '<source src="' . $url . '" type="' . $mimeType. '">';
        $html .= 'Your browser does not support the video tag.</video> ';

        return $html;
    }
}
