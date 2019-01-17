<?php
$userId = $_GET["user-id"];
session_id("quiz");
session_start();
$_SESSION["userid"] = $userId;
session_write_close();