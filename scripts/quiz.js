const PHP_PATH = "http://ilatih.com/quiz/scripts/";
const CORRECT_ANSWER_SCORE = 1;
const WRONG_ANSWER_SCORE = 0;

var courseId;
var chapterId;
var currentQuestion = 0;
var totalQuestions = 0;
var scores = [];
var answerTypes = []; //Correct = 1, Wrong = 0
var userAnswers = [];
var questionIds = [];
var wrongAnswerPositions = []; //0 = first answer, 1 = second answer, 2 = third answer
/* FORMAT */
/* Setiap value pada 'wrongAnswerPositions' terdiri dari string. Setiap string terdiri dari index-index dari jawaban yang salah, dan dibatasi dengan '@'. Sebagai contoh,
jawaban salah untuk soal 1 adalah pada posisi 0 dan 1, dan
jawaban salah untuk soal 2 adalah pada posisi 2. Maka array-nya akan terlihat seperti ini:
[0] => "0@1"
[1] => "2"
 */
var totalCorrectAnswers = 0;
var totalWrongAnswers = 0;
var questions;

$(document).ready(function () {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/quiz/browsernotsupported.html";
        return;
    }*/
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == "0") {
                initialize();
            } else {
                window.location.href = "http://ilatih.com/quiz";
            }
        },
        error: function(a, b, c) {

        }
    });
});

function initialize() {
    var params = location.search;
    params = params.substr(1, params.length);
    courseId = params.split("&")[0].split("=")[1];
    chapterId = params.split("&")[1].split("=")[1];
    $("#home").on("click", function () {
        window.location.href = "http://ilatih.com/quiz/home.html?page=0";
    });
    $("#latihan").on("click", function () {
        window.location.href = "http://ilatih.com/quiz/home.html?page=1";
    });
    currentQuestion = window.localStorage.getItem("current-question");
    currentQuestion = 0;
    //$("#answer-result-panel").find("*").remove();
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-chapter-info.php',
        data: {'chapter-id': chapterId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            var chapter = JSON.parse(a);
            var timeLimit = chapter["time_limit"];
            var timeLimitSec = timeLimit*60;
            if (timeLimit < 10) {
                timeLimit = "0"+timeLimit;
            }
            timeLimit += ":00";
            $("#time-limit").html("Batas waktu: "+timeLimit);
            var timerFunction = function() {
                timeLimitSec--;
                if (timeLimitSec <= 0) {
                    $("#time-out-container").css("display", "flex");
                    return;
                }
                var date = new Date(null);
                date.setSeconds(timeLimitSec);
                $("#time-limit").html("Batas waktu: "+date.toISOString().substr(11, 8));
                setTimeout(timerFunction, 1000);
            };
            setTimeout(timerFunction, 1000);
            loadQuestions();
            setItemCheckBoxListener();
        }
    });
}

