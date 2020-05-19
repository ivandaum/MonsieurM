<?php 
    use MonsieurM\Core\Utils\Image; 
?>
<a href="<?= $project->link ?>" class="ProjectPreview is-relative js-cursor-click">
    <div class="ProjectPreview__image">
        <?= Image::createThumbnail($project->preview) ?>
    </div>
    <div class="ProjectPreview__content">
        <h3 class="is-h2 has-font-serif ProjectPreview__title is-uppercase js-fade-onload"><?= $project->title ?></h3>
        <?php if($project->place || $project->year): ?>
        <p class="is-h4 is-relative has-border-top js-fade-onload">
            <?php if($project->place): ?>
            <span><?= $project->place ?></span>
            <?php endif; ?>
            <?php if($project->place && $project->year): ?>, <?php endif; ?>
            <?php if($project->year): ?>
            <span><?= $project->year ?></span>
            <?php endif; ?>
        </p>
        <?php endif; ?>

        <?php if($project->producer): ?>
        <p class="is-h4 is-relative has-border-top is-uppercase js-fade-onload"><span><?= $project->producer ?></span></p>
        <?php endif; ?>
    </div>
</a>