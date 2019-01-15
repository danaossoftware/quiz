<?php
include 'mail.php';
$email = urldecode($_GET["email"]);
$report = urldecode($_GET["report"]);
sendMail2("danaoscompany@gmail.com", "admin@ilatih.com", "Keluhan Pengguna", "abcd");
echo $email;