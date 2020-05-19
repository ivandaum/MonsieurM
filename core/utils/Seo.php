<?php
namespace MonsieurM\Core\Utils;

class Seo {
    public static function title() {
        $title = get_the_title();
        $name = bloginfo();

        if (is_front_page()) {
            return $name;
        }

        return $name . ' - ' . $title;
    }

    public static function siteName() {
        return get_bloginfo('name');
    }

    public static function siteDescription() {
        return get_bloginfo('description');
    }
}