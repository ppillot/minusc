<?php
    /*
     *recherche tous les modèles du dossier post- dossier_id 
     */
	$dossier_id = isset($_POST['dossier_id'])? $_POST['dossier_id'] : 1;
	
	$sql = $db->prepare("SELECT s.snapshot_id FROM snapshots_folders AS sf INNER JOIN snapshots  AS s ON sf.snapshot_id=s.snapshot_id where folder_id=?");
	$sql->execute(array($dossier_id));
	
	$result =",";
	while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
		$result .= 'www/'.SNAPSHOT_THUMB_PATH.$row['snapshot_id'].'.jpg@'.$row['snapshot_id'].',';
	}
	
	echo trim($result,',');
	
?>
