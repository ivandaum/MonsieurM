<?php
    use MonsieurM\Core\Layouts\Footer;
    use MonsieurM\Core\Utils\Video;

    $footer = new Footer();
?>
<footer class="Footer js-footer is-flex is-right-y is-relative container js-mailto">
    <ul class="is-flex is-justified-x is-relative has-width-100">
        <li>
            <a data-router-disabled="true" rel="nofollow" class="js-mailto-trigger is-block is-h5 is-relative" href="mailto:<?= $footer->email ?>">
                <?= $footer->email ?>
            </a>
        </li>
        <li>
        <button class="js-scroll-top is-h6 has-font-title with-spacing is-uppercase has-text-light">Top</button></li>
    </ul>

    <div class="Footer__wording js-mailto-wording is-fixed is-flex is-center has-font-serif">
        <?= $footer->wording ?>
    </div>

    <?php if($footer->video): ?>
        <div class="Footer__video js-mailto-video is-fixed">
            <?= Video::create($footer->video) ?>
        </div>
    <?php endif; ?>
</footer>