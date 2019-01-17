<?php
session_start();
include 'mail.php';
$userId = $_SESSION["dnquiz_user_id"];
$email = $_SESSION["dnquiz_email"];
$url = "http://localhost/quiz/confirm-email.html?id=" . $userId;
sendMail("admin@localhost", $email, "Konfirmasi email Anda untuk akun iLatih Anda", "<br/><img src='http://localhost/quiz/img/logo.png' width='80px' height='80px'><br/><br/><br/>Selamat datang!<br/>Konfirmasi email Anda dengan meng-klik URL berikut untuk menyelesaikan registrasi akun iLatih Anda.<br/><a href='" . $url . "'>" . $url . "</a><br/>Jika Anda tidak mendaftar iLatih sebelumnya, abaikan email ini.<br/>Tim iLatih");
session_abort();