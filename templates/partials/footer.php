<?php
    use MonsieurM\Core\Utils\Menu;
    use MonsieurM\Core\Utils\Url;

    $email = get_field('config__email', 'options');
?>
<footer class="Footer is-relative container">
    <ul class="is-flex is-justified-x is-relative has-width-100">
        <li><a href="mailto:<?= $email ?>"><?= $email ?></a></li>
        <li><button class="is-h6 has-font-title with-spacing is-uppercase has-text-light">Top</button></li>
    </ul>
</footer>