/**
 * @author Paul Pillot
 * Liste des fichiers de modèles minéraux
 * affichés dans le menu fichier
 * syntaxe :
 * 'Nom_fichier' dans le répertoire cif
 */
liste_fichiers = {
	'Actinote' : ['actinote-9001932.cif','connect (*) delete; connect 1.0 3.0 (silicon, calcium, iron) (oxygen); connect 0.1 1.0 (hydrogen) (oxygen) '],
	'Albite' : ['albite.cif','connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'],
	'Andalousite' : ['andalousite-9000715.cif','connect (*) delete; connect 1.0 2.2 (silicon,aluminium) (oxygen)'],
	'Anorthite' : ['anorthite.cif','connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'],
	'Anhydrite' : ['anhydrite-9004096.cif',''],
	'Antigorite' : ['antigorite-serpentine-9003103.cif','connect 1.5 3.0 (_H) (_O) delete'],
	'Apatite' : ['apatite.cif',''],
	'Argent' : ['argent.cif','','metal'],
	'Augite' : ['augite.cif','connect (*) delete; connect 1.0 3.0 (silicon, magnesium) (oxygen)'],
	'Biotite' : ['biotite.cif','connect (potassium) (*) delete;'],
	'Calcite' : ['calcite.cif',''],
	'Chlorite' : ['chlorite-9000757.cif','connect (*) delete; connect 1.0 3.0 (silicon,magnesium, aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'],
	'Chlorure de Cesium' : ['chlorure-cesium-9008789.cif',''],
	'Coesite' : ['coesite.cif',''],
	'Diamant' : ['diamant.cif','','covalent'],
	'Diopside' : ['diopside.cif','connect (calcium) (*) delete;'],
	'Disthène' : ['disthene-9000720.cif','connect (*) delete; connect 1.0 3.0 (silicon,aluminium) (oxygen)'],
	'Dolomite' : ['dolomite.cif',''],
	'Fayalite' : ['fayalite.cif','connect (*) delete; connect 1.0 3.0 (silicon, iron) (oxygen)'],
	'Fer' : ['fer-5000217.cif','','metal'],
	'Fluorine' : ['fluorine-1000043.cif',''],
	'Forstérite' : ['forsterite.cif','connect (*) delete; connect 1.0 3.0 (silicon, magnesium) (oxygen)'],
	'Gibbsite' : ['gibbsite-1200016.cif','connect 1.5 2.5 (hydrogen) (*) delete'],
	'Glace' : ['glace.cif','connect (*) delete; connect 0.1 1.0 (hydrogen) (oxygen);','molecular'],
	'Glaucophane' : ['glaucophane-9005070.cif','connect (*) delete; connect 1.0 3.0 (silicon,magnesium,iron,aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'],
	'Graphite' : ['graphite.cif','','covalent'],
	'Grenat pyrope' : ['pyrope.cif','connect(magnesium) (*) delete'],
	'Gypse' : ['gypse-9013164.cif','connect (hydrogen) (!OW) delete;'],
	'Halite' : ['halite.cif','connect 3 (*) (*)'],
	'Hornblende' : ['hornblende-9001225.cif','connect (*) delete; connect 1.0 3.0 (silicon,magnesium,iron,aluminium) (oxygen); connect 0.2 1.5 (hydrogen) (oxygen)'],
	'Illite' : ['illite.cif','connect (aluminium) (aluminium) delete'],
	'Jadéite' : ['jadeite.cif','connect (sodium) (*) delete'],
	'Kaolinite' : ['kaolinite-9009234.cif','connect 1.5 3.0 (hydrogen) (oxygen) delete'],
	'Lizardite' : ['lizardite-9000848.cif',''],
	'Magnésiowüstite' : ['magnesiowustite-9006091.cif','connect (*) delete; connect 1.0 3.0 (_Fe, _Mg) (oxygen)'],
	'Muscovite' : ['muscovite-9000837.cif','connect (*) delete; connect 1.0 3.0 (_Al, _Si) (oxygen); connect 0.0 1.0 (_H) (_O);'],
	'Or' : ['or.cif','','metal'],
	'Orthose' : ['orthose.cif','connect (*) delete; connect 1.0 3.0 (silicon, aluminium) (oxygen)'],
	'Perovskite-Bridgmanite' : ['perovskite-9004008.cif','connect (*) delete; connect 1.0 2.0 (silicon,magnesium) (oxygen)'],
	'Polonium' : ['polonium.cif','','metal'],
	'Post-Perovskite' : ['post-perovskite-9009217.cif','connect (*) delete; connect 1.0 2.0 (silicon,magnesium) (oxygen)'],
	'Pyrite' : ['pyrite.cif',''],
	'Ringwoodite' : ['ringwoodite-9003069.cif','connect (*) delete; connect 1.0 3.0 (silicon,magnesium) (oxygen)'],
	'Quartz' : ['sio2.cif',''],
	'Saccharose' : ['sucrose.cif','','molecular'],
	'Sillimanite' : ['sillimanite-1011204.cif','connect (*) delete; connect 1.0 2.2 (silicon,aluminium) (oxygen)'],
	'Stishovite' : ['stishovite-9001283.cif','connect (*) delete; connect 1.0 3.0 (silicon) (oxygen)'],
	'Staurotide' : ['staurolite-9005341.cif','connect (*) delete; connect 1.0 3.0 (silicon, aluminum) (oxygen)'],
	'Sylvite' : ['sylvite.cif','connect 3 (*) (*)'],
	'Vanilline' : ['vanilline.cif','','molecular'],
	'Wadsleyite' : ['wadsleyite-9002355.cif','connect (*) delete; connect 1.0 3.0 (silicon,magnesium) (oxygen)'],
	'Wollastonite' : ['wollastonite.cif','connect (calcium) (*) delete'],
	'ZnS Blende' : ['sphalerite-9000107','']
};
liste_noms_mineraux = (function(tF){
    var t = [];
    for (i in tF) {
        t.push(i);
    }
    return t;
})(liste_fichiers);

classification_fichiers = {
	
}