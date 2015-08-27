/*
 * interface utilisateur de MinUSc
 */

function Imh() {
    this.panneau = {
        'hide': function (nom) {
            $('#' + nom).css('marginLeft', '-2000px');
        },
        'show': function (nom, l) {
            l = (arguments.length > 1) ? l : '0';
            $('#' + nom).css('marginLeft', l + 'px');
        }
    };
    this.galerie = {
        'state': 0,
        'toggle': function () {
            if (this.state === 0) {
                this.state = 1;
                $('#galerie').css('marginLeft', '3pt');
            } else {
                this.state = 0;
                $('#galerie').css('marginLeft', '-2000pt');
            }
        },
        'kill': function (num) {
            var noeud = $('#thumbnails').childNodes[num];
            $('#thumbnails').removeChild(noeud);
        }
    };
    this.reglages = {
        'visibility': {
            'state': 0,
            'toggle': function () {
                if (this.state === 0) {
                    this.state = 1;
                    $('#reglages').css({
                        'visibility': 'visible',
                        'margin-left': '0px'
                    });
                    $('#aide').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                    $('#commande').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                } else {
                    this.state = 0;
                    $('#reglages').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                    $('#aide').css({
                        'visibility': 'visible',
                        'margin-left': '0px'
                    });
                }
            }
        },
        'setQuality': function (num) {
            var spt = "";
            spt += (num > 7) ? "set antialiasdisplay true;" : "set antialiasdisplay false;";
            spt += (num > 4) ? "set zshade on;" : "set zshade off;";
            spt += "set platformspeed " + num;
            executer(spt);
        },
        'changeDisplay': function () {

        }
    };
    this.ligne_commande = {
        'liste': [''],
        'indice': 0,
        'visibility': {
            'state': 0,
            'toggle': function () {
                if (this.state === 0) {
                    this.state = 1;
                    $('#commande').css({
                        'visibility': 'visible',
                        'margin-left': '0px'
                    });
                    $('#aide').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                    $('#reglages').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                    document.f_commande.ligne_commande.focus();
                } else {
                    this.state = 0;
                    $('#commande').css({
                        'visibility': 'hidden',
                        'margin-left': '2000px'
                    });
                    $('#aide').css({
                        'visibility': 'visible',
                        'margin-left': '0px'
                    });
                }
            }
        },
        'undo': function () {
            if (this.indice === 0) {
                return;
            }
            this.afficher(this.liste[this.indice]);
            this.indice -= 1;
        },
        'redo': function () {
            if (this.indice + 1 >= this.liste.length) {
                return;
            }
            this.indice += 1;
            this.afficher(this.liste[this.indice]);
        },
        'afficher': function (txt) {
            document.f_commande.ligne_commande.value = txt;
            document.f_commande.ligne_commande.select();
        },
        'ajouter': function (spt) {
            if (this.liste.length > this.indice + 1)
                this.liste.length = this.indice + 1;
            this.indice += 1;
            this.liste[this.indice] = spt;
        },
        'executer': function (spt) {
            //this.ajouter(spt);
            executer(spt);
            $('#ligne_commande').value = '';
        }
    };
    this.halos = {
        'value': false,
        'toggle': toggle,
        'command': {
            'on': 'selectionHalos on;',
            'off': 'selectionHalos off'
        }
    };
    this.unitcell = {
        'value': true,
        'toggle': toggle,
        'command': {
            'on': 'set unitcell dotted; set axes 3;',
            'off': 'unitcell off; axes off;'
        }
    };
    this.plans = {
        'value': 0,
        'set': function (val) {
            var spt = '';

            this.value = val ^ this.value & val; //permutte 0, 1 et 2 ; annule si 1 et 1 ou 2 et 2

            spt = this.command[this.value];
            executer(spt);
        },
        //0 : off
        //1 : plans intérieurs
        //2 : plans extérieurs
        'command': ['draw pl1 off; draw pl2 off; draw pl3 off; draw pl4 off; draw pl5 off; draw pl6 off;',
								'draw pl1 off; draw pl2 off; draw pl3 off; draw pl4 off; draw pl5 off; draw pl6 off; draw pl1 plane {0 0 0/1} {1 0 0/1} {1/2 1 0}; draw pl2 plane {0 0 0/1} {0 1 0/1} {0 1/2 1}; draw pl3 plane {0 0 0/1} {0 0 1/1} {1 0 1/2}; color $pl1 dodgerblue translucent 0.2; color $pl2 dodgerblue translucent 0.2; color $pl3 dodgerblue translucent 0.2;',
								'draw pl1 plane {0 0 0/1} {1 0 0/1} {1/2 1 0/1}; draw pl2 plane {0 0 0/1} {0 1 0/1} {0 1/2 1/1}; draw pl3 plane {0 0 0/1} {0 0 1/1} {1 0 1/2}; draw pl4 plane {1 1 1/1} {1 1 0/1} {0 1 1/2}; draw pl5 plane {1 1 1/1} {0 1 1/1} {1/2 0 1}; draw pl6 plane {1 1 1/1} {1 0 1/1} {1 1/2 0}; color $pl1 dodgerblue translucent 0.2; color $pl2 dodgerblue translucent 0.2; color $pl3 dodgerblue translucent 0.2; color $pl4 dodgerblue translucent 0.2; color $pl5 dodgerblue translucent 0.2; color $pl6 dodgerblue translucent 0.2']
    };
    this.plansInterieurs = {
        'value': false,
        'toggle': toggle,
        'command': {
            'on': ' draw pl1 off; draw pl2 off; draw pl3 off; draw pl4 off; draw pl5 off; draw pl6 off; draw pl1 plane {2 2 2/1} {3 2 2/1} {5/2 3 2/1}; draw pl2 plane {2 2 2/1} {2 3 2/1} {2 5/2 3/1}; draw pl3 plane {2 2 2/1} {2 2 3/1} {3 2 5/2}; color $pl1 dodgerblue translucent 0.2; color $pl2 dodgerblue translucent 0.2; color $pl3 dodgerblue translucent 0.2;',
            'off': 'draw pl1 off; draw pl2 off; draw pl3 off; draw pl4 off; draw pl5 off; draw pl6 off;'
        }
    };
    this.plansExterieurs = {
        'value': false,
        'toggle': toggle,
        'command': {
            'on': 'draw pl1 plane {2 2 2/1} {3 2 2/1} {5/2 3 2/1}; draw pl2 plane {2 2 2/1} {2 3 2/1} {2 5/2 3/1}; draw pl3 plane {2 2 2/1} {2 2 3/1} {3 2 5/2}; draw pl4 plane {3 3 3/1} {3 3 2/1} {2 3 5/2}; draw pl5 plane {3 3 3/1} {2 3 3/1} {5/2 2 3}; draw pl6 plane {3 3 3/1} {3 2 3/1} {3 5/2 2}; color $pl1 dodgerblue translucent 0.2; color $pl2 dodgerblue translucent 0.2; color $pl3 dodgerblue translucent 0.2; color $pl4 dodgerblue translucent 0.2; color $pl5 dodgerblue translucent 0.2; color $pl6 dodgerblue translucent 0.2',
            'off': 'draw pl1 off; draw pl2 off; draw pl3 off; draw pl4 off; draw pl5 off; draw pl6 off;'
        }
    };
    this.cache = {
        'value': true,
        'toggle': toggle,
        'command': {
            'on': 'display cell={1 1 1}',
            'off': 'display all'
        }
    };
    this.picking = {
        'value': true,
        'toggle_proxy': toggle,
        'toggle': function () {
            this.toggle_proxy();
            if (!this.value)
                pan_commande.halos.value = true;
        },
        'command': {
            'on': 'set picking; selectionHalos off',
            'off': 'set picking select atom; selectionHalos on'
        }
    };
    this.commandes = {
        'cpk_ionic': {
            'script': 'sphere()', //if (({*}.charge.max==0)&&({*}.charge.min==0)); cpk; else; cpk ionic; end if;',
            'aide': 'rayon_ionique.html',
            'run': run
        },
        'cpk_20': {
            'script': 'cpk 20%;',
            'aide': 'rayon_20.html',
            'run': run
        },
        'cpk_off': {
            'script': 'cpk off;',
            'aide': 'rayon_0.html',
            'run': run
        },
        'baton': {
            'script': 'wireframe 0.15;',
            'aide': 'liaison_baton.html',
            'run': run
        },
        'fdf': {
            'script': 'wireframe;',
            'aide': 'liaison_fdf.html',
            'run': run
        },
        'baton_off': {
            'script': 'wireframe off',
            'aide': 'liaison_0.html',
            'run': run
        },
        'polyhedra': {
            'script': 'if ({not selected}.size>0); polyhedra bonds (selected) noedges; else; polyhedra bonds (selected and charge>=0) noedges; endif; color polyhedra opaque;',
            'aide': 'polyhedre.html',
            'run': run
        },
        'polyhedra_translucent': {
            'script': 'if ({not selected}.size>0); polyhedra bonds (selected) noedges; else; polyhedra bonds (selected and charge>=0) noedges; endif; color polyhedra translucent;',
            'aide': 'polyhedre.html',
            'run': run
        },
        'polyhedra_collapsed': {
            'script': 'if ({not selected}.size>0); polyhedra bonds (selected) collapsed faceCenterOffSet=0.0 edges; else; polyhedra bonds (selected and charge>=0) collapsed faceCenterOffSet=0.0 edges; endif; color polyhedra opaque;',
            'aide': 'polyhedre.html',
            'run': run
        },
        'polyhedra_off': {
            'script': 'polyhedra off;',
            'aide': 'polyhedre_0.html',
            'run': run
        },
        'halos': {
            'script': 'if (selectionHalos); set selectionHalos off; else; set selectionHalos on; endif;',
            'aide': 'halos.html',
            'run': run
        },
        'axes': {
            'script': 'if (showAxes); axes off; unitcell off; else; set axes 3; set unitcell dotted; endif;',
            'aide': 'axes.html',
            'run': run
        },
        'charges': {
            'script': 'if ({*}[0].label.size=0); label %[charge]; else; label off; endif;',
            'aide': 'charges.html',
            'run': run
        },
        'picking': {
            'script': 'if (picking="atom"); set picking; set selectionHalos off; else; set picking select atom; set selectionHalos on; endif;',
            'aide': 'picking.html',
            'run': run
        },
        'navigate': {
            'script': 'if (navigationperiodic); restore state nav; else; save state nav; set navigationmode on; set navigationperiodic true; set navigationspeed 100; set showNavigationPointAlways; display all; axes off; unitcell off; endif;',
            'aide': 'navigate.html',
            'run': run
        },
        'fond': {
            'script': 'if (backgroundcolor="[x000000]"); background white; else; background black; endif;',
            'aide': 'fond.html',
            'run': run
        },
        'hbonds': {
            'script': 'calculate hbonds; hbonds on;',
            'aide': 'hbond.html',
            'run': run
        },
        'contact_vdw': {
            'script': '',
            'aide': 'contact.html',
            'run': run
        },
        'contact_connect': {
            'script': '',
            'aide': 'contact.html',
            'run': run
        },
        'contact_full': {
            'script': '',
            'aide': 'contact.html',
            'run': run
        },
        'contact_off': {
            'script': 'define contact_molecule none; select all; color translucent 0; contact off; javascript actualise_cell()',
            'aide': 'contact.html',
            'run': run
        }
    };
}

