<?php
namespace MonsieurM\Core\Utils;

class Seo {
    public static function title() {
        $title = get_the_title();
        $sitename = self::siteName();
        
        if (is_front_page()) {
            return $sitename;
        }

        return $title . ' - ' . $sitename;

    }

    public static function image() {
        global $post;
        return the_post_thumbnail_url($post->ID);
    }

    public static function siteName() {
        return get_bloginfo('name');
    }

    public static function siteDescription() {
        return get_bloginfo('description');
    }
}