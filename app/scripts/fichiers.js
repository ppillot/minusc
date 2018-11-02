/**
 * @author Paul Pillot
 * Liste des fichiers de modèles minéraux
 * affichés dans le menu fichier
 * syntaxe :
 * 'Nom_fichier' dans le répertoire cif
 */
var liste_fichiers = {
        'Actinote': {
            'file': 'actinote-9001932.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, calcium, iron) (oxygen); connect 0.1 1.0 (hydrogen) (oxygen) '
        },
        'Albite': {
            'file': 'albite.cif',
            aliases: ['feldspath'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'
        },
        'Andalousite': {
            'file': 'andalousite-9000715.cif',
            'script': 'connect (*) delete; connect 1.0 2.2 (silicon,aluminium) (oxygen)'
        },
        'Anorthite': {
            'file': 'anorthite.cif',
            aliases: ['feldspath'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'
        },
        'Anhydrite': {
            'file': 'anhydrite-9004096.cif',
            'script': ''
        },
        'Antigorite': {
            'file': 'antigorite-serpentine-9003103.cif',
            aliases: ['serpentine'],
            'script': 'connect 1.5 3.0 (_H) (_O) delete'
        },
        'Apatite': {
            'file': 'apatite.cif'
        },
        'Aragonite': {
            'file': 'aragonite-2100187.cif',
            script: 'connect (*) delete; connect 1.0 3.0 (carbon, calcium) (oxygen)'
        },
        'Argent': {
            'file': 'argent.cif',
            type: 'metal'
        },
        'Augite': {
            'file': 'augite.cif',
            aliases: ['pyroxène'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, magnesium) (oxygen)'
        },
        'Biotite': {
            'file': 'biotite.cif',
            aliases: ['mica'],
            'script': 'connect (potassium) (*) delete;'
        },
        'Calcite': {
            'file': 'calcite.cif',
            'script': ''
        },
        'Chlorite': {
            'file': 'chlorite-9000757.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,magnesium, aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'
        },
        'Chlorure de Cesium': {
            'file': 'chlorure-cesium-9008789.cif',
            aliases: ['CeCl']
        },
        'Coesite': {
            'file': 'coesite.cif'
        },
        'Diamant': {
            'file': 'diamant.cif',
            type: 'covalent'
        },
        'Diopside': {
            'file': 'diopside.cif',
            'script': 'connect (calcium) (*) delete;'
        },
        'Disthène': {
            'file': 'disthene-9000720.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,aluminium) (oxygen)'
        },
        'Dolomite': {
            'file': 'dolomite.cif'
        },
        'Fayalite': {
            'file': 'fayalite.cif',
            aliases: ['péridot', 'olivine'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, iron) (oxygen)'
        },
        'Fer': {
            'file': 'fer-5000217.cif',
            type: 'metal'
        },
        'Fluorine': {
            'file': 'fluorine-1000043.cif'
        },
        'Forstérite': {
            'file': 'forsterite.cif',
            aliases: ['péridot', 'olivine'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, magnesium) (oxygen)'
        },
        'Gibbsite': {
            'file': 'gibbsite-1200016.cif',
            'script': 'connect 1.5 2.5 (hydrogen) (*) delete'
        },
        'Glace': {
            'file': 'glace.cif',
            'script': 'connect (*) delete; connect 0.1 1.0 (hydrogen) (oxygen);',
            type: 'molecular'
        },
        'Glaucophane': {
            'file': 'glaucophane-9005070.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,magnesium,iron,aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'
        },
        'Graphite': {
            'file': 'graphite.cif',
            type: 'covalent'
        },
        'Grenat pyrope': {
            'file': 'pyrope.cif',
            'script': 'connect(magnesium) (*) delete'
        },
        'Gypse': {
            'file': 'gypse-9013164.cif',
            'script': 'connect (hydrogen) (!OW) delete;'
        },
        'Halite': {
            'file': 'halite.cif',
            aliases: ['sel', 'nacl', 'chlorure de sodium'],
            'script': 'connect 3 (*) (*)'
        },
        'Hornblende': {
            'file': 'hornblende-9001225.cif',
            aliases: ['amphibole'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,magnesium,iron,aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'
        },
        'Illite': {
            'file': 'illite.cif',
            aliases: ['argile'],
            'script': 'connect (aluminium) (aluminium) delete'
        },
        'Jadéite': {
            'file': 'jadeite.cif',
            'script': 'connect (sodium) (*) delete'
        },
        'Kaolinite': {
            'file': 'kaolinite-9009234.cif',
            aliases: ['argile'],
            'script': 'connect 1.5 3.0 (hydrogen) (oxygen) delete'
        },
        'Lizardite': {
            'file': 'lizardite-9000848.cif'
        },
        'Magnésiowüstite': {
            'file': 'magnesiowustite-9006091.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (_Fe, _Mg) (oxygen)'
        },
        'Muscovite': {
            'file': 'muscovite-9000837.cif',
            aliases: ['mica'],
            'script': 'connect (*) delete; connect 1.0 3.0 (_Al, _Si) (oxygen); connect 0.0 1.0 (_H) (_O);'
        },
        'Or': {
            'file': 'or.cif',
            type: 'metal'
        },
        'Orthose': {
            'file': 'orthose.cif',
            aliases: ['feldspath'],
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, aluminium) (oxygen)'
        },
        'Perovskite-Bridgmanite': {
            'file': 'perovskite-9004008.cif',
            'script': 'connect (*) delete; connect 1.0 2.0 (silicon,magnesium) (oxygen)'
        },
        'Polonium': {
            'file': 'polonium.cif',
            type: 'metal'
        },
        'Post-Perovskite': {
            'file': 'post-perovskite-9009217.cif',
            'script': 'connect (*) delete; connect 1.0 2.0 (silicon,magnesium) (oxygen)'
        },
        'Pyrite': {
            'file': 'pyrite.cif'
        },
        'Ringwoodite': {
            'file': 'ringwoodite-9003069.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,magnesium) (oxygen)'
        },
        'Quartz': {
            'file': 'sio2.cif',
            aliases: ['SiO2']
        },
        'Saccharose': {
            'file': 'sucrose.cif',
            aliases: ['sucre'],
            type: 'molecular'
        },
        'Sillimanite': {
            'file': 'sillimanite-1011204.cif',
            'script': 'connect (*) delete; connect 1.0 2.2 (silicon,aluminium) (oxygen)'
        },
        'Stishovite': {
            'file': 'stishovite-9001283.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon) (oxygen)'
        },
        'Staurotide': {
            'file': 'staurolite-9005341.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'
        },
        'Sylvite': {
            'file': 'sylvite.cif',
            'script': 'connect 3 (*) (*)'
        },
        'Vanilline': {
            'file': 'vanilline.cif',
            type: 'molecular'
        },
        'Wadsleyite': {
            'file': 'wadsleyite-9002355.cif',
            'script': 'connect (*) delete; connect 1.0 3.0 (silicon,magnesium) (oxygen)'
        },
        'Wollastonite': {
            'file': 'wollastonite.cif',
            'script': 'connect (calcium) (*) delete'
        },
        'ZnS Blende': {
            'file': 'sphalerite-9000107.cif'
        }
    },
    liste_noms_mineraux = (function (tF) {
        var t = [],
            nom = '';
        for (nom in tF) {
            if (tF.hasOwnProperty(nom)) {
                t.push(nom);
            }
        }
        return t;
    }(liste_fichiers)),
    classification_fichiers = {};