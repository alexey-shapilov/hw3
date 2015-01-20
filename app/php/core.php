<?php
function getJs(){

    if (isset($_POST['paddingLeft'])  AND isset($_POST['paddingTop']) AND  isset($_POST['opacity'])){

        $_SESSION["paddingLeft"] = $_POST['paddingLeft'];
        $_SESSION["paddingTop"] = $_POST['paddingTop'];
        $_SESSION["opacity"] = $_POST['opacity'];
    }
    else {

    }

}// данные из js

function watermarkCreate($stampPaddingLeft, $stampPaddingTop, $stampOpacity){

    $stampPaddingLeft = $_SESSION["paddingLeft"];//отступ снизу
    $stampPaddingTop = $_SESSION["paddingTop"];//отступ сверху
    $stampOpacity = $_SESSION["opacity"]; // прозрачность в процентах

    $mainImage = "tmp/$userDir/main.jpg";//картинка фона
    $stampImage = "tmp/$userDir/stamp.jpeg";//картинка водного знака
    $watermark = "tmp/$userDir/watermark.png";//картинка после наложения

    $image = imagecreatefromjpeg($mainImage); /* todo  imagecreatefrom должна быть зависима от типа файлов*/
    $stamp = imagecreatefromjpeg($stampImage);/* todo  imagecreatefrom должна быть зависима от типа файлов*/
    $stampWidth = imagesx($stamp);
    $stampHeight = imagesy($stamp);


    imagecopymerge( $image, $stamp, $stampPaddingLeft, $stampPaddingTop, 0, 0, $stampWidth, $stampHeight, $stampOpacity);// Слияние штампа с фотографией.
    imagepng($image, 'img/watermark.png');// Сохранение фотографии в файл
    imagedestroy($image); //освобождение памяти
} //создаёт водный знак (готово 80%)

function createTempDir (){
    //  todo    создание временной папки {создаёт дирректорию с именем сессии}
}   //в разработке

function fileUpload(){
    //  todo    загрузка  файлов на сервер  во времнную папку {true if success}
}       //в разработке

function fileDownload(){
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
    $image = imagecreatefromjpeg($image);/* todo  imagecreatefrom должна быть зависима от типа файлов*/
    $oldWidth = imagesx($image);
    $oldHeight = imagesy($image);
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $oldWidth, $oldHeight);
    $image = $newImage;
    imagepng($image, 'img/resized.png');// Сохранение фотографии в файл
    imagedestroy($image); //освобождение памяти
}  //изменяет размер изображения (готово 80%)