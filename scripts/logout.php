<?php
session_id("quiz");
session_start();
$_SESSION["userid"] = "";
$_SESSION["email"] = "";
$_SESSION["password"] = "";
unset($_SESSION["userid"]);
unset($_SESSION["email"]);
unset($_SESSION["password"]);
session_write_close();
header("Location: http://ilatih.com/quiz");