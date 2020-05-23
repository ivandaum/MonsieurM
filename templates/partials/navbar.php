<?php
    use MonsieurM\Core\Utils\Menu;

    $menu = Menu::get('header');

?>

<nav class="Navbar is-absolute has-width-100">
    <ul class="container is-flex is-justified-x has-padding-center">
        <?php foreach($menu as $item): ?>
            <li class="has-font-title"><a href="<?= $item->url ?>"><?= $item->title ?></a></li>
        <?php endforeach; ?>
    </ul>
</nav>