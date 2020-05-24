<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Work {
    public function __construct() {
        global $post;

        $this->projects = Project::find();
        $this->currentYear = date('Y');
        $this->text = get_field('work__text', $post->ID);
    }
}
