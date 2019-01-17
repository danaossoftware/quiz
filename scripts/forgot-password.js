$(document).ready(function() {
    $("#login").on("click", function() {
        window.location.href = "http://localhost/quiz/login.html";
    });
    $("#signup").on("click", function() {
        window.location.href = "http://localhost/quiz/signup.html";
    });
});

function sendResetEmail() {
    var email = $("#email").val();
    if (email == '') {
        return;
    }
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'send-reset-email.php',
        data: {'email': email},
        dataType: 'text',
        cache: false,
        success: function(a) {
            window.location.href = "http://localhost/quiz/reset-email-sent.html";
        },
        error: function(a, b, c) {

        }
    });
}