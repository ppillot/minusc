<?php
session_start();
copy('../img/full/4.jpg','4.jpg');
echo "<pre>";
    print_r($_SESSION);
echo "</pre>";
?>
