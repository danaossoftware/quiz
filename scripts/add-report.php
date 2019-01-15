<?php
include 'mail.php';
$email = $_POST["email"];
$report = $_POST["report"];
sendMail($email, "admin@ilatih.com", "Keluhan Pengguna", $report);