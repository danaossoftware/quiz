<?php
session_id("quiz");
session_start();
include 'db.php';
$userId = $_SESSION["userid"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    session_write_close();
    echo json_encode($row);
} else {
    session_write_close();
    echo -1;
}