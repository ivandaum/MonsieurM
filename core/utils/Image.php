<?php

namespace MonsieurM\Core\Utils;

class Image {
    public static $mimeType;
    public static $title;

    public static function createHD($image, $relations = array(
        '1600' => 'full',
        '1024' => 'max',
        '767' => 'widescreen',
        '359' => 'large',
        '160' => 'medium_large',
        '10' => 'medium',
        '1' => '1x1',
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
                '2048' => 'full', // original
                '1600' => 'max', // 2048px
                '1024' => 'widescreen', // 1600px
                '768' => 'large', // 1024px
                '359' => 'medium_large', // 768px
                '160' => 'medium', // 360x
                '2' => 'thumbnail', // 150px
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

        $index = 0;
        foreach($sources as $size => $image) {

            if ($size === 1) continue;

            $entries = array();
            $next = array_slice($sources, $index-1, 1);
            $next = $index > 0 && count($next) ? $next[0] : null;

            if (self::$mimeType !== 'image/gif') {
                if ($next) {
                    $base = "(min-width: {$size}px) and ";
                    $media = $base . '(-webkit-min-device-pixel-ratio: 1.5),';
                    $media .= $base . '(-moz-min-device-pixel-ratio: 1.5),';
                    $media .= $base . '(-o-device-pixel-ratio: 3/2),';
                    $media .= $base . '(device-pixel-ratio: 1.5)';

                    $entries[] = array('image/webp', $media, $next['src'].'.webp');
                }
                $entries[] = array('image/webp', "(min-width: {$size}px)", $image['src'].'.webp');
            }
        
            $entries[] = array(self::$mimeType, "(min-width: {$size}px)", $image['src']);
            $index++;

            foreach($entries as $entry) {
                $html .= "<source type='$entry[0]' media='$entry[1]' data-srcset='$entry[2]'></source>";
            }
        }

        $html .= '<img class="' . $className . '" src="' . $last['src'] . '" alt="' . self::$title . '" />';
        $html .= '</picture>';
        return $html;
    }
}
