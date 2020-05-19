<?php

namespace MonsieurM\Core\Utils;

class Image {
    public static $mimeType;
    public static $title;

    public static function create($image, $relations = array(), $baseWidth = false) {
        if (is_int($image)) {
            $image = self::createFromId($image);

            if (!$image) {
                return "";
            }
        }

        if (!$image) {
            return false;
        }

        self::$mimeType = $image['mime_type'];
        self::$title = $image['title'];

        $sources = array();
        if (empty($relations)) {
            $relations = array(
                '1599' => 'large',
                '1279' => 'widescreen',
                '999' => 'desktop',
                '769' => 'desktop',
                '360' => 'phone',
                '1' => '1x1',
            );
        }

        foreach ($relations as $breakpoint => $imageName) {
            $sources[$breakpoint] = array(
                'src' => $image['sizes'][$imageName],
                'width' => $image['sizes'][$imageName . '-width'],
                'height' => $image['sizes'][$imageName . '-height'],
            );
        }

        return self::generateSrcset($sources, $baseWidth);
    }

    public static function getRatio($image) {
        return $image['height'] / $image['width'];
    }

    public static function createThumbnail($image, $baseWidth = false, $relations = array( '769' => 'phone-s', '360' => 'phone-xs', '1' => '1x1')) {
        return self::create($image, $relations, $baseWidth);
    }

    public static function createFromId($id = null) {

        if ($id === null || !is_int($id)) {
            return false;
        }

        $metadata = wp_get_attachment_metadata($id);

        $image = array(
            'sizes' => array(),
            'url' => wp_get_attachment_url($id),
            'mime_type' => 'jpg',
            'title' => '',
            'height' => '',
            'width' => ''
        );

        if (isset($metadata['image_meta'])) {
            $image['mime_type'] = $metadata['image_meta']['title'];
            $image['title'] =  $metadata['image_meta']['title'];
        }

        if (isset($metadata['height'])) {
            $image['height'] = $metadata['height'];
        }

        if (isset($metadata['width'])) {
            $image['width'] = $metadata['width'];
        }

        $sizes = get_intermediate_image_sizes();
        for ($i = 0; $i < count($sizes); $i += 1) {
            $size = $sizes[$i];
            $src = wp_get_attachment_image_src( $id, $size );
            $image['sizes'][$size] = $src[0];
            $image['sizes'][$size . '-width'] = $src[1];
            $image['sizes'][$size . '-height'] = $src[2];
        }

        return $image;
    }

    public static function getColor($image) {
        if (is_int($image)) {
            $image = self::createFromId($image);

            if (!$image) {
                return "";
            }
        }

        return $image['sizes']['1x1'];
    }

    public static function generateSrcset($sources = array(), $baseWidth) {

        $last = array_values(array_slice($sources, 1))[0];

        $html = '';
        $style = '';
        if ($baseWidth) {
            $style = 'width: calc(' . $baseWidth . ' * ' . ($last['width'] / $last['height']) . ');';
        } else {
            $style = 'padding-top:'. ($last['height'] / $last['width'] * 100) . '%;';
        }

        $html .= '<picture data-ratio="' . $last['width'] / $last['height'] . '" style="' . $style .'; background-image: url(' . $sources['1']['src'] . ')">';
        
        foreach($sources as $size => $image) {
            if ($size == '1') continue;
            $html .= '<source type="' . self::$mimeType . '"';
            $html .= ' media="(min-width: ' . $size . 'px)"';
            $html .= ' data-srcset="' . $image['src'] . '"';
            $html .= '></source>';
        }

        if (isset($last)) {
            $html .= '<img src="'. $sources['1']['src'] .'" data-src="' . $last['src'] . '" alt="' . self::$title . '" />';
        }
        $html .= '</picture>';
        return $html;
    }
}
