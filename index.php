<?php
    /* Template Name: Page d'accueil */

    use MonsieurM\Core\Layouts\Home;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Template;

    $rightColumn = 7;
    $home = new Home();

    get_header();
?>
<article class="Home has-width-100" data-router-view="home" data-loader="#fff">
    <div class="js-view has-width-100">
        <section class="Home__introduction js-introduction section-top container">
            <div class="js-introduction-header is-relative">
                <h1 class="is-h3 has-font-title is-relative is-padding-bottom-2 is-padding-bottom-2-touch js-title is-flex">
                    <span class="Home__introduction--title js-title-overflow is-flex"><span><?= get_the_title() ?></span></span>
                    <span>☺︎</span>
                </h1>
                <div class="has-color-white is-relative is-h1 has-font-serif is-padding-bottom2x js-content">
                    <div class="is-column is-10 is-10-tablet is-12-phone"><?= Text::wrapWord($home->intro, 'span') ?></div>
                </div>
            </div>
            <div class="Home__introduction--background is-absolute has-width-100 has-height-100 js-background"></div>
        </section>
    
        <section class="Home__picture is-relative has-width-100 has-height-100 js-picture" data-gifPath="<?= get_theme_file_uri('/assets/images/doodle') ?>">
            <h2 class="Home__about--title is-absolute has-width-100 is-uppercase has-text-center has-font-serif js-about-title with-spacing has-color-white"><?= $home->about['title'] ?></h2>
            <div class="Home__picture--circle is-absolute js-picture-circle is-flex is-center">
                <img alt="img-circle-picture" class="is-absolute is-block has-width-100 has-height-100" src="<?= get_theme_file_uri('/assets/images/circle.png') ?>">
            </div>
            <?= Image::create($home->picture, array(), false) ?>
            <canvas class="js-picture-canvas Home__picture--canvas is-absolute"></canvas>
        </section>
        <section class="Home__about js-about container is-flex has-width-100">
            <div class="Home__about--left is-column is-<?= 12 - $rightColumn ?> is-3-tablet">
                <div class="Home__scrollingCircle js-about-circle is-flex is-center">
                    <img alt="worldwide.png" class="Home__scrollingCircle--rotate js-about-circleRotating is-absolute" src="<?= get_theme_file_uri('/assets/images/worldwide.png') ?>">
                    <img alt="world.gif" class="has-width-100 has-height-100" src="<?= get_theme_file_uri('/assets/images/anim-world.webp') ?>" alt="">
                </div>
            </div>
            <div class="Home__about--right is-column is-<?= $rightColumn ?> is-9-tablet is-phone-12 is-flex is-wrap">
                <div class="is-padding-bottom2x is-padding-top2x is-column is-9 js-fadein">
                    <p class="has-font-serif has-color-white is-h2"><?= $home->about['intro'] ?></p>
                    <div class="is-padding-top-3 is-padding-top-3-touch"><?= $home->about['text'] ?></div>
                </div>
    
                <div class="Home__skills is-padding-bottom2x is-column is-12 js-fadein">
                    <h2 class="with-spacing has-font-title has-color-white is-h6"><?= $home->skills['title'] ?></h2>
                    <div class="is-padding-top-5 is-padding-top-3-touch"><?= $home->skills['text'] ?></div>
                </div>

                <?php foreach($home->list as $list): ?>
                    <div class="is-h4 is-padding-top-8-touch is-column js-fadein is-<?= 12 / count($home->list) ?> is-<?= 12 / count($home->list) ?>-tablet is-12-phone">
                        <h2 class="with-spacing has-font-title has-color-white is-h6"><?= $list['title']['text'] ?> <span class="has-font-text"><?= $list['title']['number'] ?></span></h2>
                        <ul class="is-padding-top-5 is-padding-top-3-touch">
                            <?php foreach($list['items'] as $item): ?>
                                <li class="Home__column"><?= $item['text'] ?> <span class="has-font-serif"><?= $item['number'] ?></span></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="Home__last container is-flex">
            <div class="is-column is-<?= 12 - $rightColumn ?> is-3-tablet"></div>
            <div class="is-column is-<?= $rightColumn ?> js-fadein is-9-tablet is-phone-12">
                <h2 class="has-font-title is-h6 is-padding-bottom-6 is-padding-bottom-3-touch with-spacing"><?= $home->last['title'] ?></h2>
                <p class="Home__last--catchline is-padding-bottom-6 is-padding-bottom-3-touch is-h4"><?= $home->last['catchline'] ?></p>
    
                <?php if ($home->last['project']): ?>
                <a href="<?= $home->last['project']->link ?>" class="Home__last--video is-relative is-flex is-wrap js-last-project js-fadein">
                    <div class="is-absolute has-width-100 icon-new is-margin-right-5 is-margin-top-5 is-margin-top-3-touch is-margin-right-3-touch is-h6"></div>
                    <div class="Home__last--project is-padding-bottom-8 is-padding-bottom-4-touch is-absolute has-width-100 is-padding-left-5 is-padding-left-3-touch is-padding-right-3-touch">
                        <span class="has-font-serif has-width-100 is-block"><?= $home->last['project']->title ?></span>
                        <span class="is-h6 has-font-title has-width-100 is-block is-padding-top-2 is-padding-top-2-touch">→ See case study</span>
                    </div>
                    
                    <?php if (isset($home->last['project']->video)): ?>
                        <?= Video::create($home->last['project']->video) ?>
                    <?php elseif (isset($home->last['project']->cover)): ?>
                        <?= Image::create($home->last['project']->cover) ?>
                    <?php endif; ?>
                <?php endif; ?>
                </a>
        </section>
    
        <section class="Home__links container is-flex is-center is-h5">
            <div class="has-width-100">
                <div class="is-flex is-right-x js-fadein">
                    <a href="<?= $home->selected['page'] ?>" class="is-margin-bottom-10 is-margin-bottom-5-touch is-block has-text-right">
                        <p class="is-block"><?= $home->selected['wording'] ?></p>
                        <p class="Home__links--title has-font-large-title is-padding-top-1-touch is-relative"><?= $home->formatLargeLink($home->selected['title']) ?></p>
                    </a>
                </div>
                <div class="is-flex is-right-x js-fadein">
                    <button class="js-showreel-trigger is-margin-bottom-10 is-margin-bottom-5-touch is-block has-text-right">
                        <p class="is-block"><?= $home->showreel['wording'] ?></p>
                        <p class="Home__links--title has-font-large-title is-padding-top-1-touch is-relative"><?= $home->formatLargeLink($home->showreel['title']) ?></p>
                    </button>
                </div>
            </div>
        </section>
        
        <?php Template::partial('footer'); ?>
    </div>

    <section class="Home__showreel ignore-locked js-showreel is-absolute container has-text-center">
        <div class="is-flex is-center has-width-100 has-height-100">
            <button class="Home__showreel--close js-showreel-close is-absolute has-font-title with-spacing is-relative">Close</button>
            <div class="js-project-wording has-font-large-title  is-absolute Home__showreel--wording is-active is-flex is-center">
                <span class="is-flex is-center">Play</span>
            </div>
            <?= Video::create($home->showreel['video'], false, false, true) ?>
        </div>
        <div class="Home__showreel--background js-showreel-background is-absolute has-height-100 has-width-100"></div>
    </section>
</article>

<?php get_footer() ?>