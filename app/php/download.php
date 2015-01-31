<?php

    $file = 'watermark/watermark.jpg';

    header('Cache-Control: public');
    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Type: '.mime_content_type($file));
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: '.filesize($file));

    readfile($file);