<?php
    use MonsieurM\Core\Layouts\SingleProject;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;

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
        <?php foreach($project->content as $row): ?>
            <?php if($row['layout'] === 'image'): ?>
                <div 
                    class="is-flex <?= $row['margin']['className'] ?> <?= $row['padding']['className'] ?>" 
                    style="background-color: <?= $row['color'] ?>">
                        <div class="Project__content--media is-relative is-block has-width-100">
                            <?= Image::create($row['image']) ?>
                        </div>
                </div>
            <?php endif; ?>

            <?php if($row['layout'] === 'video'): ?>
                <div 
                    class="is-flex Project__content--video <?= $row['margin']['className'] ?> <?= $row['padding']['className'] ?>" 
                    style="background-color: <?= $row['color'] ?>">
                    <div class="Project__content--media is-relative is-block  has-width-100">
                            <?= Video::create($row['video']); ?>
                    </div>
                </div>
            <?php endif; ?>

            <?php if($row['layout'] === 'columns'): ?>
                <div class="Project__content--columns is-flex is-wrap container" style="background-color: <?= $row['background'] ?>; color: <?= $row['color'] ?>">
                    <div class="is-column is-6">
                        <h2 class="has-font-title"><?= $row['title'] ?></h2>
                    </div>
                    <div class="is-column is-6 is-flex is-wrap">
                        <?php foreach($row['content'] as $column): ?>
                            <div class="is-column is-4 is-padding-bottom-3">
                                <p class="has-text-bold"><?= $column['title'] ?></p>
                                <p><?= $column['content'] ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

            <?php if($row['layout'] === 'text'): ?>
                <div class="Project__content--text is-flex is-wrap container" style="background-color: <?= $row['background'] ?>; color: <?= $row['color'] ?>">
                    <div class="is-column is-6"></div>
                    <div class="is-column is-4 has-wp-content"><?= Text::cleanWpEditor(apply_filters('the_content', $row['content'])) ?></div>
                </div>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
</article>
<?php get_footer() ?>