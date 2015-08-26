#!/bin/bash

# Variables
COMMAND="uglifyjs2"	# votre programme, ex : tar -cvf
ERROR_COUNT=0

echo "ATTENTION : faites une sauvegarde des fichiers js avant de lancer le script !"
read -p "Appuyer sur [Entrée] pour continuer... ou Ctrl+C pour annuler"

find . -type f -name '*.js' | while read files
do
	$COMMAND "$files" --compress unsafe=false
			if [ "$?" -ne "0" ]
			then
				echo "Une erreur s'est produite, fichier : $files"
				ERROR_COUNT=$((ERROR_COUNT+1))
			else
				echo "$files		[OK]"
			fi
	done

echo "*************************************"
echo "Fin du script"
echo "Erreur : $ERROR_COUNT"

exit 0
