<?php
session_start();
$userId = $_SESSION["dnquiz_user_id"];
echo $userId;
session_write_close();
return;
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $response = ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"email\": \"" . $row["email"] . "\", \"password\": \"" . $row["password"] . "\", \"profilePictureURL\": \"" . $row["profilePicture"] . "\", \"phone\": \"" . $row["phone"] . "\", \"confirmed\": " . $row["confirmed"] . ", \"birthday\": \"" . $row["birthday"] . "\", \"gender\": \"" . $row["gender"] . "\", \"city\": \"" . $row["city"] . "\", \"ethnic\": \"" . $row["ethnic"] . "\", \"height\": \"" . $row["height"] . "\", \"summaryText\": \"" . $row["summary"] . "\", \"currentRoutine\": \"" . $row["currentRoutine"] . "\", \"myPassion\": \"" . $row["myPassion"] . "\", \"lastAnsweredQuestion\": \"" . $row["last_answered_question"] . "\", \"last_correct_question\": \"" . $row["last_correct_question"] . "\", \"lastWrongQuestion\": \"" . $row["last_wrong_question"] . "\"}");
    session_write_close();
    echo $response;
} else {
    session_write_close();
    echo -1;
}