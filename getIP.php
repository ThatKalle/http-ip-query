<?php
header("Content-Type: application/json");
$ip[] = array(
    'ip' => $_SERVER['REMOTE_ADDR'] 
);
echo json_encode($ip);
?>
