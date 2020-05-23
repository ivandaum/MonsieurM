<?php
    /* Template Name: Page d'accueil */

    use MonsieurM\Core\Layouts\Home;
    use MonsieurM\Core\Utils\Image;

    $home = new Home();

    get_header();
?>
<article class="Home container-fluid is-flex" data-router-view="home">
    <div class="container container-top is-padding-center">
        <h1 class="is-h3 has-font-title is-flex is-padding-bottom-2 is-padding-bottom-2-touch"><?= get_the_title() ?></h1>
        <p class="Home__intro is-h1 has-font-serif"><?= $home->intro ?></p>
    </div>
</article>
<?php get_footer() ?>