<?php
namespace MonsieurM\Core\Models;
use MonsieurM\Constants\Taxonomy as TaxonomyConstant;

class Taxonomy {
    public static function find(string $taxonomy = TaxonomyConstant::projectType) {
        return self::format(get_terms(array( 
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
            'order' => 'ASC',
            'orderby' => 'ID'
        )));
    }

    public static function findOne(string $slug, string $taxonomy = TaxonomyConstant::projectType) {
        return self::format(get_terms(array( 
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
            'slug' => $slug
        )))[0];
    }

    public static function findByPostId(int $postId, string $taxonomy = TaxonomyConstant::projectType) {
        return self::format(get_the_terms($postId, $taxonomy));
    }

    public static function format(array $categories) {
        $arr = array();
        foreach($categories as $category) {
            $temp = new \stdClass();
            $temp->id = (int) $category->term_id;
            $temp->url = str_replace('/category', '', get_category_link($category));
            $temp->name = $category->name;
            $temp->slug = $category->slug;

            $arr[] = $temp;
        }

        return $arr;
    }
}