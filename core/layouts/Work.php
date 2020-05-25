<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Work {


    public function __construct() {
        global $post;

        $this->projects = array();
        $projects = get_field('work__projects', $post->ID);
        foreach($projects as $project) {
            $p = Project::findOne($project['id']);
            $p->has_ribbon = $project['ribbon'];
            $this->projects[] = $p;
        }
        $this->currentYear = date('Y');
        $this->text = get_field('work__text', $post->ID);
    }
}