pan_commande = new Imh();

function actualise_legende(donnees) {
    var txt = '';

    for (i = 0; i < donnees.length; i++) {
        if (typeof (donnees[i].text) == 'undefined')
            break;
        else if (donnees[i].text == '|')
            txt += '<br>';
        else {
            txt += "<a href='javascript: executer(\"select " + donnees[i].script + "; flash\")' class='" + donnees[i].classe + "'>" + donnees[i].text + "</a><sup class='" + donnees[i].classe + "'>" + donnees[i].charge + "</sup>&nbsp; ";
        }
    }
    document.getElementById('liste_atomes').innerHTML = txt;
}

function activer_panneau(panneau) {
    panneaux = ['controle', 'fichier', 'formule'];
    for (i = 0; i < panneaux.length; i++) {
        if (panneau == panneaux[i])
            pan_commande.panneau.show(panneaux[i]);
        else
            pan_commande.panneau.hide(panneaux[i]);
    }
}

function actualise_liste_fichiers(query) {
    var listeFiltree = [],
        item = "",
        newLi = "";

    if (typeof (query) !== 'undefined' && query !== "") {
        reg = new RegExp(query, 'i');
        /*listeFiltree = liste_noms_mineraux.filter(function (val) {
            return (val.search(reg) >= 0);
        });
        */
        listeFiltree = (function(tabFichiers, quereg){
            var tabResultats = [];
            
            for (fileName in tabFichiers) {
                if (tabFichiers.hasOwnProperty(fileName)) {
                    if (fileName.search(quereg) >=0) {
                        tabResultats.push(fileName);
                    } else {
                        if (tabFichiers[fileName].hasOwnProperty('aliases')) {
                            if ( tabFichiers[fileName].aliases.toString().search(quereg) >=0 ) {
                                tabResultats.push(fileName);
                            }
                        }
                    }
                }
            }
            console.log(tabResultats);
            return tabResultats;
        }(liste_fichiers,reg));
    } else {
        listeFiltree = liste_noms_mineraux;
    }

    $("#liste_fichiers").empty();

    for (var i = 0; i < listeFiltree.length; i++) {
        item = listeFiltree[i];
        newLi = $('<li>' + item + '</li>')
            .on('click', {
                "file": item
            }, function (event) {
                charger_fichier(event.data.file);
            });

        $("#liste_fichiers").append(newLi);
    }

}

