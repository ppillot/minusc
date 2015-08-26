/**
 * @author paul pillot
 */
aideFormule = "formule.html";

function actualise_pourcentages() {
	f = document.forms['tableau_elements'];
	//calculs de la masse, du volume, de la charge totale et de l'hydratation
	var m = 0, v = 0, c = 0, h = 0;
	for ( i = 0; i < atoms.length; i++) {
		/*if (typeof(f.elements[atoms[i].symbol+'_6'].value)=='undefined') continue;
		 nb = parseFloat(f.elements[atoms[i].symbol+'_6'].value);
		 m += (isNaN(nb))? 0 : nb;/**/
		m += atoms[i].masseTotale;
		v += atoms[i].volumeTotal;
		c += atoms[i].chargeTotale;
		h += (atoms[i].symbol == "H") ? atoms[i].nbTotal : 0;
	}
	//console.log(m,v,c,h)
	
	//calcul de la masse volumique
	var mv = m / (volume * no_avogadro * Math.pow(10, -24));
	mv = Math.round(mv * 1000) / 1000;
	$('#masse_volumique').text(mv);

	//calcul du pourcentage représentatif de chaque élément
	for ( i = 0; i < atoms.length; i++) {
		var pourcent = Math.round(atoms[i].masseTotale / m * 100);
		var txt = (isNaN(pourcent)) ? '' : pourcent;
		f.elements[atoms[i].symbol + '_7'].value = txt;
	}

	//calcul de la compacité
	var compacite = v / volume;
	compacite = Math.round(compacite * 10000) / 100;
	$('#compacite').text(compacite);

	//calcul de la charge nette
	//console.log('charge nette: ' + c);

	//calcul du % d'hydratation
	var hydratation = h * (masses_atomiques['H'] + masses_atomiques['O']) / m
	hydratation = Math.round(hydratation * 10000) / 100;
	$('#hydratation').text(hydratation);

}

function remplissage_automatique() {
	var spt = "'['+";

	for (var i = 0, l = atoms.length; i < l; i++) {
		spt += "'{\"I\":'+{_" + atoms[i].symbol + " and interieur}.count+',\"F\":'+{_" + atoms[i].symbol + " and faces}.count+',\"A\":'+{_" + atoms[i].symbol + " and aretes}.count+',\"S\":'+{_" + atoms[i].symbol + " and sommets}.count+'},'+";
	}
	var r = Jmol.evaluate(minusc, spt.slice(0, -3) + "'+']'");
	var nb_a = JSON.parse(r);
	
	var f = document.forms['tableau_elements'];
	var maille = [0,"I","F","A","S"];
	for (var i=0, imax=nb_a.length;i<imax;i++){
		var elt = atoms[i].symbol;
		for (var j=1; j<5; j++){
			e = f.elements[elt+ '_' + j];
			e.value = nb_a[i][maille[j]]
		}
		actualise_total(i);
	}
}

function actualise_total(atomsNum) {
	var elt = atoms[atomsNum].symbol;
	var rayon = atoms[atomsNum].ionic;
	var f = document.forms['tableau_elements'];
	var total = 0;
	for ( i = 1; i < 5; i++) {
		var e = f.elements[elt + '_' + i];
		if (isNaN(e.value)) {
			alert('Vous ne devez taper que des nombres !');
			e.value = '';
			e.focus();
		}
		if (e.value != '')
			total += parseInt(e.value) / (Math.pow(2, i - 1));
	}
	total = total * atoms[atomsNum].occupancy;
	atoms[atomsNum].masseTotale = total * masses_atomiques[elt];
	atoms[atomsNum].volumeTotal = total * (4 / 3 * Math.PI * Math.pow(rayon, 3))
	atoms[atomsNum].chargeTotale = total * atoms[atomsNum].charge;
	atoms[atomsNum].nbTotal = total

	f.elements[elt + '_5'].value = total;
	f.elements[elt + '_6'].value = atoms[atomsNum].masseTotale;
	actualise_pourcentages();
}

precedent_atome_cherche = "0";
function actualise_affichage_maille(num, sym) {
	function capitalize(txt){
		var p,d
		p = txt[0].toUpperCase();
		d = (txt[1] || '').toLowerCase();
		return p+d;
	}
	
	var nom_atome_cherche = num + sym;
	if (precedent_atome_cherche == nom_atome_cherche)
		return;
	else
		precedent_atome_cherche = nom_atome_cherche;
	var spt = "";
	switch(num) {
		case 1:
			spt = "interieur";
			break;
		case 2:
			spt = "faces";
			break;
		case 3:
			spt = "aretes";
			break;
		case 4:
			spt = "sommets";
			break;
	}
	var spt2 = " and element=\"" + capitalize(sym) + "\"";
	executer("select all; halos off; set echo compteur; echo ; display " + spt + spt2);

}

var is_mode_formule = false;

function pointeur(applet, token) {
	var atom_ref = parseInt(token.substring(token.indexOf("#") + 1));
	var spt = "select @" + atom_ref + "; if ({selected}.halos=0); halos on; color halos gold; else; halos off; endif; select all; set echo compteur; a = 'Compteur : ' + {halos!=0}.count; echo @a";
	
	executer(spt);
}

