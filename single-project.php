<?php
    use MonsieurM\Core\Layouts\SingleProject;
    use MonsieurM\Core\Utils\Text;
    use MonsieurM\Core\Utils\Image;
    use MonsieurM\Core\Utils\Video;

    $project = new SingleProject();

    get_header();
?>
<article class="Project has-width-100 js-view" data-router-view="project" data-color="<?= $project->color ?>" data-loader="<?= $project->color ?>">
    <section class="Project__header js-project-header is-relative">
        <div class="section-top container js-project is-padding-bottom">
            <h1 class="is-h1 has-font-serif js-project-title" style="color: <?= $project->color ?>"><?= Text::wrapWord($project->title, 'span') ?></h1>
            <p class="is-h1 has-font-serif js-project-intro" style="color: <?= $project->color_intro ?>"><?= $project->catchline ?></p>
        </div>
    
        <div class="Project__introduction container is-flex is-wrap is-padding-top" style="color: <?= $project->color_details ?>">
            <?php if($project->details): ?>
                <?php foreach($project->details as $title => $content): ?>
                    <?php if($content): ?>
                    <div class="is-column is-3 is-12-tablet is-12-phone is-padding-bottom-3-touch">
                        <h2 class="has-font-title"><?= $title ?></h2>
                        <p class="has-font-text"><?= $content ?></p>
                    </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <div class="Project__background js-project-background is-absolute has-height-100 has-width-100" style="background-color: <?= $project->color_secondary ?>"></div>
    </section>

    <section class="Project__content">
        <?php if(isset($project->cover['image']['url'])): ?>
        <div class="Project__cover js-project-cover is-flex is-center is-relative" style="background-color: <?= $project->cover['color'] ?>">
            <?= Image::createHD($project->cover['image']) ?>
        </div>
        <?php endif; ?>

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
                        <div class="is-column is-6-widescreen is-4-desktop is-4-tablet is-12-phone is-padding-bottom-3-touch">
                            <h2 class="has-font-title"><?= $row['title'] ?></h2>
                        </div>

                        <div class="is-column is-flex is-6-widescreen is-8-desktop is-8-tablet is-12-phone is-wrap">
                            <?php foreach($row['content'] as $column): ?>
                                <div class="is-column is-4 is-6-tablet is-12-phone is-padding-bottom-3 is-padding-bottom-2-touch">
                                    <p class="has-text-light"><?= $column['title'] ?></p>
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

                <?php if($row['layout'] === 'quote'): ?>
                    <div class="Project__row--quote has-width-100 container is-relative has-text-center <?= $row['className'] ?>" style="background-color: <?= $row['background'] ?>; color: <?= $row['color'] ?>">
                        <?php if($row['intro']): ?>
                        <div class="has-width-100 is-flex is-margin-bottom-6 is-margin-bottom-4-touch">
                            <div class="is-column is-4 is-4-tablet"></div>
                            <div class="is-column is-4 is-4-tablet">
                                <?= $row['intro'] ?>
                            </div>
                        </div>
                        <?php endif; ?>
                        <?php foreach($row['quotes'] as $quote): ?>
                            <blockquote class="is-block has-width-100 is-padding-bottom-3 is-padding-bottom-3-touch">
                                <p class="has-font-serif is-h1-5 is-padding-bottom-1-touch">"<?= $quote['text'] ?>"</p>
                                <footer>— <?= $quote['legend'] ?></footer>
                            </blockquote>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

        <?php if($project->nextProject): ?>
            <div class="Project__next is-relative has-width-100 has-height-100 is-flex is-center-y">
                <div class="container">
                    <div>
                        <a data-transition="workToProject" href="<?= $project->nextProject->link ?>" class="has-text-right is-flex is-right-x is-wrap">
                            <p class="Project__next--wording has-font-title has-color-white is-h3 has-width-100 is-absolute">Next project</p>
                            <h2 class="is-h1 has-font-serif js-fade-item has-width-100"><?= Text::wrapWord($project->nextProject->title, 'span') ?></h2>
                        </a>
                    </div>
                </div>
                <div data-project="<?= $project->nextProject->id ?>" class="Project__next--video is-absolute has-width-100 has-height-100">
                    <?= Video::create($project->nextProject->video) ?>
                </div>
            </div>
        <?php endif; ?>
    </section>

</article>
<?php get_footer() ?>