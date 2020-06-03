<?php
namespace MonsieurM\Core\Layouts;

class Footer {
    public function __construct() {
        $this->email = get_field('config__email', 'options');
        $this->video = get_field('config__footer-video', 'options');
        $this->wording = get_field('config__footer-wording', 'options');
    }
}
