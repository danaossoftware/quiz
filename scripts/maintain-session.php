<?php
$userId = $_GET["user-id"];
session_start();
$_SESSION["userid"] = $userId;
session_write_close();