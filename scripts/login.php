<?php
$email = $_GET["email"];
$password = $_GET["password"];
$rememberMe = $_GET["remember-me"];
include 'db.php';
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    session_id("quiz");
    session_start();
    $_SESSION["userid"] = "5c2db02610213";//$results->fetch_assoc()["id"];
    $_SESSION["email"] = $email;
    $_SESSION["password"] = $password;
    /*if ($rememberMe) {
        $params = session_get_cookie_params();
        $expiryDate = 14; //Expiry date, in days
        setcookie(session_name(), $_COOKIE[session_name()], time() + $expiryDate*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }*/
    echo $_SESSION["userid"];
    session_write_close();
} else {
    echo -1;
}