<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION["dnquiz_user_id"]) && $_SESSION["dnquiz_user_id"] != "") {
    echo 0;
} else {
    echo -1;
}