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

        if(!$content) {
            return $r;
        }

        foreach($content as $entry) {
            $layout = $entry['acf_fc_layout'];
            $row = array();

            if ($layout === 'image' || $layout === 'video') {

                $row = array(
                    'layout' => $layout,
                    'color' => $this->getIfExists($entry['settings']['color'], 'background'),
                    'margin' => $this->getMargin($entry['settings'], 'margin'),
                    'padding' => $this->getMargin($entry['settings'], 'padding'),
                );

                $row[$layout] = $entry['source'];

            }

            else if ($layout === 'text') {
                $row = array(
                    'layout' => $layout,
                    'content' => $entry['source'],
                    'background' => $this->getIfExists($entry['color'], 'background'),
                    'color' => $this->getIfExists($entry['color'], 'text')
                );
            }

            else if ($layout === 'columns') {
                $row = array(
                    'layout' => $layout,
                    'content' => $entry['content'],
                    'title' => $entry['settings']['title'],
                    'background' => $this->getIfExists($entry['settings']['color'], 'background'),
                    'color' => $this->getIfExists($entry['settings']['color'], 'text')
                );
            }

            $r[] = $row;
        }

        return $r;
    }

    public function getMargin($arr, $attrName) {
        if (!isset($arr[$attrName])) return '';
        
        $m = array();
        $className = '';
        foreach($arr[$attrName] as $name => $value) {
            $m[$name] = $value;
            if($value) {
                $className .= 'has-'. $attrName . '-' . $name . ' ';
            }
        }

        $m['className'] = $className;
        return $m;
    }

    public function getIfExists($array, $name) {
        return isset($array[$name]) ? $array[$name] : null;
    }
}
