<?php
session_id("quiz");
session_start();
//echo $_SESSION["userid"];
if (isset($_SESSION["userid"]) && $_SESSION["userid"] != "") {
    session_write_close();
    echo 0;
} else {
    session_write_close();
    echo -1;
}