<?php

namespace MonsieurM\Core\Utils;

class Video {

    public static function create($source) {

        $ratio = $source['height'] / $source['width'];
        $mimeType = $source['mime_type'];
        $url = $source['url'];

        $html = '';
        $html .= '<video playsinline="true" muted="true" loop="true" class="js-video" data-ratio="' . $ratio . '">';
        $html .= '<source src="' . $url . '" type="' . $mimeType. '">';
        $html .= 'Your browser does not support the video tag.</video> ';

        return $html;
    }
}
