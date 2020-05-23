<?php

namespace MonsieurM\Core\Utils;

class Image {
    public static $mimeType;
    public static $title;

    public static function createHD($image, $relations = array(
        '1999' => 'full',
        '1599' => 'max',
        '359' => 'widescreen',
        '1' => '1x1',
    )) {
        return self::create($image, $relations);
    }

    public static function createThumbnail($image, $relations = array('359' => 'tablet', '160' => 'phone', '1' => '1x1')) {
        return self::create($image, $relations);
    }

    public static function create($image, $relations = array()) {
        if (!$image) {
            return false;
        }

        self::$mimeType = $image['mime_type'];
        self::$title = $image['title'];

        $sources = array();
        if (empty($relations)) {
            $relations = array(
                '1999' => 'full',
                '1599' => 'max',
                '1279' => 'widescreen',
                '999' => 'desktop',
                '769' => 'tablet',
                '360' => 'tablet',
                '319' => 'phone',
                '160' => 'phone',
                '1' => '1x1',
            );
        }

        foreach ($relations as $breakpoint => $imageName) {
            if($imageName === 'full') {
                $sources[$breakpoint] = array(
                    'src' => $image['url'],
                    'width' => $image['width'],
                    'height' => $image['height'],
                );
            } else {
                $sources[$breakpoint] = array(
                    'src' => $image['sizes'][$imageName],
                    'width' => $image['sizes'][$imageName . '-width'],
                    'height' => $image['sizes'][$imageName . '-height'],
                );
            }
        }

        return self::generateSrcset($sources);
    }

    public static function generateSrcset($sources = array()) {
        $ref = array_slice($sources, 0, 1)[0];
        $last = array_slice($sources, -1, 2)[0];

        $html = '<picture style="padding-top:'. ($ref['height'] / $ref['width'] * 100) . '%;">';
        
        foreach($sources as $size => $image) {
            $html .= '<source type="image/webp" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '.webp"></source>';
            $html .= '<source type="' . self::$mimeType . '" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '"></source>';
        }

        $html .= '<img src="'. $sources['1']['src'] .'" data-src="' . $last['src'] . '" alt="' . self::$title . '" />';
        $html .= '</picture>';
        return $html;
    }
}
