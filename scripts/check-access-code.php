<?php
include 'db.php';
$chapterId = $_GET["chapter-id"];
$accessCode = $_GET["access-code"];
$results = $c->query("SELECT * FROM bab WHERE id='" . $chapterId . "'");
if ($results && $results->num_rows > 0) {
    if ($results->fetch_assoc()["access_code"] == $accessCode) {
        echo 0;
    } else {
        echo -1;
    }
} else {
    echo -1;
}