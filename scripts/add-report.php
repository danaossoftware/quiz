<?php
include 'mail.php';
$email = $_GET["email"];
$report = $_GET["report"];
sendMail("danaossoftware@gmail.com", "danaoscompany@gmail.com", "Keluhan Pengguna", "Hello, world");