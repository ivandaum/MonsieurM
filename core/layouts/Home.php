<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Home {
    public function __construct() {
        global $post;
        $this->intro = get_field('home__intro', $post->ID);
    }
}
