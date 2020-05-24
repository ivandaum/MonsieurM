<?php
    /* Template Name: Page work */

    use MonsieurM\Core\Layouts\Work;
    use MonsieurM\Core\Utils\Template;

    $work = new Work();

    get_header();
?>
<article class="Work js-work section-top is-padding-bottom" data-router-view="work">
    <div class="container">
        <h1 class="is-h3 has-font-title js-fade-item is-flex is-left-y is-right-x is-padding-bottom-2 is-padding-bottom-2-touch"><sup class="has-font-text is-padding-right-1 is-padding-right-1-touch">2015 - <?= $work->currentYear ?></sup><?= get_the_title() ?></h1>
        <?php foreach($work->projects as $k => $project): ?>
            <div class="is-block">
                <h3 class="has-width-100 has-text-right is-flex is-right-x is-h1 has-font-serif">
                    <a data-project="<?= $project->id ?>" data-transition="workToProject" class="Work__project js-project-link is-relative" href="<?= $project->link ?>" >
                        <span data-project="<?= $project->id ?>" class="Work__project--title is-relative js-fade-item"><?= $project->title ?></span>
                        <div data-project="<?= $project->id ?>" class="Work__project--cover is-fixed has-width-100 has-height-100 is-flex is-center" style="background-color: <?= $project->color ?>;"></div>
                    </a>
                </h3>
            </div>
        <?php endforeach; ?>

        <div class="Work__other is-flex is-center-y is-right-x has-text-right has-wp-content">
            <div><?= $work->text ?></div>
        </div>
    </div>
</article>
<?php get_footer() ?>