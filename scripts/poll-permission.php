<?php
include 'db.php';
session_start();
$userId = $_SESSION["userid"];
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
                    $permissions = [];
                    while ($row = $results->fetch_assoc()) {
                        array_push($permissions, $row);
                    }
                    echo json_encode($permissions);
                    session_write_close();
                    return;
                }
            }
        } else {
            session_write_close();
            echo -1;
            return;
        }
    }
    $results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "'");
    $permissions = [];
    while ($row = $results->fetch_assoc()) {
        array_push($permissions, $row);
    }
    echo json_encode($permissions);
    session_write_close();
    return;
} else {
    session_write_close();
    echo -1;
}