<?php
namespace MonsieurM\Core\Utils;

class Template {
    public static function load(string $path, $variables = array()) {
        if(file_exists($path) || locate_template($path)) {
            ob_start();
            extract($variables, EXTR_OVERWRITE);
            require $path;
            echo ob_get_clean();
        } else {
            echo "<!-- can't locate " . $path . " -->";
        }
    }

    public static function partial(string $slug, $variables = array()) {
        self::load(TEMPLATE_PATH . 'partials/'. $slug . '.php', $variables);
    }

    public static function layout(string $slug, $variables = array()) {
        self::load(TEMPLATE_PATH . 'layouts/'. $slug . '.php', $variables);
    }

    public static function component(string $slug, $variables = array()) {
        self::load(TEMPLATE_PATH . 'components/'. $slug . '.php', $variables);
    }

    public static function file(string $slug, $variables = array()) {
        self::load(THEME_PATH . $slug . '.php', $variables);
    }

    public static function exists(string $slug, $variables = array()) {
        return file_exists(THEME_PATH . $slug . '.php');
    }
}