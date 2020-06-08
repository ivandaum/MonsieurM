<?php
    use MonsieurM\Core\Layouts\Footer;
    use MonsieurM\Core\Utils\Video;

    $footer = new Footer();
?>
<footer class="Footer js-footer is-flex is-right-y is-relative container">
    <ul class="is-flex is-justified-x is-relative has-width-100">
        <li><a class="is-h5" href="mailto:<?= $footer->email ?>"><?= $footer->email ?></a></li>
        <li><button class="js-scroll-top is-h6 has-font-title with-spacing is-uppercase has-text-light">Top</button></li>
    </ul>

    <div class="Footer__wording has-width-100 has-height-100 is-absolute is-flex is-center has-font-serif">
        <?= $footer->wording ?>
    </div>

    <?php if($footer->video): ?>
        <div class="Footer__video is-absolute has-width-100 has-height-100">
            <?= Video::create($footer->video) ?>
        </div>
    <?php endif; ?>
</footer>