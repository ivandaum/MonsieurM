<?php
    /* Template Name: Page d'accueil */

    use MonsieurM\Core\Layouts\Home;
    use MonsieurM\Core\Utils\Image;

    $rightColumn = 7;
    $home = new Home();

    get_header();
?>
<article class="Home section-top container-fluid has-width-100" data-router-view="home">
    <section class="container is-padding-center">
        <h1 class="is-h3 has-font-title is-flex is-padding-bottom-2 is-padding-bottom-2-touch"><?= get_the_title() ?></h1>
        <p class="has-color-white is-h1 has-font-serif is-padding-bottom2x"><?= $home->intro ?></p>
    </section>

    <section class="Home__picture has-width-100"><?= Image::create($home->picture) ?></section>

    <section class="Home__about container is-flex">
        <div class="is-column is-<?= 12 - $rightColumn ?> is-3-tablet"></div>
        <div class="Home__about--right is-column is-<?= $rightColumn ?> is-9-tablet is-phone-12 is-flex is-wrap">
            <div class="is-padding-bottom2x is-padding-top2x is-column is-8-widescreen is-9-desktop">
                <h2 class="has-font-title has-color-white is-h4"><?= $home->about['title'] ?></h2>
                <p class="has-font-serif has-color-white is-h2 is-padding-top-5 is-padding-top-5-touch"><?= $home->about['intro'] ?></p>
                <div class="is-padding-top-3 is-padding-top-3-touch"><?= $home->about['text'] ?></div>
            </div>

            <div class="Home__skills is-padding-bottom2x is-column is-12">
                <h2 class="has-font-title has-color-white is-h4"><?= $home->skills['title'] ?></h2>
                <div class="is-padding-top-5 is-padding-top-3-touch"><?= $home->skills['text'] ?></div>
            </div>

            <?php foreach($home->list as $list): ?>
                <div class="Home__lists is-column is-<?= 12 / count($home->list) ?> is-<?= 12 / count($home->list) ?>-tablet is-12-phone">
                    <h2 class="has-font-title has-color-white is-h4"><?= $list['title']['text'] ?> <span class="has-font-text"><?= $list['title']['number'] ?></span></h2>
                    <ul class="is-padding-top-5 is-padding-top-3-touch">
                        <?php foreach($list['items'] as $item): ?>
                            <li><?= $item['text'] ?> <span class="has-font-serif"><?= $item['number'] ?></span></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>
    </section>


    <section class="container is-flex">
        <div class="is-column is-<?= 12 - $rightColumn ?> is-3-tablet"></div>
        <div class="Home__last is-column is-<?= $rightColumn ?> is-9-tablet is-phone-12 is-flex is-wrap">
            <h2 class="has-font-title is-h4"><?= $home->about['title'] ?></h2>
        </div>
    </section>
</article>
<?php get_footer() ?>