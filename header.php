<?php
    use \MonsieurM\Core\Utils\Url;
    use \MonsieurM\Core\Utils\Seo;
?>

<!DOCTYPE html>
<html style="--vh:1vh;" <?php language_attributes(); ?>>
<!-- Code by Ivan Daum → https://ivandaum.fr -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="<?= get_theme_file_uri('/dist/index.css') ?>" rel="stylesheet">
    <title><?= Seo::title() ?></title>
    <meta name="description" content="<?= Seo::siteDescription() ?>" />
    <link rel="shortcut icon" type="image/x-icon" href="<?= get_theme_file_uri('/assets/images/favico.ico') ?>">
	<meta property="og:type" content="article" />
	<meta property="og:title" content="<?= Seo::title() ?>" />
	<meta property="og:url" content="<?= Url::getCurrent() ?>" />
    <meta property="og:site_name" content="<?= Seo::siteName() ?>" />
    <meta property="og:description" content="<?= Seo::siteDescription() ?>" />
    <meta property="og:image" content="<?= Seo::image() ?>" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="<?= get_theme_file_uri('/assets/images/monsieurm-card.jpg') ?> ?>" />
    <?php do_action('wp_head'); ?>
    <script type="text/javascript">
        var ajaxUrl = "<?= admin_url( 'admin-ajax.php' ) ?>";
    </script>
</head>
<body <?= body_class('locked not-loaded') ?>>
<?php MonsieurM\Core\Utils\Template::partial('navbar') ?>
    <div class="scroller is-relative has-width-100">
<main data-router-wrapper>
