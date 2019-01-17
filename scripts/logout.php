<?php
session_start();
unset($_SESSION["userid"]);
unset($_SESSION["email"]);
unset($_SESSION["password"]);
$_SESSION["userid"] = "";
$_SESSION["email"] = "";
$_SESSION["password"] = "";
//session_destroy();