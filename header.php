<?php
    use \MonsieurM\Core\Utils\Url;
    use \MonsieurM\Core\Utils\Seo;
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
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
    <?php do_action('wp_head'); ?>
    <script type="text/javascript">
        var ajaxUrl = "<?= admin_url( 'admin-ajax.php' ) ?>";
    </script>
</head>
<body <?= body_class('not-loaded') ?>>
<?php MonsieurM\Core\Utils\Template::partial('navbar') ?>
<div class="scroller">
<main data-router-wrapper class="has-width-100 is-relative">
