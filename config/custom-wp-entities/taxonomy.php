<?php

use MonsieurM\Core\Models\Project;
use MonsieurM\Constants\Taxonomy;

$taxonomies = array(
    array(
        'name' => 'Catégorie',
        'description' => 'Catégorie du projet',
        'slug' => Taxonomy::projectType,
        'icon' => 'dashicons-category'
    ),
);
/**
 * Register each post types with their admin page
 */
add_action( 'init', function () {
    global $taxonomies;

    foreach($taxonomies as $tax) {
        
        $labels = array(
            'name'                       => _x( $tax['name'], 'taxonomy general name', 'textdomain' ),
            'singular_name'              => _x( $tax['name'], 'taxonomy singular name', 'textdomain' ),
            'parent_item'                => null,
            'parent_item_colon'          => null,
            'edit_item'                  => __( 'Modifier', 'textdomain' ),
            'update_item'                => __( 'Mettre à jour', 'textdomain' ),
            'add_new_item'               => __( 'Ajouter', 'textdomain' ),
            'new_item_name'              => __( 'Nouveau nom', 'textdomain' ),
            // 'separate_items_with_commas' => __( 'Séparer les nom par des virgules', 'textdomain' ),
            'add_or_remove_items'        => __( 'Ajouter ou supprimer', 'textdomain' ),
        );

        $args = array(
            'hierarchical'          => true,
            'description'           => $tax['description'],
            'labels'                => $labels,
            'show_ui'               => true,
            'public'                => true,
            'show_admin_column'     => true,
            'show_in_menu'          => true,
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'show_tagcloud'         => false,
            'show_in_rest'          => true,
            'query_var'             => true,
            'rewrite'               => array( 'slug' => $tax['slug'] ),
            'capability_type'       => array($tax['slug']),
            'capabilities'          => array('manage_terms','edit_terms','delete_terms','assign_terms'),
            'map_meta_cap'        => true
        );
        register_taxonomy( $tax['slug'], Project::slug, $args );
    }
});
