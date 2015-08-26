<?php
    /*
     * copie dans la variable de session les infos correspondant à l'image du dossier sélectionnée
     * 
     */
	$_SESSION['snapshot_n']++;
	
	//recuperation des infos concernant l'image en bdd
	
	$sql = $db->prepare("SELECT * FROM snapshots WHERE snapshot_id =?");
	$sql->execute(array($_POST['id']));
	$result = $sql->fetch(PDO::FETCH_ASSOC);
	
	//transfert des infos dans la variable de session
	//stockage en session des données 
	$file_name=SNAPSHOT_THUMB_PATH.$_POST['id'].'.jpg';
	$_SESSION['snapshot'][$_SESSION['snapshot_n']]= array('snapshot_id'=>$_POST['id'],
															'data' => '', 
															'spt' => stripslashes($result['snapshot_spt']), 
															'file_name' => $file_name);
	
	//retour
	echo $_SESSION['snapshot_n'];
?>
