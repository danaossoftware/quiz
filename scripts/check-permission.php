<?php
include 'db.php';
session_start();
$chapterId = $_GET["chapter-id"];
$courseId = $_GET["course-id"];
$userId = $_SESSION["userid"];
$results = $c->query("SELECT * FROM permissions WHERE user_id='" . $userId . "' AND chapter_id='" . $chapterId . "' AND course_id='" . $courseId . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    $c->query("INSERT INTO permissions (id, course_id, chapter_id, user_id, granted) VALUES ('" . uniqid() . "', '" . $courseId . "', '" . $chapterId . "', '" . $userId . "', 0)");
    echo -1;
}
session_write_close();