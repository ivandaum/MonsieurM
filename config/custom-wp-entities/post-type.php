<?php

/**
 * Register each post types with their admin page
 */
add_action( 'init', function () {
    $posts = array(
        array(
            'name' => 'Projets',
            'description' => 'un projet',
            'icon' => 'dashicons-format-aside',
            'type' => \MonsieurM\Core\Models\Project::slug,
            'slug' => \MonsieurM\Core\Models\Project::slug,
        ),
    );

    foreach ($posts as $type) {
        $opt = array(
            'label'                 => __( $type['name'], 'text_domain' ),
            'description'           => __( $type['description'], 'text_domain' ),
            'labels'                => array(
                'name'                  => _x( $type['name'], 'Post Type General Name', 'text_domain' ),
                'singular_name'         => _x( $type['name'], 'Post Type Singular Name', 'text_domain' ),
                'menu_name'             => __( $type['name'], 'text_domain' ),
                'name_admin_bar'        => __( $type['name'], 'text_domain' ),
                'add_new_item'          => __( 'Ajouter ' . $type['description'], 'text_domain' ),
                'new_item'              => __( 'Nouveau', 'text_domain' ),
                'edit_item'             => __( 'Modifier', 'text_domain' ),
                'update_item'           => __( 'Mettre à jour '  . $type['description'], 'text_domain' ),
            ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => $type['icon'],
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => false,
            'capability_type'       => 'page',
            'supports' => array( 'thumbnail', 'title', 'revisions' ),
            'rewrite' => array('slug' => $type['slug'])
        );
        register_post_type( $type['type'] , $opt );
    }
});
