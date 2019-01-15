<?php
include 'db.php';
session_start();
$userId = $_SESSION["dnquiz_user_id"];
$results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $granted = $results->fetch_assoc()["granted"];
    while ($granted == 0) {
        sleep(5);
        $results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "'");
        if ($results && $results->num_rows > 0) {
            while ($row = $results->fetch_assoc()) {
                if ($row["granted"] == 1) {
                    $results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "'");
                    echo $results->fetch_assoc()["id"];
                    return;
                }
            }
        } else {
            echo -1;
            return;
        }
    }
} else {
    echo -1;
}