<?php
/*
 * Détermination du nom du fichier
 * id session + nº image
 */
$_SESSION['snapshot_n'] = isset($_SESSION['snapshot_n'])? $_SESSION['snapshot_n']+1 : 1; 
$file_name = session_id().$_SESSION['snapshot_n'].".jpg";

/*
 * Création de l'image miniature, stockage en session des données pour l'image originale
 */ 
$data = base64_decode($_POST['data']);

$im = imagecreatefromstring($data);
if ($im !== false) {
    $h = imagesy($im);
	$w = imagesx($im);
	$thumb = imagecreatetruecolor(100, 100);
	imagecopyresampled($thumb,$im,0,0,0,0,100,100,$w,$h);
	imagejpeg($thumb,SNAPSHOT_TMP_PATH.$file_name);

	//stockage en session des données 
	$_SESSION['snapshot'][$_SESSION['snapshot_n']]= array('data' => $data, 'spt' => $_POST['spt'], 'file_name' => SNAPSHOT_TMP_PATH.$file_name);
	
/*
 * Renvoi de la réponse à la page
 */
	
    echo "www/".SNAPSHOT_TMP_PATH.$file_name;
}
else {
    echo 'An error occurred.';
}   
?>
