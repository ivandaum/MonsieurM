<?php

namespace MonsieurM\Core\Utils;

class Video {

    public static function create($source) {

        if(!$source) return "";

        $ratio = $source['height'] / $source['width'];
        $mimeType = $source['mime_type'];
        $url = $source['url'];

        $html = '';
        $html .= '<video preload="metadata" loop muted playsinline class="js-video" data-ratio="' . $ratio . '">';
        $html .= '<source src="' . $url . '#t=0.1" type="' . $mimeType. '">';
        $html .= 'Your browser does not support the video tag.</video> ';

        return $html;
    }
}
