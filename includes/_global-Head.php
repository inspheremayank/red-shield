<?php
    $pageTitle = isset($pageTitle) ? $pageTitle : '';
?>

<!doctype html>
<html lang="en">
<!-- Begin Global Header -->
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title><?=$pageTitle?></title>
    <meta name="description" content="<?=$pageTitle?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!-- Favicons and Device related Images
    ================================================== -->
    <link rel="shortcut icon" href="favicon/favicon.svg" />  

    <!-- Stylesheet -->
    <link type="text/css" rel="stylesheet" href="static/css/vendors.css" />
    <link type="text/css" rel="stylesheet" href="static/css/default.css" media="screen" />
</head>

<!-- //End Global Header -->
<body class="body">
<!-- Note: Some classes are adding in the body from JS so developer need to create a function in which page specific classes can be added on every page... -->