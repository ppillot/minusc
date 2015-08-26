<?php
ob_start();
/*
 *  démarrage session
 */
session_start();

/*
 * connexion à la base de données
 */

$db = new PDO('sqlite:minusc.sqlite');
/*
if (isset($_COOKIE['user_id'])&&isset($_COOKIE['password'])) {
	// verification de l'authenticité de l'utilisateur
	 
	$user_id = $_COOKIE['user_id'];
} else {
	// pas de cookie pour identifier l'utilisateur. On crée un identifiant provisoire
	 
	$result = $db->query('INSERT INTO users (user_name,) VALUES ()');
	$count = $result->fetch(PDO::FETCH_ASSOC);
	echo $count['nb'];
}//*/
/*
 * definition des constantes
 */
define ('SNAPSHOT_TMP_PATH', "img/temp/");
define ('SNAPSHOT_FULL_PATH', "img/full/");
define ('SNAPSHOT_THUMB_PATH', "img/thumb/");
/*
 * Controleur
 */
 switch ($_POST['action']) {
 	case 'cliche':
		include('inc/cliche.php');
		break;
	case 'galerie':
		include('inc/galerie.php');
		break;
	case 'transfert_galerie_dossier':
		include('inc/tr_gal_dos.php');
		break;
	case 'transfert_dossier_galerie':
		include('inc/tr_dos_gal.php');
		break;
	case 'contenu_dossier':
		include('inc/contenu_dossier.php');
		break;
	case 'supprimer':
		include('inc/supprimer.php');
		break;
	case 'importation':
		include('inc/importation.php');
		break;
	default:
		echo "erreur";
 } 

?>
