$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var courseId = params.split("&")[0].split("=")[1];
    var chapterId = params.split("&")[1].split("=")[1];
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var settings = parser.parseFromString(a, "text/xml");
            var rulesTag = settings.getElementsByTagName("rules")[0];
            var rules = rulesTag.childNodes[0].nodeValue;
            rules = rules.split("@").join("<br/>");
            $("#rules").html(rules);
        },
        error: function(a, b, c) {

        }
    });
    $("#start-exam").on("click", function() {
        //$("#access-code").val("");
        $("#enter-code-container").css("display", "flex");
        $("#enter-code-cancel").on("click", function() {
            $("#enter-code-container").css("display", "none");
        });
        $("#enter-code-ok").on("click", function() {
            var accessCode = $("#access-code").val();
            if (accessCode == '') {
                return;
            }
            $.ajax({
                type: 'GET',
                url: PHP_PATH+'check-access-code.php',
                data: {'chapter-id': chapterId, 'course-id': courseId, 'access-code': accessCode},
                dataType: 'text',
                cache: false,
                success: function(a) {
                    $("#enter-code-container").css("display", "none");
                    if (a < 0) {
                        // Not granted
                        $('#prompt-text').html("Kode yang Anda masukkan salah. Silahkan hubungi pembimbing yang bersangkutan untuk menanyakan kodenya.");
                        $("#prompt").css("display", "flex");
                    } else {
                        window.location.href = "quiz.html?course_id="+courseId+"&chapter_id="+chapterId;
                    }
                }
            });
        });
    });
});