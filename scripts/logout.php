<?php
session_start();
unset($_SESSION["dnquiz_user_id"]);
unset($_SESSION["dnquiz_email"]);
unset($_SESSION["dnquiz_password"]);
$_SESSION["dnquiz_user_id"] = "";
$_SESSION["dnquiz_email"] = "";
$_SESSION["dnquiz_password"] = "";
//session_destroy();