function actualise_cell() {
    i = document.cells.a.options[document.cells.a.selectedIndex].value;
    j = document.cells.b.options[document.cells.b.selectedIndex].value;
    k = document.cells.c.options[document.cells.c.selectedIndex].value;
    cellules = new Array();

    for (x = 0; x < i; x++) {
        if (i == 1)
            x = 1;
        for (y = 0; y < j; y++) {
            if (j == 1)
                y = 1;
            for (z = 0; z < k; z++) {
                if (k == 1)
                    z = 1;
                cellules[cellules.length] = "{" + (x + 0) + " " + (y + 0) + " " + (z + 0) + " " + "}";
            }
        }
    }

    spt = "display ";
    for (x in cellules) {
        if (typeof (cellules[x]) == 'string')
            spt += "cell=" + cellules[x] + " or "
    }
    spt += "none or contact_molecule; ";
    spt += "zoomto 0.6 {displayed} 100;";

    executer(spt);
}

function messagesClics(applet, txt) {
    console.log(txt)
    if (txt != '') {
        var messages = txt.split(' ');
        txt = messages[0] + " " + messages[1];
        document.getElementById('clic').innerHTML = txt;
    }
}

/*function actualise_nb_atomes(txt) {
    return;
    couche = document.getElementById('nb_atomes');
    if (txt > 1)
        fintexte = " atomes s&eacute;l&eacute;ctionn&eacute;s";
    else {
        fintexte = " atome s&eacute;lectionn&eacute;";
    }
    couche.innerHTML = txt + fintexte;
    couche.style.color = (txt == 0) ? "#f80" : "#fff";
}
/**/

legendes = {
    'cpk': [{
        'text': 'C',
        'script': 'carbon',
        'classe': 'c'
				}, {
        'text': 'H',
        'script': 'hydrogen',
        'classe': 'h'
				}, {
        'text': 'O',
        'script': 'oxygen',
        'classe': 'o'
				}, {
        'text': 'N',
        'script': 'nitrogen',
        'classe': 'n'
				}, {
        'text': 'S',
        'script': 'sulfur',
        'classe': 's'
				}, {
        'text': 'P',
        'script': 'phosphorus',
        'classe': 'p'
				}]
}

function toggle() {
    spt = '';
    this.value = !this.value;
    interrupteur = (this.value) ? 'on' : 'off';
    spt = this.command[interrupteur];
    executer(spt);
}

function run() {
    executer(this.script);
    aide(this.aide);
}

function aide(filename) {
    filename = "aide/" + filename;
    frames['f_aide'].location.href = filename;
}