<?php
    /*
     * copie dans la table image les infos de l'image correspondante à la galerie
     * insère dans la table dossier les références de l'image
     */
	$image = $_SESSION['snapshot'][$_POST['id']];
	
	$sql = $db->prepare("INSERT INTO snapshots (snapshot_spt) VALUES (?)");
	$sql->execute(array($image['spt']));
	$snapshot_id = $db->lastInsertId();
	
	$sql = $db->prepare("INSERT INTO snapshots_folders (folder_id, snapshot_id) VALUES (? , ?)");
	$sql->execute(array(1,$snapshot_id));
	
	/*
	 * sauvegarde les images correspondantes
	 */
	$im = imagecreatefromstring($image['data']);
	imagejpeg($im,SNAPSHOT_FULL_PATH."$snapshot_id.jpg");
	copy($image['file_name'],SNAPSHOT_THUMB_PATH."$snapshot_id.jpg");
	
?>
