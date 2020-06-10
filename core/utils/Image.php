<?php

namespace MonsieurM\Core\Utils;

class Image {
    public static $mimeType;
    public static $title;

    public static function createHD($image, $relations = array(
        '1999' => 'full',
        '1599' => 'max',
        '1279' => 'widescreen',
        '999' => 'widescreen',
        '769' => 'widescreen',
        '360' => 'widescreen',
        '319' => 'desktop',
        '160' => 'tablet',
        '10' => 'phone-s',
        '1' => '1x1',
    )) {
        return self::create($image, $relations);
    }

    public static function createThumbnail($image, $relations = array('359' => 'tablet', '160' => 'phone', '10' => 'phone-s', '1' => '1x1')) {
        return self::create($image, $relations);
    }

    public static function create($image, $relations = array(), $lazy = true) {
        if (!$image) {
            return false;
        }

        self::$mimeType = $image['mime_type'];
        self::$title = $image['title'];

        $sources = array();
        if (empty($relations)) {
            $relations = array(
                '2500' => 'full',
                '1599' => 'max',
                '1279' => 'widescreen',
                '999' => 'desktop',
                '769' => 'tablet',
                '360' => 'tablet',
                '319' => 'phone',
                '160' => 'phone',
                '10' => 'phone-s',
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

        return self::generateSrcset($sources, $lazy);
    }

    public static function generateSrcset($sources = array(), $lazy) {
        $ref = array_slice($sources, 0, 1)[0];
        $last = array_slice($sources, -1, 2)[0];

        $html = '<picture style="padding-top:'. ($ref['height'] / $ref['width'] * 100) . '%;">';
        
        $className = '';
        if(!$lazy) {
            $className .= 'ignore-lazy';
        }

        foreach($sources as $size => $image) {
            // $html .= '<source type="image/webp" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '.webp"></source>';
            $html .= '<source type="' . self::$mimeType . '" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '"></source>';
        }

        $html .= '<img class="' . $className . '" src="' . $last['src'] . '" alt="' . self::$title . '" />';
        $html .= '<div class="background has-width-100 has-height-100 is-absolute" style="background-image: url('. $sources['10']['src'] .')"></div>';
        $html .= '</picture>';
        return $html;
    }
}
