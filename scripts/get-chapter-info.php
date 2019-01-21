<?php
include 'db.php';
$chapterId = $_GET["chapter-id"];
$results = $c->query("SELECT * FROM bab WHERE id='" . $chapterId . "'");
echo json_encode($results->fetch_assoc());