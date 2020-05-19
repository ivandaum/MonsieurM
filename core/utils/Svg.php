<?php
namespace MonsieurM\Core\Utils;

class Svg {
    public static function print(string $slug) {
        ob_start();
        require ASSETS_PATH . 'images/' . $slug . '.svg';
        return ob_get_clean();
    }
}