function loadQuestions() {
    scores = [];
    userAnswers = [];
    questionIds = [];
    answerTypes = [];
    wrongAnswerPositions = [];
    totalCorrectAnswers = 0;
    totalWrongAnswers = 0;
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get-random-questions.php',
        data: {'course_id': courseId, 'chapter_id': chapterId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            a = decode_utf8(a);
            if (a < 0) {
                // Error
            } else {
                questions = JSON.parse(a);
                totalQuestions = questions.length;
                loadQuestion(currentQuestion);
            }
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function loadQuestion(index) {
    $("#isian-answer").val("");
    $("#answer-a").html("");
    $("#answer-b").html("");
    $("#answer-c").html("");
    $("#answer-d").html("");
    $("#answer-result-container").css("display", "none");
    $("#next-question").css("display", "block");
    $("#next-question-2-container").css("display", "none");
    $("#question-img-container").css("display", "none");
    $("#current-question").html("Soal " + (+index + 1) + " dari " + totalQuestions);
    var question = questions[index];
    var answers = question.answers;
    var answerA = answers.split("@")[0];
    var answerB = answers.split("@")[1];
    var answerC = answers.split("@")[2];
    var answerD = answers.split("@")[3];
    if (question.type == "pilihan") {
        /*var items = "";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: -32px\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerB + "</div></div>";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: -32px;\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerC + "</div></div>";
        items += "<div style=\"width: 100%; height: 100%; display: flex; flex-flow: row nowrap; margin-top: -32px;\">" +
            "<label style=\"margin-top: 10px; position: relative; user-select: none;\">&nbsp;" +
            "<input type=\"checkbox\" onclick=\"return false;\"" +
            "style=\"visibility: visible; position: absolute; width: 0; height: 0; opacity: 0;\">" +
            "<div class=\"check\">&nbsp;</div>" +
            "<div class=\"check-img\">" +
            "<img src=\"img/check.png\" width=\"12px\" height=\"12px\"" +
            "style=\"position: relative; left:2px; top:-6px;\">" +
            "</div>" +
            "</label>" +
            "<div style=\"margin-left: 20px; font-size: 18px;\">" + answerD + "</div></div>";
        $("#answers").html(items);*/
        $("#answer-a").html(answerA);
        $("#answer-b").html(answerB);
        $("#answer-c").html(answerC);
        $("#answer-d").html(answerD);
        $("#answer-a-container").css("display", "flex");
        $("#answer-b-container").css("display", "flex");
        $("#answer-c-container").css("display", "flex");
        $("#answer-d-container").css("display", "flex");
        $("#isian-answer").css("display", "none");
    } else if (question.type == "isian") {
        /*var items = "";
        for (var i = 0; i < 1; i++) {
            items += "<div style=\"font-family: 'PalanquinBold', Arial; font-size: 15px; color: black;\">Jawaban " + (i + 1) + ":</div>\n" +
                "<input class=\"input1\" style=\"margin-top: 5px;\" type=\"text\" name=\"answer-" + (i + 1) + "\" id=\"answer-" + (i + 1) + "\">";
        }*/
        //$("#answers").html(items);
        $("#answer-a-container").css("display", "none");
        $("#answer-b-container").css("display", "none");
        $("#answer-c-container").css("display", "none");
        $("#answer-d-container").css("display", "none");
        $("#isian-answer").css("display", "block");
    }
    if (question.video_url != '') {
        $("#question-video-source").attr("src", question.video_url);
        $("#question-video")[0].load();
        $("#question-video").css("display", "block");
    }
    if (question.audio_url != '') {
        $("#question-audio-source").attr("src", question.audio_url);
        $("#question-audio")[0].load();
        $("#question-audio-container").css("display", "flex");
    }
    if (question.picture_url != '') {
        $("#question-img").attr("src", question.picture_url);
        $("#preview-img").attr("src", question.picture_url);
        $("#question-img-container").css("display", "flex");
        $("#question-img").on("click", function () {
            $("#preview-img-container").css("display", "flex");
            $("#preview-img-container").hide();
            $("#preview-img-container").fadeIn(500, function () {
                $(document).click(function (event) {
                    if (!($(event.target).is("#preview-img"))) {
                        $("#preview-img-container").css("display", "none");
                        $(document).off("click");
                    }
                });
            });
        });
    }
    $("#question").html(question.question);
    setItemCheckBoxListener();
    setListeners();
}

function setListeners() {
    $("#answer-with-voice").on("click", function () {
        var recognizer = new window.webkitSpeechRecognition();
        recognizer.onresult = function (e) {
            var text = e.results[0][0].transcript;
        };
        recognizer.start();
    });
}

function setItemCheckBoxListener() {
    $("#answer-panel").find("*").each(function () {
        if ($(this).attr("class") === "check-img") {
            $(this).on('click', function () {
                // Uncheck all checkboxes
                $("#answers").find("*").each(function () {
                    if ($(this).prop("tagName") == "LABEL") {
                        $(this).find("input").prop("checked", false);
                        $(this).find(".check-img").css("opacity", "0");
                    }
                });
                var checkBox = $(this).parent().find("input");
                var checkBoxImg = $(this);
                checkBoxImg.css("opacity", "1");
                checkBox.prop("checked", true);
                var checked = false;
                event.preventDefault();
            });
        }
    });
}

function toNextQuestion() {
    var question = questions[currentQuestion];
    var questionType = question.type;
    if (questionType == "pilihan") {
        // Check if no checkbox is checked
        var totalChecked = 0;
        var answer = -1;
        var i = 0;
        $("#answers").find("*").each(function () {
            if ($(this).attr("class") == "check-img") {
                var checkBox = $(this).parent().find("input");
                var checked = checkBox.prop("checked");
                if (checked) {
                    totalChecked++;
                    answer = i;
                }
                i++;
            }
        });
        if (totalChecked == 0) {
            $("#prompt-title").html("Peringatan");
            $("#prompt-text").html("Mohon centang salah satu pilihan");
            $("#prompt-no").css("display", "none");
            $("#prompt-yes").html("OK");
            $("#prompt").css("display", "flex");
            $("#prompt-yes").on("click", function () {
                $("#prompt").css("display", "none");
            });
            $("#prompt-no").on("click", function () {
            });
            //$("#answer-result-panel").find("*").remove();
            return;
        }
        var realAnswer = parseInt(question.correct_answer);
        var score = 0;
        if (answer == realAnswer) {
            score = CORRECT_ANSWER_SCORE;
            answerTypes.push(1);
            $("#answer-result").html("Jawaban Anda benar");
            $("#answer-result").css("color", "#27ae60");
            $("#real-answer").html(question.answers.split("@")[question.correct_answer]);
            $("#reason").html(question.reason);
            $("#reason-container").css("border", "1px solid darkgreen");
            $("#reason-container").css("background-color", "lightgreen");
            $("#reason-container").css("display", "block");
        } else {
            score = WRONG_ANSWER_SCORE;
            answerTypes.push(0)
            $("#answer-result").html("Jawaban Anda salah");
            $("#answer-result").css("color", "#e74c3c");
            $("#real-answer").html(question.answers.split("@")[question.correct_answer]);
            $("#reason").html(question.reason);
            $("#reason-container").css("border", "1px solid #c08175");
            $("#reason-container").css("background-color", "rgba(254, 108, 93, 0.4)");
            $("#reason-container").css("display", "block");
        }
        questionIds.push(question.id);
        scores.push(score);
        wrongAnswerPositions.push("");
        userAnswers.push("" + answer);
    } else if (questionType == "isian") {
        var answers = questions[currentQuestion].answers;
        var score = 0;
        var allCorrect = true;
        var wrongPositions = "";
        for (var i = 0; i < 1; i++) {
            var realAnswer = answers;
            var answer = $("#isian-answer").val();
            if (answer == '') {
                $("#prompt-title").html("Peringatan");
                $("#prompt-text").html("Mohon isi semua jawaban sebelum melanjutkan");
                $("#prompt-yes").html("OK");
                $("#prompt-no").css("display", "none");
                $("#prompt").css("display", "flex");
                $("#prompt-yes").on("click", function () {
                    $("#prompt").css("display", "none");
                });
                return;
            }
            if (answer.toLowerCase() != realAnswer.toLowerCase()) {
                allCorrect = false;
                wrongPositions += ("" + i + "@");
            }
        }
        wrongPositions = wrongPositions.substr(0, wrongPositions.length - 1);
        wrongAnswerPositions.push(wrongPositions);
        if (allCorrect) {
            score = CORRECT_ANSWER_SCORE;
            answerTypes.push(1);
            $("#answer-result").html("Jawaban Anda benar");
            $("#answer-result").css("color", "#27ae60");
            $("#real-answer").html(answers);
            $("#reason").html(question.reason);
            $("#reason-container").css("border", "1px solid darkgreen");
            $("#reason-container").css("background-color", "lightgreen");
            $("#reason-container").css("display", "block");
        } else {
            score += CORRECT_ANSWER_SCORE;
            score = WRONG_ANSWER_SCORE;
            answerTypes.push(0);
            $("#answer-result").html("Jawaban Anda salah");
            $("#answer-result").css("color", "#e74c3c");
            $("#real-answer").html(answers);
            $("#reason").html(question.reason);
            $("#reason-container").css("border", "1px solid #c08175");
            $("#reason-container").css("background-color", "rgba(254, 108, 93, 0.4)");
            $("#reason-container").css("display", "block");
        }
        questionIds.push(questions[currentQuestion].id);
        scores.push(score);
        var answer1 = $("#answer-1").val();
        userAnswers.push(answer1);
    }
    $("#prompt-title").html("Konfirmasi");
    $("#prompt-text").html("Apakah Anda yakin dengan jawaban Anda?");
    $("#prompt").css("display", "flex");
    $("#prompt-no").html("Belum")
    $("#prompt-no").on("click", function() {
        $("#prompt").css("display", "none");
    });
    $("#prompt-yes").html("Ya");
    $("#prompt-yes").on("click", function() {
        $("#prompt-yes").off("click");
        $("#answer-result-container").css("display", "flex");
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        $("#prompt").css("display", "none");
        $("#next-question").css("display", "none");
        $("#next-question-2-container").css("display", "flex");
        $("#next-question-2").on("click", function() {
            $("#next-question-2").off("click");
            if (currentQuestion < totalQuestions - 1) {
                currentQuestion++;
                $("#current-question").html("Soal " + (currentQuestion + 1) + " dari " + totalQuestions);
                $("#answers").find("*").each(function () {
                    if ($(this).prop("tagName") == "LABEL") {
                        $(this).find("input").prop("checked", false);
                        $(this).find(".check-img").css("opacity", "0");
                    }
                });
                if (currentQuestion == totalQuestions - 1) {
                    $("#next-question").html("Selesai");
                }
                $("#fader").fadeIn(200, function () {
                    loadQuestion(currentQuestion);
                    $("#fader").fadeOut(200);
                });
                window.localStorage.setItem("current-question", currentQuestion);
            } else {
                $("#prompt-title").html("Konfirmasi");
                $("#prompt-text").html("Apakah Anda yakin ingin menyelesaikan latihan ini?");
                $("#prompt-yes").html("Ya");
                $("#prompt-no").html("Tidak");
                $("#prompt-no").css("display", "flex");
                $("#prompt").css("display", "flex");
                $("#prompt-yes").on("click", function () {
                    $("#prompt-yes").off("click");
                    $.ajax({
                        type: 'GET',
                        url: PHP_PATH + 'get-session.php',
                        dataType: 'text',
                        cache: false,
                        success: function (a) {
                            var session = JSON.parse(a);
                            var userId = session.userId;
                            $.ajax({
                                type: 'POST',
                                url: PHP_PATH + 'add-question-data.php',
                                dataType: 'text',
                                data: {
                                    'user-id': userId,
                                    'question-ids': questionIds,
                                    'answer-types': answerTypes,
                                    'scores': scores,
                                    'answers': userAnswers,
                                    'chapter-id': chapterId,
                                    'course-id': courseId,
                                    'wrong-answer-positions': wrongAnswerPositions
                                },
                                cache: false,
                                success: function (a) {
                                    $.ajax({
                                        type: 'GET',
                                        url: PHP_PATH+'remove-permission.php',
                                        data: {'chapter-id': chapterId, 'course-id': courseId},
                                        dataType: 'text',
                                        cache: false,
                                        success: function(a) {
                                            window.location.href = "http://ilatih.com/quiz/score.html";
                                        }
                                    });
                                },
                                error: function (a, b, c) {
                                    alert(b + ' ' + c);
                                }
                            });
                        },
                        error: function (a, b, c) {
                            alert(b + ' ' + c);
                        }
                    });
                });
                $("#prompt-no").on("click", function () {
                    $("#prompt").css("display", "none");
                });
            }
        });
    });
}

function closeImagePreview() {
    $("#preview-img-container").css("display", "none");
}

function backToHome() {
    $("#prompt-no").html("Tidak");
    $("#prompt-no").css("display", "flex");
    $("#prompt-no").on("click", function() {
        $("#prompt").css("display", "none");
    });
    $("#prompt-yes").html("Ya");
    $("#prompt-yes").on("click", function() {
        window.location.href = "home.html";
    });
    $("#prompt-title").html("Kembali ke Beranda");
    $("#prompt-text").html("Apakah Anda yakin ingin menyelesaikan tes ini dan kembali ke Beranda?")
    $("#prompt").css("display", "flex");
}

function goToScorePage() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get-session.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            var session = JSON.parse(a);
            var userId = session.userId;
            $.ajax({
                type: 'POST',
                url: PHP_PATH + 'add-question-data.php',
                dataType: 'text',
                data: {
                    'user-id': userId,
                    'question-ids': questionIds,
                    'answer-types': answerTypes,
                    'scores': scores,
                    'answers': userAnswers,
                    'chapter-id': chapterId,
                    'course-id': courseId,
                    'wrong-answer-positions': wrongAnswerPositions
                },
                cache: false,
                success: function (a) {
                    $.ajax({
                        type: 'GET',
                        url: PHP_PATH+'remove-permission.php',
                        data: {'chapter-id': chapterId, 'course-id': courseId},
                        dataType: 'text',
                        cache: false,
                        success: function(a) {
                            window.location.href = "http://ilatih.com/quiz/score.html";
                        }
                    });
                },
                error: function (a, b, c) {
                    alert(b + ' ' + c);
                }
            });
        },
        error: function (a, b, c) {
            alert(b + ' ' + c);
        }
    });
}