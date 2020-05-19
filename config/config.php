<?php
define('THEME_PATH', get_template_directory());
define('TEMPLATE_PATH', THEME_PATH . '/templates/');
define('ASSETS_PATH', THEME_PATH . '/assets/');

require __DIR__ . '/constants/Taxonomy.php';

require __DIR__ . '/custom-wp-entities/post-type.php';
require __DIR__ . '/custom-wp-entities/taxonomy.php';
