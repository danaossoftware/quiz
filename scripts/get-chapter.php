<?php
include 'db.php';
$id = $_GET["id"];
$results = $c->query("SELECT * FROM bab WHERE id='" . $id . "'");
echo json_encode($results->fetch_assoc());