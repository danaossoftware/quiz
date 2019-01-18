<?php
$userId = $_POST["user-id"];
$questionIds = $_POST["question-ids"];
$answerTypes = $_POST["answer-types"];
$scores = $_POST["scores"];
$wrongAnswerPositions = $_POST["wrong-answer-positions"];
$answers = $_POST["answers"];
$chapterId = $_POST["chapter-id"];
$courseId = $_POST["course-id"];
$json = "[";
for ($i=0; $i<sizeof($questionIds); $i++) {
    $questionId = $questionIds[$i];
    $answerType = $answerTypes[$i];
    $score = $scores[$i];
    $wrongAnswerPosition = $wrongAnswerPositions[$i];
    $answer = $answers[$i];
    $json .= ("{\"questionId\": \"" . $questionId . "\", \"answerType\": \"" . $answerType . "\", \"score\": \"" . $score . "\", \"wrongAnswerPositions\": \"" . $wrongAnswerPosition . "\", \"answers\": \"" . $answer . "\"}, ");
}
$json = substr($json, 0, strlen($json)-2);
$json .= "]";
include 'db.php';
$results = $c->query("SELECT * FROM question_data WHERE user_id='" . $userId . "'");
$c->query("INSERT INTO question_data (id, user_id, chapter_id, course_id, score, data) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $chapterId . "', '" . $courseId . "', '" . $scores . "', '" . $json . "')");