<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class SingleProject {
    public function __construct() {
        global $post;
        $this->project = Project::findOne($post->ID);
        foreach($this->project as $name => $value) {
            $this->{$name} = $value;
        }

        $this->content = $this->formatContent($this->content);
    }

    public function formatContent($content) {
        $r = array();
        foreach($content as $entry) {
            $layout = $entry['acf_fc_layout'];
            $row = array();

            if ($layout === 'media') {

                $row = array(
                    'layout' => 'image',
                    'image' => $entry['source'],
                    'centered' => $entry['is-centered'],
                    'color' => $this->getIfExists($entry, 'color')
                );
            }

            else if ($layout === 'text') {
                $row = array(
                    'layout' => $layout,
                    'text' => $entry['source'],
                    'background' => $this->getIfExists($entry, 'background'),
                    'color' => $this->getIfExists($entry, 'color')
                );
            }

            else if ($layout === 'columns') {
                $row = array(
                    'layout' => $layout,
                    'title' => $entry['details']['title'],
                    'content' => $entry['content'],
                    'background' => $this->getIfExists($entry['details'], 'background'),
                    'color' => $this->getIfExists($entry['details'], 'color')
                );
            }

            $r[] = $row;
        }

        return $r;
    }

    public function getIfExists($array, $name) {
        return isset($array[$name]) ? $array[$name] : null;
    }
}
