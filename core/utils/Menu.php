<?php
namespace MonsieurM\Core\Utils;

use MonsieurM\Core\Utils\Url;

class Menu {
    public static function get(string $string) {
        $locations = get_nav_menu_locations();

        if (!isset($locations[$string])) {
            return array();
        }

        $id = $locations[$string];
        $menu = array();

        $objects = wp_get_nav_menu_items($id);

        if(!$objects) {
            return array();
        }
        foreach($objects as $object) {
            $item = new \stdClass();
            $item->title = $object->title;
            $item->url = $object->url;
            $item->id = $object->object_id;
            $item->isExternal = Url::isExternal($object->url);
            $item->uniqueId = $object->object_id . '-' . rand(0, time());
            $item->isActive = $object->url === Url::getCurrent();
            $menu[] = $item;
        }
        return $menu;
    }
}