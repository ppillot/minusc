<!DOCTYPE html>
<html lang="fr">
<head>

  <meta content="text/html; charset=UTF-8" http-equiv="content-type">
  <title>MinUSc - Accueil</title>
<link rel="shortcut icon" href="favicon.ico">
<script>
  	if (document.location.search.length>0){
  		var h=document.location.href;
  		h = h.substr(0,h.lastIndexOf("/")+1)
  		h+="app/minusc.htm"+document.location.search;
  		document.location.href=h;
  	}
  </script>

  <style type="text/css">
  .start { border-style: hidden;
    border-width: 1px;
    font-family: Arial,Helvetica,sans-serif;
    font-size: 16px;
    font-weight: bold;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    text-align: center;
    text-decoration: none;
    color: rgb(102, 51, 51);
    background-color: rgb(221, 221, 221);
    }

  body {
  	background-color: #fff;
    font-family: Arial,Helvetica,sans-serif;
  }
  
  #conteneur { border: 1px solid rgb(153, 153, 153);
    margin: 10% auto auto;
    padding: 0px;
    width: 400px;
    color: rgb(51, 51, 51);
font-weight:normal;
	font-size: 14px;
    }

  h1 { text-align: center;
  	margin: 0px;
    padding-top: 10px;
    background-image: url(app/images/polyhedre.gif);
    background-repeat: no-repeat;
    background-color: rgb(0, 0, 0);
    background-position: left top;
    color: rgb(255, 204, 102);
    }

  h2 { text-align: center;
    font-weight: bold;
    font-size: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: rgb(153, 102, 51);
    }
  h3 {
  	clear: both;
 	text-align: left;
	font-weight: bold;
	color: #963;
	padding: 5px 0px 0px 0px;
	margin: 10px 0px 0px 0px;
  }
  a.start { border: 1px solid rgb(204, 204, 204);
    text-decoration: none;
    background-color: rgb(238, 238, 238);
    padding-top: 5px;
    padding-bottom: 5px;
    color: rgb(102, 51, 0);
    }
img {
	border: none;
}
  a { text-decoration: none;
    color: rgb(153, 102, 51);
    }

  a:hover { text-decoration: underline;
    color: rgb(153, 0, 0);
    }

  a.start:hover { border-color: rgb(153, 153, 153);
    text-decoration: none;
    background-color: rgb(204, 204, 204);
    color: rgb(153, 51, 0);
    }
.download {
	background-image: url(app/images/zip.gif);
	background-repeat: no-repeat;
	padding-left: 20px;
}
#license,#credits {
	display: block;
	font-size: 12px;
	margin: 20px auto 0px auto;
	width: 400px;
	text-align: left;
}
#credits {
	margin-top: 0px;
}
.logos {
	float:left;
}
  </style>
</head>
<body>
<div id="conteneur">
<h1>MinUSc</h1>


<h2>Visualisation de Min&eacute;raux &agrave; Usage
scolaire</h2>

<a class="start" href="app/minusc.htm">
	<img alt="D&eacute;marrer MinUSc" src="app/images/quartz.png"><br>

D&eacute;marrer MinUSc</a><br>
Option : <a href="app/minusc.htm?tableau=0">Démarrer MinUSc sans le calcul automatique de la formule</a>
<br/>
<br>
Version : 1.7 - Novembre 2018 - <a href="http://www.librairiedemolecules.education.fr/aide.php?sujet=minusc">Documentation</a> 
<br>


Auteur : <a href="mailto:paul.pillot.a.libmol.org">Paul
Pillot</a> - Montréal<br>

</div>
<br>
<div id="license"><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.0/fr/"><img alt="Creative Commons License" style="border-width:0; float:left; padding: 2px;" src="http://i.creativecommons.org/l/by-nc-sa/2.0/fr/88x31.png" /></a>Cette application est mise à disposition sous un <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.0/fr/">contrat Creative Commons</a>.
</div>
<br />
<div id="credits">
	<h3>Ressources</h3>
		<a href="http://www.jmol.org"><img src="app/images/jsmol_logo.png" alt="Jmol" /></a>
		<a href="http://www.crystallography.net"><img src="app/images/codsmall.jpg" alt="Crystallography Open Database" /></a>
		<br/>Modèles cristallographiques d'après Crystallography Open Database
</div>
</body>
</html>
<?php
//compteur de visites

define("_BBC_PAGE_NAME", "MinUSc");

define("_BBCLONE_DIR", "../../statistiques/");

define("COUNTER", _BBCLONE_DIR."mark_page.php");

if (is_readable(COUNTER)) include_once(COUNTER);



?>
