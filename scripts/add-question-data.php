<?php
$userId = $_POST["user-id"];
$questionIds = $_POST["question-ids"];
$answerTypes = $_POST["answer-types"];
$scores = $_POST["scores"];
$wrongAnswerPositions = $_POST["wrong-answer-positions"];
$answers = $_POST["answers"];
$chapterId = $_POST["chapter-name"];
$courseId = $_POST["course-name"];
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
$chapterName = $c->query("SELECT * FROM bab WHERE id='" . $chapterId . "'")->fetch_assoc()["name"];
$courseName = $c->query("SELECT * FROM courses WHERE id='" . $courseId . "'")->fetch_assoc()["name"];
$results = $c->query("SELECT * FROM question_data WHERE user_id='" . $userId . "' AND bab='" . $chapterName . "' AND mata_kuliah='" . $courseName . "'");
if ($results && $results->num_rows > 0) {
    $c->query("UPDATE question_data SET data='" . $json . "', score=" . $scores . " WHERE user_id='" . $userId . "' AND bab='" . $chapterName . "' AND mata_kuliah='" . $courseName . "'");
} else {
    $c->query("INSERT INTO question_data (id, user_id, bab, mata_kuliah, score, data) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $chapterName . "', '" . $courseName . "', " . $scores . ", '" . $json . "')");
}