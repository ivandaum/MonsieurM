<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Home {
    const projectPage = 'home__projects-page';
    const projects = 'home__projects';

    public function __construct() {
        global $post;
        $this->projectlink = get_field(self::projectPage, $post->ID);
        $this->projects = array();

        $projects = get_field(self::projects, $post->ID);
        foreach($projects as $entry) {
            $this->projects[] = Project::findOne($entry['id']);
        }
    }
}
