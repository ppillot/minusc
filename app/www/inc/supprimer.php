<?php
    /*
     * suppression des vignettes
     * id commence par g -> suppression de la session
     * id commence par co -> suppression du dossier
     */
	$id = trim($_POST['id']);
	if(strpos($id,'co')===0) {
		//base de données
		$snapshot_id = substr($id,2);
		$sql = $db->prepare("DELETE FROM snapshots WHERE snapshot_id = ?");
		$sql->execute(array($snapshot_id));
		
		$sql = $db->prepare("DELETE FROM snapshots_folders WHERE snapshot_id = ?");
		$sql->execute(array($snapshot_id));
		
		//fichiers
		unlink(SNAPSHOT_THUMB_PATH.$snapshot_id.'.jpg');
		unlink(SNAPSHOT_FULL_PATH.$snapshot_id.'.jpg');
		echo "bdd";
	} elseif (strpos($id,'g')===0) {
		$snapshot_id = substr($id,1);
		//fichier
		//unlink(SNAPSHOT_TMP_PATH.$_SESSION['snapshot'][$snapshot_id]['file_name']);
		//variable de session
		unset($_SESSION['snapshot'][$snapshot_id]);
		echo"session";
	} else echo strstr($id,'g');
?>
