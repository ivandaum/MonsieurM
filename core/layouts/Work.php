<?php
namespace MonsieurM\Core\Layouts;

use MonsieurM\Core\Models\Project;

class Work {
    public function __construct() {
        $this->projects = Project::find();
        $this->currentYear = date('Y');
    }
}
