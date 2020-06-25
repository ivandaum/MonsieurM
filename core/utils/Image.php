<?php

namespace MonsieurM\Core\Utils;

class Image {
    public static $mimeType;
    public static $title;

    public static function createHD($image, $relations = array(
        '2047' => 'full', // original
        '1599' => 'max', // 2048px
        '1024' => 'widescreen', // 1600px
        '767' => 'large', // 1024px
        '359' => 'medium_large', // 768px
        '160' => 'medium', // 360x
        '10' => 'thumbnail', // 150px
        '1' => '1x1', // 1x1
    )) {
        return self::create($image, $relations);
    }

    public static function createThumbnail($image, $relations = array(
        '359' => 'medium_large',
        '160' => 'medium',
        '10' => 'thumbnail',
        '1' => '1x1'
    )) {
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
                '2047' => 'full', // original
                '1599' => 'max', // 2048px
                '1024' => 'widescreen', // 1600px
                '767' => 'large', // 1024px
                '359' => 'medium_large', // 768px
                '160' => 'medium', // 360x
                '10' => 'thumbnail', // 150px
                '1' => '1x1', // 1x1
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

            $sources[$breakpoint]['src'] = str_replace('-scaled', '', $sources[$breakpoint]['src']);
        }

        return self::generateSrcset($sources, $lazy);
    }

    public static function generateSrcset($sources = array(), $lazy) {
        $ref = array_slice($sources, 0, 1)[0];
        $last = array_slice($sources, -1, 1)[0];

        $html = '<picture style="padding-top:'. ($ref['height'] / $ref['width'] * 100) . '%;">';
        
        $className = '';
        if(!$lazy) {
            $className .= 'ignore-lazy';
        }

        foreach($sources as $size => $image) {
            if (self::$mimeType !== 'image/gif') {
                $html .= '<source type="image/webp" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '.webp"></source>';
            }
        
            $html .= '<source type="' . self::$mimeType . '" media="(min-width: ' . $size . 'px)" data-srcset="' . $image['src'] . '"></source>';
        }

        $html .= '<img class="' . $className . '" src="' . $last['src'] . '" alt="' . self::$title . '" />';
        //$html .= '<div class="background has-width-100 has-height-100 is-absolute" style="background-image: url('. $last['src'] .')"></div>';
        $html .= '</picture>';
        return $html;
    }
}
