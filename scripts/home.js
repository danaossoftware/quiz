const PHP_PATH = "http://ilatih.com/quiz/scripts/";
var page = 0;
var newsJSON;

$(document).ready(function() {
    /*var isFirefox = typeof InstallTrigger !== 'undefined';
    if (!isFirefox) {
        window.location.href = "http://ilatih.com/quiz/browsernotsupported.html";
        return;
    }*/
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "home-mobile.html";
        return;
    }
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
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-user.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                if (user.confirmed == 0) {
                    $("#confirm-container").css("display", "block");
                }
            }
        }
    });
    $("#profile").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/profile.html";
    });
    loadNews();
    loadCourses();
    var params = location.search;
    if (params != '') {
        params = params.substr(1, params.length);
        page = params.split("&")[0].split("=")[1];
    }
    if (page == 1) {
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'get-user.php',
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a < 0) {
                    // Error
                } else {
                    var user = JSON.parse(a);
                    var confirmed = user.confirmed;
                    if (confirmed) {
                        showLatihanPage();
                    } else {
                        window.location.href = "http://ilatih.com/quiz/email-not-confirmed.html";
                    }
                }
            }
        });
    } else {
        showHomePage();
    }
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Logged in
                $("body").css("display", "block");
            } else {
                // Not logged in
                window.location.href = "login.html";
            }
        }
    });
    $("#home").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/home.html";
    });
    $("#latihan").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/home.html?page=1";
    });
    $("#profile").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/profile.html";
    });
    $("#help").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/help.html";
    });
    $("#contact-us").on("click", function() {
        window.location.href = "http://ilatih.com/quiz/contact-us.html";
    });
    $("#log-out").on("click", function() {
        $.ajax({
            type: 'GET',
            url: PHP_PATH+'logout.php',
            dataType: 'text',
            cache: false,
            success: function(a) {
                window.location.href = "http://ilatih.com/quiz";
            },
            error: function(a, b, c) {
                alert(a+' '+c);
            }
        });
    });
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'poll-permission.php',
        dataType: 'text',
        cache: false,
        async: true,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var permissions = JSON.parse(a);
                for (var i=0; i<permissions.length; i++) {
                    var permission = permissions[i];
                    if (permission.granted == 1) {
                        $.ajax({
                            type: 'GET',
                            url: PHP_PATH+'get-chapter.php',
                            data: {'id': permission.chapter_id},
                            dataType: 'text',
                            cache: false,
                            success: function(a) {
                                var chapterName = JSON.parse(a).name;
                                $.ajax({
                                    type: 'GET',
                                    url: PHP_PATH+'get-course.php',
                                    data: {'id': permission.course_id},
                                    dataType: 'text',
                                    cache: false,
                                    success: function(a) {
                                        var courseName = JSON.parse(a).name;
                                        var url = "http://ilatih.com/quiz/rules.html?course_id="+permission.course_id+"&chapter_id="+permission.chapter_id;
                                        $("#permission-notifications").append("<div style=\"margin-left: 30px; margin-right: 30px; margin-top: 20px; width: calc(100% - 60px); border-radius: 10px; border: 1px solid darkgreen; background-color: lightgreen; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; color: darkgreen; font-family: 'PalanquinBold';\">\n" +
                                            "Dosen telah mengizinkan Anda mengakses tes online mata kuliah "+courseName+" bab "+chapterName+". Klik di <a style='text-decoration: none;' href='"+url+"'>sini</a> untuk mulai ujian."+
                                            "</div>");
                                    }
                                });
                            }
                        });
                    }
                }
            }
        }
    });
}

function loadNews() {
    var url = "https://newsapi.org/v2/everything?sources=google-news&q=college&apiKey=4e3f88daccf5458da4e20b17d3c3c77e";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#news").find("*").remove();
            var news = JSON.parse(a);
            var articles = news.articles;
            newsJSON = articles;
            for (var i=0; i<articles.length; i++) {
                var article = articles[i];
                var id = "news-"+i;
                var item = "<div id=\""+id+"\" class=\"card\" style=\"display: none; margin-top: 10px;\">\n" +
                    "<div onclick=\"readNews(this)\" style=\"cursor: pointer; color: black; font-family: SegoeUILight, Arial; font-size: 17px; text-decoration: underline;\">\n" +
                    ""+article.title+"\n" +
                    "</div>\n" +
                    "<div style=\"color: black; font-family: SegoeUILight, Arial; font-size: 14px; margin-top: 5px;\">\n" +
                    ""+article.description+"\n" +
                    "</div>\n" +
                    "</div>";
                $("#news").append(item);
            }
            fadeInNews(0);
            $("#footer").css("display", "flex");
        },
        error: function(a, b, c) {

            $("#footer").css("display", "flex");
        }
    });
}

function fadeInNews(index) {
    if (index >= newsJSON.length) {
        return;
    }
    $("#news-"+index).fadeIn(150, function() {
        index++;
        fadeInNews(index);
    });
}

function readNews(obj) {
    var newsId = $(obj).parent().attr("id");
    var index = parseInt(newsId.substr(newsId.indexOf("-")+1, newsId.length).trim());
    var article = newsJSON[index];
    window.open(article.url, "_blank").focus();
}

function loadCourses() {
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-courses.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var courses = JSON.parse(a);
                var items = "";
                var j = 4;
                var len = courses.length;
                if (courses.length < 4) {
                    j = courses.length;
                }
                var k = 0;
                for (var i=0; i<courses.length; i+=4) {
                    items = "<tr>";
                    while (j > 0) {
                        var course = courses[k];
                        var name = course.name;
                        items += "<td style=\"padding-left: 30px; padding-right: 30px;\">\n" +
                            "<div style=\"display: flex; flex-flow: row nowrap;\" class=\"course-link\">\n" +
                            "<a onclick='return false;' style=\"text-decoration: none; color: black;\" href=\"http://ilatih.com/quiz/chapters.html?course_id=" + course.id + "\">" + name + "</a>\n" +
                            "</div>\n" +
                            "</td>";
                        k++;
                        j--;
                        len--;
                    }
                    items += "</tr>";
                    $("#courses").find("tbody").append(items);
                    if (len < 0) {
                        break;
                    }
                    j = 4;
                    if (len < 4) {
                        j = len;
                    }
                }
                setCourseLinkClickListener();
            }
        },
        error: function(a, b, c) {

        }
    });
}

function setCourseLinkClickListener() {
    $(".course-link").on("click", function() {
        $(".course-link").off("click");
        var link = $(this).find("a").attr("href");
        window.location.href = link;
    });
}

function showHomePage() {
    $("#home-content").css("display", "flex");
    $("#latihan-content").css("display", "none");
}

function showLatihanPage() {
    $("#home-content").css("display", "none");
    $("#latihan-content").css("display", "flex");
}

function contactUs() {
    window.location.href = "http://ilatih.com/quiz/contact-us.html";
}

function openFAQPage() {
    window.location.href = "http://ilatih.com/quiz/faq.html";
}

function openHelpPage() {
    window.location.href = "http://ilatih.com/quiz/help.html";
}

function openAboutPage() {
    window.location.href = "http://ilatih.com/quiz/about.html";
}

function openPrivacyPolicyPage() {
    window.location.href = "http://ilatih.com/quiz/privacy-policy.html";
}