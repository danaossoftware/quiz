$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://localhost/quiz/browsernotsupported.html";
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
                window.location.href = "http://localhost/quiz";
            }
        },
        error: function(a, b, c) {

        }
    });
});

function initialize() {
    $("#home").on("click", function() {
        window.location.href = "http://localhost/quiz/home.html";
    });
    $("#latihan").on("click", function() {
        window.location.href = "http://localhost/quiz/home.html?page=1";
    });
    $("#profile").on("click", function() {
        window.location.href = "http://localhost/quiz/profile.html";
    });
    $("#help").on("click", function() {
        window.location.href = "http://localhost/quiz/help.html";
    });
    $("#contact-us").on("click", function() {
        window.location.href = "http://localhost/quiz/contact-us.html";
    });
    $("#log-out").on("click", function() {
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'logout.php',
            dataType: 'text',
            cache: false,
            success: function(a) {
                window.location.href = "http://localhost/quiz";
            },
            error: function(a, b, c) {
                alert(a+' '+c);
            }
        });
    });
}