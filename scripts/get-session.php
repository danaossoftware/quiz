<?php
session_start();
$userId = $_SESSION["userid"];
$email = $_SESSION["email"];
$password = $_SESSION["password"];
echo "{\"userId\": \"" . $userId . "\", \"email\": \"" . $email . "\", \"password\": \"" . $password . "\"}";
session_write_close();