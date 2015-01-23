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

        $size = filesize('file-upload/watermark.png');

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="riba.png"');
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . $size);
    }