function mode_formule(off) {
	var spt = "";
	if (off) {
		spt = "select all; halos off; display cell={1 1 1}; set pickcallback 'messagesClics'; set echo compteur; echo ;"
		initialiser_menu_mailles(false);
		$("#activer_mailles").css('display','none');
		activer_panneau('controle');
		aide('demarrage.html');
		pan_commande.plans.set(0);
		precedent_atome_cherche = "0";
		is_mode_formule = false;
	} else {
		aide(aideFormule);
		//test d'entrée
		if (!is_mode_formule) {
			is_mode_formule = true;

			//limite affichage maille centrale
			spt = "restrict none; select all; wireframe 0.15; cpk 20%; display cell={1 1 1}; set pickcallback 'pointeur'; set echo compteur 100% 0; set echo compteur right; zoomto 0.6 {displayed};"

			//actualiser les valeurs des menus déroulants controlant les mailles
			initialiser_menu_mailles(true);

			//affiche bouton de rétablissement des mailles
			$("#activer_mailles").css('display','inline');

			//actualiser liste atomes du tableau
			var a = document.getElementById('liste_elements');
			while (a.rows.length > 0)
			a.deleteRow(a.rows.length - 1);
			//alert(atoms.length);

			for ( i = 0; i < atoms.length; i++) {
				if (atoms[i] == '')
					continue;
				var ligne = a.insertRow(i);
				var cellule = ligne.insertCell(0);
				cellule.innerHTML = "<div class='symbole_atome' title='Rayon ionique : " + atoms[i].ionic + " Å'><span class='" + atoms[i].symbol.toLowerCase() + "'> " + atoms[i].symbol + "<sup>" + atoms[i].txtCharge + "</sup> </span></div>";
				//cellule.style.className = atoms[i].toLowerCase();
				cellule.style.backgroundColor = '#eee';

				for ( j = 1; j < 8; j++) {
					var t = "<input type='text' length='2' size='2' name='" + atoms[i].symbol + "_" + j + "'";
					if (j < 5) {
						t += " onFocus='actualise_affichage_maille(" + j + ",\"" + atoms[i].symbol + "\")' onChange='actualise_total(" + i + ")'/>";
					} else {
						t += " disabled />"
					}
					ligne.insertCell(j).innerHTML = t;
				}
			}

			//effacer la valeur de la masse volumique
			$('#masse_volumique').text(0);
			$('#compacite').text(0);
			$('#hydratation').text(0);
			
			//actualiser liste atomes du tableau caracteristiques
			var a = document.getElementById('liste_caracteristiques_elements');
			while (a.rows.length > 0)
			a.deleteRow(a.rows.length - 1);

			for ( i = 0; i < atoms.length; i++) {
				if (atoms[i] == '')
					continue;
				var ligne = a.insertRow(i);
				var cellule = ligne.insertCell(0);
				cellule.innerHTML = "<div class='symbole_atome'><span class='" + atoms[i].symbol.toLowerCase() + "'> " + atoms[i].symbol + "</span></div>";
				//cellule.style.className = atoms[i].toLowerCase();
				cellule.style.backgroundColor = '#eee';
				
				cellule = ligne.insertCell(1);
				cellule.innerHTML = atoms[i].txtCharge;
				
				cellule = ligne.insertCell(2);
				cellule.innerHTML = atoms[i].ionic;
				
				cellule = ligne.insertCell(3);
				cellule.innerHTML = masses_atomiques[ atoms[i].symbol ]
			}

			//alert(txt);
			//document.getElementById('liste_elements').innerHTML = txt;
			//definir les différentes parties de la maille
			interieur = "define interieur (cell={1 1 1} and not (";
			faces = "define face (cell={1 1 1} and not (interieur, ";
			sommets = "define sommets (cell={1 1 1} and (";
			aretes = "define aretes (cell={1 1 1} and (";

			for ( i = 0; i < 3; i++) {
				for ( j = 0; j < 3; j++) {
					for (var k = 0; k < 3; k++) {
						var cell = "cell={" + i + " " + j + " " + k + "},";
						if ((i == 1) && (j == 1) && (k == 1))
							continue;
						interieur += cell;
						a = (i == 1) ? 1 : 0;
						b = (j == 1) ? 1 : 0;
						c = (k == 1) ? 1 : 0;
						tot = a + b + c;
						if (tot != 2)
							faces += cell;
						if (tot == 0)
							sommets += cell;
						if (tot == 1)
							aretes += cell;
					};
				}
			}
			interieur = interieur.slice(0, -1) + ")); ";
			faces = faces.slice(0, -1) + ")); ";
			aretes = aretes.slice(0, -1) + ") and not sommets); ";
			sommets = sommets.slice(0, -1) + ")); ";

			spt += interieur + faces + sommets + aretes;
		}
	}

	//console.log(spt);
	executer(spt);

}

//test
function nb_atomes_maille() {
	cmd = "define maille (cell={2 2 2} and not (cell={1 2 2} or cell={1 1 2} or cell={1 3 2} or cell={2 3 2} or cell={3 3 2} or cell={1 1 3} or cell={1 2 3} or cell={1 3 3} or cell={2 1 3} or cell={2 2 3} or cell={2 3 3} or cell={3 1 3} or cell={3 2 3} or cell={3 3 3}));";
	cmd += "select maille and silicon; select maille and oxygen;";
	console.log(Jmol.scriptWaitAsArray(minusc, cmd));
}