<?php
session_start();
if (isset($_SESSION["dnquiz_user_id"]) && $_SESSION["dnquiz_user_id"] != "") {
    session_abort();
    echo 0;
} else {
    session_abort();
    echo -1;
}