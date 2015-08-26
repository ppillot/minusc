var fichiers=[
"silicates",
" tectosilicates",
"  quartz|sio2.cif",
" phyllosilicates",
"  muscovite|muscovite.cif"];
//alert(fichiers);
function tree() {
  nivprec = 0;
  nivouv = new Array('liste_fichiers');
  for (i=0; i<fichiers.length; i++) {
    //niveau
    niv = 1;
    while (fichiers[i].charAt(0)==' ') {
      niv++;
      fichiers[i] = fichiers[i].substr(1);
    }
    fichier = fichiers[i].split('|');
    isdossier = (fichier.length==1);

    if (isdossier) {
      nom_dossier = "dossier_"+i+"_contenu";
      //creation element
      var contenu = document.createElement("div");
      var identifiant = document.createAttribute("id");
      identifiant.nodeValue = nom_dossier;
      contenu.setAttributeNode(identifiant);

      //recherche du noeud pere
      if (niv>nivprec) {
        //on rajoute un enfant au dernier niveau ouvert
        nivouv[nivouv.length] = nom_dossier;
      } else if (niv==nivprec) {
        nivouv[niv] = nom_dossier;
      } else if (niv<nivprec) {  //on ferme le/les dossiers précédents
        nivouv.length=niv+1;
        nivouv[niv] = nom_dossier;
      }
      pere = nivouv[nivouv.length-2];

    } else {
      //creation element
      var id_lien = 'a_'+i;
      var contenu = document.createElement("a");
      
      var identifiant = document.createAttribute("id");
      identifiant.nodeValue = id_lien;
      contenu.setAttributeNode(identifiant);
      var lien = document.createAttribute("href");
      lien.nodeValue = "#";
      contenu.setAttributeNode(lien);
      var clic = document.createAttribute("onclick");
      clic.nodeValue = "charger_bdd('"+fichier[1]+"')";
      contenu.setAttributeNode(clic);
      
      

      //recherche du noeud pere
      pere = nivouv[niv-1];
    }
 
    //attribution de l'element au noeud pere
    noeud = document.getElementById(pere);
    noeud.appendChild(contenu);

    

    nivprec = niv;
  }
}
function expand(objet) {
	retour = true;

	id = objet.attributes['id'].value.substring(2);
	dossier = document.getElementById("dossier_"+id);
	if (dossier.hasChildNodes()) { 
		if (contenu = document.getElementById("dossier_"+id+"_contenu")) {
			contenu.style.display = 'block';
			image = document.getElementById("image_"+id);
			image.src = "images/minus.gif";
			a = document.getElementById("a_"+id);
			a.onclick = "return(collapse('"+id+"'))";
			retour = false;
		} else {
			var contenu = document.createElement("div");
			var identifiant = document.createAttribute("id");
				identifiant.nodeValue = "dossier_"+id+"_contenu";
				contenu.setAttributeNode(identifiant);
			dossier.appendChild(contenu);
			
			var url = 'rechajax.php';
			var pars = 'typeclassification=chimique&idcat='+id;
			var myAjax = new Ajax.Updater("dossier_"+id+"_contenu", url, {method: 'get', parameters: pars});
			
			image = document.getElementById("image_"+id);
			image.src = "images/minus.gif";
			a = document.getElementById("a_"+id);
			a.onclick = function () {return(collapse(this))};
			
			retour = false;
		}
	}
	return retour;
}
function collapse(objet) {
	retour = true;
	id = objet.attributes['id'].value.substring(2);
	
	dossier = document.getElementById("dossier_"+id);
	if (dossier.hasChildNodes()) { 
		if (contenu = document.getElementById("dossier_"+id+"_contenu")) {
			
			contenu.style.display = 'none';
			image = document.getElementById("image_"+id);
			image.src = "images/plus.gif";
			a = document.getElementById("a_"+id);
			a.onclick = function () {return(expand(this))};
			retour = false;
		}
	}
	return retour;
}
