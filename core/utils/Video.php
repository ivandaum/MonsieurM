<?php

namespace MonsieurM\Core\Utils;

class Video {

    public static function create($source, $muted = true, $loop = true) {

        if(!$source) return "";

        $ratio = $source['height'] / $source['width'];
        $mimeType = $source['mime_type'];
        $url = $source['url'];

        $params = 'preload="none" playsinline';

        if($muted) {
            $params .= ' muted';
        }

        if ($loop) {
            $params .= ' loop';
        }

        $html = '';
        $html .= '<video ' . $params . ' class="js-video" data-ratio="' . $ratio . '">';
        $html .= '<source src="' . $url . '" type="' . $mimeType. '">';
        $html .= 'Your browser does not support the video tag.</video> ';

        return $html;
    }
}
