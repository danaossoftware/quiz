<?php
include 'mail.php';
$email = urldecode($_GET["email"]);
$report = urldecode($_GET["report"]);
sendMail($email, "ilatih.lamintang@gmail.com", "Keluhan Pengguna", $report);