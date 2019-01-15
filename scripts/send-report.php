<?php
include 'mail.php';
$email = $_GET["email"];
$report = $_GET["report"];
sendMail($email, "admin@ilatih.com", "Keluhan Pengguna", $report);
echo $report;