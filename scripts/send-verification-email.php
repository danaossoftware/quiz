<?php
session_id("quiz");
session_start();
include 'mail.php';
$userId = $_SESSION["userid"];
$email = $_SESSION["email"];
$url = "http://ilatih.com/quiz/confirm-email.html?id=" . $userId;
sendMail("admin@ilatih.com", $email, "Konfirmasi email Anda untuk akun iLatih Anda", "<br/><img src='http://ilatih.com/quiz/img/logo.png' width='80px' height='80px'><br/><br/><br/>Selamat datang!<br/>Konfirmasi email Anda dengan meng-klik URL berikut untuk menyelesaikan registrasi akun iLatih Anda.<br/><a href='" . $url . "'>" . $url . "</a><br/>Jika Anda tidak mendaftar iLatih sebelumnya, abaikan email ini.<br/>Tim iLatih");
session_write_close();