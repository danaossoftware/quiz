<?php
include 'mail.php';
$email = urldecode($_GET["email"]);
$report = urldecode($_GET["report"]);
sendMail($email, "danaoscompany@gmail.com", "Keluhan Pengguna", $report);
echo $report;