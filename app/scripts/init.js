/*
* script d'initialisation de l'interface
*/

$(document).ready(function() {


/*
 * Initialisation de JsMol
 */
    initscript0 = "restrict none; select all; color cpk; spacefill 20%; wireframe 0.15; color selectionHalos none;" + "unitcell {1 1 1} dotted; display cell={1 1 1}; " + "set selectionHalos off; set axes 3; zoom 200; set zshade on; set zshadepower 2; function flash {set selectionhalos on; delay 0.3; set selectionhalos off}; ";

    //recherche si un nom de fichier à charger a été passé en paramètre, ou bien d'autres infos (exemple, mode maths)
    parametre = (function() {
        var p = {};

        function majuscule(str) {
            str = str.toLowerCase();
            str = str[0].toUpperCase() + str.substring(1);
            return str;
        }

        if ((document.location.search.indexOf("?") == 0) && (document.location.search.length > 1)) {
            var a = decodeURI(document.location.search.substring(1));
            if (a.indexOf("=") == -1) {
                p.file = majuscule(a)
            } else {

                var tab = a.split("&")
                for ( i = 0; i < tab.length; i++) {
                    if (tab[i].indexOf("=") == -1) {

                        p.file = majuscule(tab[i]);
                        continue;
                    }
                    var paramItem = tab[i].split("=")
                    p[paramItem[0]] = paramItem[1];
                }
            }
        }
        return p;
    })();

    nomFichier = ((liste_fichiers[parametre.file]) ? parametre.file : "Quartz");
    enlocal = ((document.location.href.indexOf('http') == 0)) ? '' : 'Signed';

    var Info = {
        addSelectionOptions : false,
        color : "#000000",
        debug : false,
        defaultModel : "",
        height : '100%',
        j2sPath : "j/j2s",
        memoryLimit : 512,
        readyFunction : null,
        script : "set messagecallback 'renvoyerMessages';set pickcallback 'messagesClics'; set perspectiveDepth off; javascript charger_fichier('" + nomFichier + "');",
        src : "cif/sio2.cif",
        use : "HTML5 Java noWebGL noImage",
        width : '100%'
    };
    Jmol.setDocument(0);
    minusc = Jmol.getApplet("minusc", Info);
    $('#applet').append( Jmol.getAppletHtml(minusc) );



/*
 * Remplir la liste des fichiers
 */
    actualise_liste_fichiers();

    $("#recherche_fichiers").on({
            "keyup" : function(){
                            actualise_liste_fichiers( $( this ).val() );
                        },
            "search" : function () {
                            actualise_liste_fichiers( $( this ).val() );
                        }
            });

/*
 * pour l'interface sans tableau dans le mode formule
 */
    if (typeof (parametre.tableau) != "undefined") {
		if ( (parametre.tableau==0) || (parametre.tableau=="false")) {
			$('#tableau_elements').css('display','none');
			$('#tableau_caracteristiques').css('display','block');
			aideFormule="formule_notab.html";
		}
	}

});