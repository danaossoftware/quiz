<?php
include 'mail.php';
$email = urldecode($_GET["email"]);
$report = urldecode($_GET["report"]);
sendMail($email, "admin@ilatih.com", "Keluhan Pengguna", $report);
echo $email;