<?php
session_start();
if (isset($_SESSION["dnquiz_user_id"]) && $_SESSION["dnquiz_user_id"] != "") {
    session_write_close();
    echo 0;
} else {
    session_write_close();
    echo -1;
}