<?php

    $post = (!empty($_POST)) ? true : false;
    $result = array();

    if ($post) {

        $result['wmCoordX'] = $_POST['wmCoordX'];
        $result['wmCoordY'] = $_POST['wmCoordY'];
        $result['wmOpacity'] = $_POST['wmOpacity'] * 100;
        $result['wmImg'] = $_POST['wmImg'];
        $result['bgImg'] = $_POST['bgImg'];

        $background = imagecreatefrompng($result['bgImg']);
        $watermark = imagecreatefrompng($result['wmImg']);
        $stampWidth = imagesx($background);
        $stampHeight = imagesy($background);


        imagecopymerge( $background, $watermark, 0, 0, $result['wmCoordX'], $result['wmCoordY'], $stampWidth, $stampHeight, $result['wmOpacity']);
        imagepng($background, "file-upload/watermark.png");
        imagedestroy($background);

    }
