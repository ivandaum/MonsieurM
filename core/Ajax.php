<?php

namespace MonsieurM\Core;

use MonsieurM\Core\Layouts\Newsletter;

class Ajax {
    public static $passwordIsValid = false;

    public function __construct() {
        // add_action( 'wp_ajax_submitNewsletter', array($this, 'onNewsletterSubmit'));
        // add_action( 'wp_ajax_nopriv_submitNewsletter', array($this, 'onNewsletterSubmit'));
    }

    public function onNewsletterSubmit() {
        
    }

    public function toJson($data) {
        $step = null;
        if (isset($_POST['step'])) {
            $step = $_POST['step'];
        }

        echo json_encode(array_merge($data, array('step' => $step)));
        die;
    }
}

