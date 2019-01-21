<?php
$courseId = $_GET["course_id"];
$chapterId = $_GET["chapter_id"];
include 'db.php';
$results = $c->query("SELECT * FROM questions WHERE course_id='" . $courseId . "' AND bab_id='" . $chapterId . "'");
if ($results && $results->num_rows > 0) {
    $questions = [];
    while ($row = $results->fetch_assoc()) {
        array_push($questions, $row);
    }
    shuffle($questions);
    $response = json_encode($questions);
    $response = utf8_encode($response);
    $response = preg_replace('/[\x00-\x1F\x7F]/', '', $response);
    echo $response;
} else {
    echo -1;
}