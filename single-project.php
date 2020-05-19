<?php
    use MonsieurM\Core\Layouts\SingleProject;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Image;

    $project = new SingleProject();

    get_header();
?>
<article class="Project" data-router-view="project">
    <div class="Project__header container" style="background-color: <?= $project->color_secondary ?>">
        <h1 class="is-h1 has-font-serif" style="color: <?= $project->color ?>"><?= $project->title ?></h1>
        <p class="is-h1 has-font-serif " style="color: <?= $project->color_intro ?>"><?= $project->catchline ?></p>
    </div>

    <div class="Project__introduction container is-flex is-wrap" style="background-color: <?= $project->color_secondary ?>; color: <?= $project->color_intro ?>">
        <?php if($project->details): ?>
            <?php foreach($project->details as $title => $content): ?>
            <div class="is-column is-3">
                <h2 class="has-font-title"><?= $title ?></h2>
                <p class="has-font-text"><?= $content ?></p>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <div class="Project__content">
        <?php foreach($project->content as $content): ?>

            <?php if($content['layout'] === 'image'): ?>
                <div class="Project__content--image <?php if($content['centered']): ?>is-centered<?php endif; ?>" style="background-color: <?= $content['color'] ?>">
                    <?= Image::create($content['image']) ?>
                </div>
            <?php endif; ?>

            <?php if($content['layout'] === 'columns'): ?>
                <div class="Project__content--columns">
                    
                </div>
            <?php endif; ?>

            <?php if($content['layout'] === 'text'): ?>
                <div class="Project__content--text is-flex is-wrap container" style="background-color: <?= $content['background'] ?>; color: <?= $content['color'] ?>">
                    <div class="is-column is-6"></div>
                    <div class="is-column is-4 has-wp-content"><?= Text::cleanWpEditor(apply_filters('the_content', $content['text'])) ?></div>
                </div>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
</article>
<?php get_footer() ?>