<?php
    /* Template Name: Page work */

    use MonsieurM\Core\Layouts\Work;
    use MonsieurM\Core\Utils\Template;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;

    $work = new Work();

    get_header();
?>

<article class="Work js-work has-width-100" data-router-view="work">
    <div class="container js-scrollable section-top is-padding-bottom">
        <h1 class="is-h3 has-font-title js-fade-item is-flex is-left-y is-right-x is-padding-bottom-2 is-padding-bottom-2-touch"><sup class="has-font-text is-padding-right-1 is-padding-right-1-touch">2015 - <?= $work->currentYear ?></sup><?= get_the_title() ?></h1>
        <?php foreach($work->projects as $k => $project): ?>
            <div class="is-block">
                <h3 class="has-width-100 has-text-right is-relative is-flex is-center-y is-right-x is-h1 has-font-serif">
                    <div data-project="<?= $project->id ?>" class="Work__project--galery js-project-galery is-flex is-center-y is-absolute has-height-100">
                    <?php if($project->galery): ?>
                        <?php foreach($project->galery as $image): ?>
                            <?= Image::createThumbnail($image) ?>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    </div>
                    <a data-project="<?= $project->id ?>" data-transition="workToProject" class="Work__project js-project-link is-relative" href="<?= $project->link ?>">
                        <div data-project="<?= $project->id ?>" class="Work__project--title is-relative js-fade-item">
                            <?php if($project->has_ribbon): ?>
                            <i class="js-ribbon icon-new is-absolute"></i>
                            <?php endif; ?>
                            <?= Text::wrapWord($project->title, 'span') ?>
                        </div>
                    </a>
                </h3>
            </div>
        <?php endforeach; ?>

        <div class="Work__other is-flex is-center-y is-right-x has-text-right has-wp-content">
            <div><?= $work->text ?></div>
        </div>
    </div>

    <div class="Work__project--cover js-cover is-fixed has-width-100 is-flex is-center">
        <?php foreach($work->projects as $k => $project): ?>
        <?php if($project->video): ?>
            <div data-project="<?= $project->id ?>" class="js-project-video is-absolute has-width-100 has-height-100">
                <?= Video::create($project->video) ?>
            </div>
        <?php endif; ?>
        <?php endforeach; ?>
    </div>
    <?php Template::partial('footer'); ?>
</article>

<?php get_footer() ?>