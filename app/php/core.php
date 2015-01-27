<?php
function get_js(){
    if (isset($_POST['paddingLeft']) AND isset($_POST['paddingTop']) AND isset($_POST['opacity'])){
        $_SESSION["paddingLeft"] = $_POST['paddingLeft'];
        $_SESSION["paddingTop"] = $_POST['paddingTop'];
        $_SESSION["opacity"] = $_POST['opacity'];
    }
    else {

    }

}// берёт данные из js (готово 40% {нет js})

function watermark_create(){

    $userDir = $_SESSION["ID"];

    $stampPaddingLeft = $_SESSION["paddingLeft"];//отступ снизу
    $stampPaddingTop = $_SESSION["paddingTop"];//отступ сверху
    $stampOpacity = $_SESSION["opacity"]; // прозрачность в процентах

    $mainImage = "tmp/$userDir/main.jpg";//картинка фона
    $stampImage = "tmp/$userDir/stamp.jpeg";//картинка водного знака

    $image = image_create($mainImage);
    $stamp = image_create($stampImage);

    $stampWidth = imagesx($stamp);
    $stampHeight = imagesy($stamp);

    imagecopymerge( $image, $stamp, $stampPaddingLeft, $stampPaddingTop, 0, 0, $stampWidth, $stampHeight, $stampOpacity);// Слияние штампа с фотографией.
    imagepng($image, "tmp/$userDir/watermark.png");// Сохранение фотографии в файл
    imagedestroy($image); //освобождение памяти
} //создаёт водный знак (готово 90%)

function create_temp_dir (){
    if (isset($_SESSION["ID"])){
        $userDir = $_SESSION["ID"];
        mkdir("temp/$userDir");
    }
    else {
        echo "Сессия не мнмциализирована";
    }



    //  todo    создание временной папки {кажется должно быть не так}
}   //создаёт дирректорию (готово 40% {название берётся из сессии})

function file_upload(){

    //  todo    загрузка  файлов на сервер  во времнную папку {true if success}
}       //в разработке

function file_download(){
    $userDir = $_SESSION["ID"];
    $file = "tmp/$userDir/watermark.png"; //картинка после наложения
    if (file_exists($file)) {
        // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
        // если этого не сделать файл будет читаться в память полностью!
        //if (ob_get_level()) {
        //    ob_end_clean();
        //}
        // заставляем браузер показать окно сохранения файла
        //header('Content-Description: File Transfer');
        //header('Content-Type: application/octet-stream');
        //header('Content-Disposition: attachment; filename=' . basename($file));
        //header('Content-Transfer-Encoding: binary');
        //header('Expires: 0');
        //header('Cache-Control: must-revalidate');
        //header('Pragma: public');
        //header('Content-Length: ' . filesize($file));
        // читаем файл и отправляем его пользователю
        readfile($file);
        exit;
    }
}

//  todo    скачивание  файлов  с сервера из временной дирректории {}
}     //в разработке

function clean($dirName){
    if (file_exists("./$dirName"))
        foreach (glob("./$dirName/*") as $file)
            unlink($file); // удаляет все файлы из дирректории

    rmdir("$dirName");// удаляет дирректорию
    session_destroy();// удаляет сессию
}    //удаляет папку пользователя и его сессию (готово 90%)

function resize($image, $newWidth, $newHeight) {
    image_create($image);
    $oldWidth = imagesx($image);
    $oldHeight = imagesy($image);
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $oldWidth, $oldHeight);
    $image = $newImage;
    imagepng($image, 'img/resized.png');// Сохранение фотографии в файл
    imagedestroy($image); //освобождение памяти
}  //изменяет размер изображения (готово 90%)

function image_create($image){
    $image_type = exif_imagetype("$image");
    if( $image_type == IMAGETYPE_JPEG ) {
        $image = imagecreatefromjpeg($image);
    } elseif( $image_type == IMAGETYPE_GIF ) {
        $image = imagecreatefromgif($image);
    } elseif( $image_type == IMAGETYPE_PNG ) {
        $image = imagecreatefrompng($image);
    }
    else{
        echo "Тип файла не поддерживается.";
    }
    return $image;
} // Возвращает созданное изображение (готово 90% {с зависимостью от типа картинки})