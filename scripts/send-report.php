<?php
include 'mail.php';
$email = urldecode($_GET["email"]);
$report = urldecode($_GET["report"]);
sendMail("danaoscompany@gmail.com", "admin@ilatih.com", "Keluhan Pengguna", $report);
echo $email;