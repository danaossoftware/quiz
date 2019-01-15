<?php
include 'mail.php';
$email = $_POST["email"];
$report = $_POST["report"];
sendMail("danaossoftware@gmail.com", "danaoscompany@gmail.com", "Keluhan Pengguna", "Hello, world");