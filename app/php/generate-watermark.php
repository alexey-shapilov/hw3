<?php
    require_once 'wideimage/lib/WideImage.php';

    $watermark_generated = 'watermark/watermark.jpg';

    $result['wmCoordX'] = $_POST['wmCoordX'];
    $result['wmCoordY'] = $_POST['wmCoordY'];
    $result['wmOpacity'] = $_POST['wmOpacity'] * 100;
    $result['wmImg'] = WideImage::load($_POST['wmImg']);
    $result['bgImg'] = WideImage::load($_POST['bgImg']);

    $new = $result['bgImg']->merge($result['wmImg'], 'left + ' . $result['wmCoordX'], 'top+' . $result['wmCoordY'], $result['wmOpacity']);
    $new->saveToFile('watermark/watermark.jpg');

    exit;