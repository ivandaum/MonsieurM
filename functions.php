<?php

require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/config/config.php');

add_filter('acf/settings/save_json', function( $path ) {
    $path = get_stylesheet_directory() . '/acf-json';
    return $path;
});

add_filter('acf/settings/load_json', function( $paths ) {
    unset($paths[0]);
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});

add_theme_support( 'post-thumbnails' );

register_nav_menus([
    'header' => 'Header',
    'footer' => 'Footer',
]);

// add_image_size( 'phone-s', 150, 0 );
// add_image_size( 'phone', 360, 0 );
// add_image_size( 'tablet', 768, 0 );
// add_image_size( 'desktop', 1024, 0 );
add_image_size( '1x1', 1, 1 );
add_image_size( 'widescreen', 1600, 0 );
add_image_size( 'max', 2048, 0 );
add_action('init', function() {
    remove_image_size('1536x1536');
    remove_image_size('2048x2048');
});

add_filter('jpeg_quality', function($arg) {
    return 100;
});


add_filter('upload_mimes', function($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
});

function debug($var) {
    echo "<pre>";
    print_r($var);
    echo "</pre>";
    exit();
}

function dump($var) {
    var_dump($var);
    exit();
}

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
add_action( 'wp_enqueue_scripts', function() {
    wp_dequeue_style( 'wp-block-library' );
});
add_action('get_header', function() {
    remove_action('wp_head', '_admin_bar_bump_cb');
});
add_action( 'wp_print_styles',     function() {
    wp_deregister_style( 'amethyst-dashicons-style' ); 
    wp_deregister_style( 'dashicons' ); 
}, 100 );

add_action( 'admin_menu', function() {
    remove_menu_page( 'index.php' );                 //Dashboard
    remove_menu_page( 'edit.php' );                   //Posts
    // remove_menu_page( 'upload.php' );                 //Media
    // remove_menu_page( 'edit.php?post_type=page' );   //Pages
    remove_menu_page( 'edit-comments.php' );         //Comments
    // remove_menu_page( 'themes.php' );                 //Appearance
    // remove_menu_page( 'plugins.php' );               //Plugins
    remove_menu_page( 'users.php' );                 //Users
    // remove_menu_page( 'tools.php' );                 //Tools
    // remove_menu_page( 'options-general.php' );       //Settings
} );


if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
        'page_title'    => __('Footer'),
        'menu_title'    => __('Footer'),
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
}