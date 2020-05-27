<?php
    /* Template Name: Page d'accueil */

    use MonsieurM\Core\Layouts\Home;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;
    use MonsieurM\Core\Utils\Text;

    $rightColumn = 7;
    $home = new Home();

    get_header();
?>
<article class="Home section-top container-fluid has-width-100" data-router-view="home">
    <section class="Home__introduction container is-padding-center">
        <h1 class="is-h3 has-font-title is-flex is-padding-bottom-2 is-padding-bottom-2-touch"><?= get_the_title() ?></h1>
        <p class="has-color-white is-h1 has-font-serif is-padding-bottom2x"><?= $home->intro ?></p>
    </section>

    <section class="Home__picture has-width-100"><?= Image::create($home->picture) ?></section>

    <section class="Home__about container is-flex">
        <div class="is-column is-<?= 12 - $rightColumn ?> is-3-tablet"></div>
        <div class="Home__about--right is-column is-<?= $rightColumn ?> is-9-tablet is-phone-12 is-flex is-wrap">
            <div class="is-padding-bottom2x is-padding-top2x is-column is-8-widescreen is-9-desktop">
                <h2 class="has-font-title with-spacing has-color-white is-h6"><?= $home->about['title'] ?></h2>
                <p class="has-font-serif has-color-white is-h2 is-padding-top-5 is-padding-top-5-touch"><?= $home->about['intro'] ?></p>
                <div class="is-padding-top-3 is-padding-top-3-touch"><?= $home->about['text'] ?></div>
            </div>

            <div class="Home__skills is-padding-bottom2x is-column is-12">
                <h2 class="with-spacing has-font-title has-color-white is-h6"><?= $home->skills['title'] ?></h2>
                <div class="is-padding-top-5 is-padding-top-3-touch"><?= $home->skills['text'] ?></div>
            </div>

            <?php foreach($home->list as $list): ?>
                <div class="is-h4 is-padding-top-8-touch is-column is-<?= 12 / count($home->list) ?> is-<?= 12 / count($home->list) ?>-tablet is-12-phone">
                    <h2 class="with-spacing has-font-title has-color-white is-h6"><?= $list['title']['text'] ?> <span class="has-font-text"><?= $list['title']['number'] ?></span></h2>
                    <ul class="is-padding-top-5 is-padding-top-3-touch">
                        <?php foreach($list['items'] as $item): ?>
                            <li><?= $item['text'] ?> <span class="has-font-serif"><?= $item['number'] ?></span></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>
    </section>


    <section class="Home__last container is-flex">
        <div class="is-column is-<?= 12 - $rightColumn ?> is-3-tablet"></div>
        <div class="is-column is-<?= $rightColumn ?> is-9-tablet is-phone-12">
            <h2 class="has-font-title is-h6 is-padding-bottom-6 is-padding-bottom-3-touch with-spacing"><?= $home->last['title'] ?></h2>
            <p class="Home__last--catchline is-padding-bottom-6 is-padding-bottom-3-touch is-h4"><?= $home->last['catchline'] ?></p>

            <?php if ($home->last['project']): ?>
            <a href="<?= $home->last['project']->link ?>" class="Home__last--video is-relative is-flex is-wrap">
                <div class="is-absolute has-width-100 icon-new is-margin-right-5 is-margin-top-5 is-margin-top-3-touch is-margin-right-3-touch is-h6"></div>
                <div class="Home__last--project is-padding-bottom-8 is-padding-bottom-4-touch is-absolute has-width-100 is-padding-left-5 is-padding-left-3-touch is-padding-right-3-touch">
                    <span class="has-font-serif has-width-100 is-block"><?= $home->last['project']->title ?></span>
                    <span class="is-h6 has-font-title has-width-100 is-block is-padding-top-2 is-padding-top-2-touch">→ See case study</span>
                </div>

                <?php if ($home->last['project']->video): ?>
                    <?= Video::create($home->last['project']->video) ?>
                <?php elseif ($home->last['project']->cover): ?>
                    <?= Image::create($home->last['project']->cover) ?>
                <?php endif; ?>
            </div>
            <?php endif; ?>
                </a>
    </section>

    <section class="Home__links container is-flex is-center">
        <div class="has-width-100">
            <div class="is-flex is-right-x">
                <a href="/work" class="is-margin-bottom-10 is-block has-text-right">
                    <span class="is-block"><?= $home->selected['wording'] ?></span>
                    <span class="Home__links--title has-font-title"><?= Text::addBeforeLastWord($home->selected['title'], '→') ?></span>
                </a>
            </div>
            <div class="is-flex is-right-x">
                <button class="js-showreel is-margin-bottom-10 is-block has-text-right">
                    <span class="is-block"><?= $home->showreel['wording'] ?></span>
                    <span class="Home__links--title has-font-title"><?= Text::addBeforeLastWord($home->showreel['title'], '→') ?></span>
                </button>
            </div>
        </div>
    </section>
</article>
<?php get_footer() ?>