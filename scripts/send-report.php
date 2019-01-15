<?php
include 'mail.php';
$email = $_GET["email"];
$report = $_GET["report"];
$email = str_replace("%40", "@", $email);
sendMail($email, "danaoscompany@gmail.com", "Keluhan Pengguna", $report);
echo $report;