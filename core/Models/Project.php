<?php
namespace MonsieurM\Core\Models;

use MonsieurM\Core\Models\Taxonomy;
use MonsieurM\Core\Utils\Translation;
use MonsieurM\Core\Utils\Text;
use MonsieurM\Constants\Page as PageConstants;

class Project {
    const slug = 'project';

    const acfFields = array(
        'video' => 'project__video',
        'galery' => 'project__galery',
        'color' => 'project__color',
        'color_secondary' => 'project__color-secondary',
        'color_intro' => 'project__color-intro',
        'color_details' => 'project__color-details',
        'cover' => 'project__cover',
        'catchline' => 'project__catchline',
        'agency' => 'project__agency',
        'project' => 'project__project',
        'role' => 'project__role',
        'content' => 'project__content',
    );

    public static function find(int $count = -1) {
        $query = new \WP_Query(array(
            'post_type' => self::slug,
            'posts_per_page' => $count,
            'status' => 'publish',
            'fields' => 'ids',
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        return self::format($query->posts);
    }

    public static function findNotPost(int $id, int $count = 3) {
        $query = new \WP_Query(array(
            'post_type' => self::slug,
            'post_not__in' => $id,
            'posts_per_page' => $count,
            'status' => 'publish',
            'fields' => 'ids',
            'orderby' => 'rand',
        ));

        return self::format($query->posts, false);
    }

    public static function getNextPost(int $id) {
        $projects = get_field('work__projects', PageConstants::workId);
        $ids = array();
        if ($projects && count($projects)) {
            $ids = array_map(function($a) {
                return $a['id'];
            }, $projects);
        } else {
            $query = new \WP_Query(array(
                'post_type' => self::slug,
                'posts_per_page' => -1,
                'status' => 'publish',
                'fields' => 'ids',
            ));

            $ids = $query->posts;
        }

        $next = null;
        foreach($ids as $k => $pId) {
            if ($pId === $id && isset($ids[$k + 1])) {
                return $ids[$k + 1];
            } else if ($pId === $id) {
                return  $ids[0];
            }
        }

        return null;
    }

    public static function findOne(int $id) {
        return self::format(array($id))[0];
    }

    public static function format(array $ids, $withRelated = true) {
        if (!count($ids)) {
            return array();
        }

        $arr = array();
        foreach($ids as $id) {
            $temp = new \stdClass();
            $temp->id = $id;
            $temp->title = get_the_title($id);

            foreach(self::acfFields as $slug => $field) {
                $temp->{$slug} = get_field($field, $id);
            }

            $details = array();
            foreach(array('project', 'agency', 'role') as $name) {
                $details[$name] = $temp->{$name};
            }

            $temp->details = $details;

            $temp->link = get_permalink($id);
            $temp->date = get_the_date('d/m/Y', $id);
            $temp->timestamp = strtotime(str_replace('/', '-', $temp->date));

            $temp->nextProject = self::getNextPost($id);

            $temp->related = array();
            if ($withRelated) {
                $temp->related = self::findNotPost($id, 1);
            }
            $arr[] = $temp;
        }

        return $arr;
    }
}