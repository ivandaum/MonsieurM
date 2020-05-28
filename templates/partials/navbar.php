<?php
    use MonsieurM\Core\Utils\Menu;
    use MonsieurM\Core\Utils\Url;

    $menu = Menu::get('header');

?>

<nav class="Navbar js-navbar is-absolute has-width-100 is-h5">
    <ul class="is-flex has-width-100">
        <?php foreach($menu as $item): ?>
            <li class="is-fixed has-font-title with-spacing"><a class="js-navbar-item <?php if(Url::getCurrent() === $item->url): ?>is-active<?php endif; ?>" href="<?= $item->url ?>"><?= $item->title ?></a></li>
        <?php endforeach; ?>
    </ul>
</nav>