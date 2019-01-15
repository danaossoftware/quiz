<?php
include 'db.php';
session_start();
$userId = $_SESSION["dnquiz_user_id"];
$results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $granted = $results->fetch_assoc()["granted"];
    while ($granted == 0) {
        sleep(5);
        $results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "' AND chapter_id='" . $chapterId . "'");
        if ($results && $results->num_rows > 0) {
            $granted = $results->fetch_assoc()["granted"];
        } else {
            echo -1;
            return;
        }
    }
    $permissions = [];
    while ($row = $results->fetch_assoc()) {
        array_push($permissions, $row);
    }
    echo json_encode($permissions);
} else {
    echo -1;
}