<?php
namespace MonsieurM\Core\Layouts;

class Lab {


    public function __construct() {
        global $post;

        $this->title = get_field('lab__title', $post->ID);
        $this->sentence = get_field('lab__sentence', $post->ID);
        $this->keywords = get_field('lab__keywords', $post->ID);
        $this->content = get_field('lab__content', $post->ID);

        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
        // $this->content = array_merge($this->content, $this->content);
    }
}
