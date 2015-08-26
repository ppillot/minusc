<?php
	$txt = '';
	if (isset($_SESSION['snapshot'])) foreach ($_SESSION['snapshot'] as $key=>$i) {
		$txt .= $key.'@'.'www/'.$i['file_name'].',';
	}
	$txt = rtrim($txt,',');
    echo $txt;
?>
