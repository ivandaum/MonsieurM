<?php
    /* Template Name: Page work */

    use MonsieurM\Core\Layouts\Work;
    use MonsieurM\Core\Utils\Template;

    $work = new Work();

    get_header();
?>
<article class="Work" data-router-view="work">
    <div class="container is-padding-center">
        <h1 class="has-font-title is-flex is-right-x"><sup class="has-font-text">2015 - <?= $work->currentYear ?></sup><?= get_the_title() ?></h1>
        <?php foreach($work->projects as $project): ?>
            <a href="<?= $project->link ?>" class="Work__project is-flex is-right-x">
                <h3 class="is-h1 has-font-serif"><?= $project->title ?></h3>
            </a>
        <?php endforeach; ?>
    </div>
</article>
<?php get_footer() ?>