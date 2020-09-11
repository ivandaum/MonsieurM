<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Home {
    public function __construct() {
        global $post;
        $this->intro = get_field('home__intro', $post->ID);
        $this->picture = get_field('home__picture', $post->ID);
        $this->globe = get_field('home__globe', $post->ID);
        $this->about = get_field('home__about', $post->ID);
        $this->skills = get_field('home__skills', $post->ID);
        $this->list = get_field('home__list', $post->ID);
        $this->last = $this->getLastProject();
        $this->selected = get_field('home__selected', $post->ID);
        $this->showreel = get_field('home__showreel', $post->ID);
        $this->email = get_field('config__email', 'options');
    }


    public function getLastProject() {
        global $post;
        $last = get_field('home__last', $post->ID);

        if ($last['project']) {
            $last['project'] = Project::findOne($last['project']);
        }

        if (!$last['catchline'] && $last['project']->id) {
            $last['catchline'] = $last['project']->catchline;
        }

        return $last;
    }

    // '→'

    public function formatLargeLink(string $sentence) {
        $words = explode(' ', $sentence);
        $lw = array_pop($words);
        $words = implode(' ', $words);

        return "<span class='is-relative' data-content='$words'><strong>$words</strong></span><br />→ <span class='is-relative' data-content='$lw'><strong>$lw</strong></span>";
    }
}
