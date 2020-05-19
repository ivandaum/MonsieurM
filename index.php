<?php
    /* Template Name: Page d'accueil */

    use MonsieurM\Core\Layouts\Home;
    use MonsieurM\Core\Utils\Image;

    $home = new Home();

    get_header();
?>
<article class="Home container-fluid is-flex" data-router-view="home">
</article>
<?php get_footer() ?>