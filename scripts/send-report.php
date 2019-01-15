<?php
include 'mail.php';
$email = $_GET["email"];
$report = $_GET["report"];
sendMail($email, "danaoscompany@gmail.com", "Keluhan Pengguna", $report);
echo $report;