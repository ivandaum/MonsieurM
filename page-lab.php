<?php
    /* Template Name: Page Lab */

    use MonsieurM\Core\Layouts\Lab;
    use MonsieurM\Core\Utils\Template;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;

    $lab = new Lab();

    get_header();
?>

<article class="Lab js-view has-width-100" data-router-view="lab">
    <section class="Lab__introduction section-top container has-text-center">
        <div class="Lab__introduction--header js-lab-header is-relative">
            <h1 class="is-h3 has-font-title is-relative is-padding-bottom-2 is-padding-bottom-2-touch js-title">
                <?= $lab->title ?>
            </h1>
            <div class="Lab__introduction--sentence js-content is-relative">
                <p class="has-color-white is-relative is-h1 has-font-serif is-padding-bottom-3 is-padding-bottom-3-touch"><?= $lab->sentence ?></p>
                <p class="has-color-white is-relative is-h6 is-uppercase is-padding-bottom2x"><?= $lab->keywords ?></p>
            </div>
        </div>
        <div class="Lab__introduction--background is-absolute has-width-100 has-height-100 js-background"></div>
    </section>

    <section class="Lab__content container">
        <?php foreach($lab->content as $entry): ?>
            <div class="Lab__row is-padding-bottom-6 is-padding-bottom-6-touch is-flex">
                <div class="Lab__media">
                    <?php if($entry['acf_fc_layout'] === 'image'): ?>
                        <?= Image::create($entry['source']) ?>
                    <?php elseif($entry['acf_fc_layout'] === 'video'): ?>
                        <?= Video::create($entry['source']); ?>
                    <?php endif; ?>
                    <p class="is-padding-top-2 is-padding-top-2-touch"><?= $entry['text'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </section>
    <?php Template::partial('footer'); ?>
</article>

<?php get_footer() ?>