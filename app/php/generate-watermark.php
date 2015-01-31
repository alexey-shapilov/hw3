<?php
    require_once 'wideimage/lib/WideImage.php';

    $watermark_generated = 'watermark/watermark.jpg';

    $result['wmCoordX'] = $_POST['wmCoordX'];
    $result['wmCoordY'] = $_POST['wmCoordY'];
    $result['wmOpacity'] = $_POST['wmOpacity'] * 100;

    $result['wmWidth'] = $_POST['wmImgWidth'];
    $result['wmHeight'] = $_POST['wmImgHeight'];
    $result['bgImgWidth'] = $_POST['bgImgWidth'];
    $result['bgImgHeight'] = $_POST['bgImgHeight'];

    $result['wmImg'] = WideImage::load($_POST['wmImg']);
    $result['bgImg'] = WideImage::load($_POST['bgImg']);

    $watermark = $result['wmImg']->resize($result['wmWidth'], $result['wmHeight']);
    $bg = $result['bgImg']->resize($result['bgImgWidth'], $result['bgImgHeight']);

    $new = $bg->merge($watermark, 'left + ' . $result['wmCoordX'], 'top+' . $result['wmCoordY'], $result['wmOpacity']);
    $new->saveToFile('watermark/watermark.jpg');

    exit;