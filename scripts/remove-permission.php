<?php
include 'db.php';
session_id("quiz");
session_start();
$userId = $_SESSION["userid"];
$courseId = $_GET["course-id"];
$chapterId = $_GET["chapter-id"];
$c->query("DELETE FROM permissions WHERE user_id='" . $userId . "' AND course_id='" . $courseId . "' AND chapter_id='" . $chapterId . "'");
session_write_close();