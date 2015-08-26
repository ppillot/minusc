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
echo "coucou" ?>
