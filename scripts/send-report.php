<?php
include 'mail.php';
$email = $_GET["email"];
$report = "Hello world 2";
sendMail("danaossoftware@gmail.com", "danaoscompany@gmail.com", "Keluhan Pengguna", $report);
echo $report;