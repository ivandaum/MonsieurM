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

    <div class="Project__introduction container is-flex is-wrap" style="background-color: <?= $project->color_secondary ?>; color: <?= $project->color_details ?>">
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
        <?php foreach($project->content as $k => $row): ?>
            <div class="Project__row is-flex is-center is-relative">

                <?php if($row['layout'] === 'image'): ?>
                    <div
                        class="Project__row--media has-width-100 is-relative <?= $row['className'] ?>  <?= $row['margin']['className'] ?> <?= $row['padding']['className'] ?>" 
                        style="background-color: <?= $row['color'] ?>">
                            <div class="Project__row--image is-relative is-block has-width-100">
                                <?= Image::create($row['image']) ?>
                            </div>
                    </div>
                <?php endif; ?>

                <?php if($row['layout'] === 'video'): ?>
                    <div 
                        class="Project__row--media has-width-100 is-relative <?= $row['className'] ?> <?= $row['margin']['className'] ?> <?= $row['padding']['className'] ?>" 
                        style="background-color: <?= $row['color'] ?>">
                        <div class="Project__row--video is-relative is-block  has-width-100">
                                <?= Video::create($row['video']); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <?php if($row['layout'] === 'columns'): ?>
                    <div class="Project__row--columns has-width-100 is-flex is-wrap container is-relative <?= $row['className'] ?>" style="background-color: <?= $row['background'] ?>; color: <?= $row['color'] ?>">
                        <div class="is-column is-6 is-4-tablet">
                            <h2 class="has-font-title"><?= $row['title'] ?></h2>
                        </div>
                        <div class="is-column is-6 is-flex is-wrap">
                            <?php foreach($row['content'] as $column): ?>
                                <div class="is-column is-4 is-4 is-6-tablet is-padding-bottom-3">
                                    <p class="has-text-bold"><?= $column['title'] ?></p>
                                    <p><?= $column['content'] ?></p>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>

                <?php if($row['layout'] === 'text'): ?>
                    <div class="Project__row--text has-width-100 is-flex is-wrap container is-relative <?= $row['className'] ?>" style="background-color: <?= $row['background'] ?>; color: <?= $row['color'] ?>">
                        <div class="is-column is-6 is-4-tablet"></div>
                        <div class="is-column is-4 is-6-tablet has-wp-content"><?= Text::cleanWpEditor(apply_filters('the_content', $row['content'])) ?></div>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</article>
<?php get_footer() ?>