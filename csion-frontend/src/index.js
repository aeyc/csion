const delay = ms => new Promise(res => setTimeout(res, ms));
let signUpClicked = false;
$(".openLogin").click(() => {
    $(".entrance").hide();
    $("#signUpForm").hide();
    $(".circle").removeClass('open');

    if ((window.innerWidth < window.innerHeight)) {
        $("#logo").css("margin-bottom", "30%");
    } else {
        $("#logo").css("margin-top", "5% ");
    }
    var k = 1;
    for (let i = 1; i < 7; i++) {
        var element = "";
        sleep(200 * i).then(() => {
            element = "#circle" + k.toString();
            $(element).addClass('open');
            k++;
        });
    }
    sleep(1800).then(() => {
        $("#loginForm").show();
    });
});
$(".openSignUp").click(() => {
    $(".entrance").hide();
    $("#loginForm").hide();
    $(".circle").removeClass('open');
    if ((window.innerWidth < window.innerHeight )){
        $("#logo").css("margin-bottom", "30%");
    } else {
        $("#logo").css("margin-top", "5% ");
    }

    var k = 1;
    for (let i = 1; i < 7; i++) {
        var element = "";
        sleep(200 * i).then(() => {
            element = "#circle" + k.toString();
            $(element).addClass('open');
            k++;
        });
    }
    sleep(1800).then(() => {
        $("#signUpForm").show();
    });

});
if ((window.innerWidth < window.innerHeight)) {
    //mobile
    $("#logo").css({ "width": "50%", "margin-bottom": "45%", "margin-top": "30%" });
    $("button:hover, button:active").css({ "position": "relative", "top": "1px" });
    $("#circle1").css({ "margin-left": "20%", "margin-top": "70%" });
    $("#circle2").css({ "margin-left": "-15%", "margin-top": "73%" });
    $("#circle3").css({ "margin-left": "65%", "margin-top": "74%" });
    $("#circle4").css({ "margin-left": "25%", "margin-top": "115%" });
    $("#circle5").css({ "margin-left": "-15%", "margin-top": "115%" });
    $("#circle6").css({ "margin-left": "65%", "margin-top": "115%" });
    $("#loginForm").css({ "margin-left": "12%", "margin-top": "100%" });
    $("#signUpForm").css({ "margin-left": "12%", "margin-top": "82%" });


} else {
    //desktop

    $("button:active").css({ "position": "relative", "top": "1px" });
    $("#signup:hover").css({ "background-color": "#ffffff  !important", "color": "#539093 !important" });
    $("#login:hover").css({ "background-color": "#64adb1 ", "color": "#ffffff" });
    $("hr").css("margin-top", "10%");
    $("#circle1").css({ "margin-left": "52%", "margin-top": "17%" });
    $("#circle2").css({ "margin-left": "32%", "margin-top": "18%" });
    $("#circle3").css({ "margin-left": "42%", "margin-top": "16%" });
    $("#circle4").css({ "margin-left": "52%", "margin-top": "30%" });
    $("#circle5").css({ "margin-left": "32%", "margin-top": "30%" });
    $("#circle6").css({ "margin-left": "42%", "margin-top": "30%" });
    $("#loginForm").css({ "margin-left": "40%", "margin-top": "25%" });
    $("#signUpForm").css({ "margin-left": "40%", "margin-top": "23%" });

}
const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

$('#signupbutton').click(() => {
    var message = {
        'username': $('#signupUsername').val(),
        'email': $('#signupEmail').val(),
        'password': $('#signupPassword').val()
    };
    //server interaction
    $.post("http://localhost:3000/createNewUser",message, (data) => {
        if (data) {
            $(':input','#signUpForm')
            .not(':button, :submit, :reset, :hidden')
            .val('');
            $(".entrance").show();
            $("#signUpForm").hide();
            $('#startPage').hide();
            $('#testPage').show();
        } else {
            //TODO: alert to user
        }
    });
});

$('#loginbutton').click(() => {
    var message = {
        'username': $('#loginUsername').val(),
        'password': $('#loginPassword').val()
    };
    //server interaction
    $.post("http://localhost:3000/auth",message, (data) => {
        if (data) {
            $(':input','#loginForm')
            .not(':button, :submit, :reset, :hidden')
            .val('');
            $('#startPage').hide();
            $('#homePage').show();
        } else {
            //TODO: alert to user
        }
    });
});

$('.homeNavbar').click(()=>{
    $('#profilePage').hide();
    $('#settingsPage').hide();
    $('#homePage').show();
});

$('.settingsNavbar').click(()=>{
    //get notification preference
    $.get("http://localhost:3000/getNotifPref", (data) => {
        if(data !== $('#switchNotif').is(":checked")){
            if( $('#switchNotif').is(":checked"))
                $('#switchNotif').prop('checked', false);
            else 
                $('#switchNotif').prop('checked', true);
        }
    });
    $('#profilePage').hide();
    $('#homePage').hide();
    $('#settingsPage').show();
});

$('.profileNavbar').click(()=>{
    //incoming data should be in the type of the message above
    $.get("http://localhost:3000/getUserInfo", (data) => {
        //user info
        $('.item1').text(data.nameSurname);
        $('.item3').text(data.mail);
        $('.item5').text(data.username);
        $('.item4').text(data.age);

        //user personality
        $("#personalityCard").append(`<div id = "personalityExp">
      <img id= "pChart" style= "width: 300px; height:auto" src=` + data.personality.images.disc_map + `>`);
        $("#pChart").after( `</ul><h4 id="p">Overall Profile: </h4><ul class="mylist">`);
        data.personality.content.profile.quality.forEach(element => {
            $("#p").after(`<li>`+ element  +`</li>`);
        });
        $("#pChart").after( `</ul><h4 id="m">This Personality's Motivations: </h4><ul class="mylist">`);
        data.personality.content.motivation.phrase.forEach(element => {
            $("#m").after(`<li>`+ element  +`</li> `);
        });
        $("#pChart").after( `</ul><h4 id="d">This Personality's Drainer Qualities: </h4><ul class="mylist">`);
        data.personality.content.drainer.quality.forEach(element => {
            $("#d").after(`<li>`+ element  +`</li> `);
        });
        $("#pChart").after( `<h4 id="b">This Personality's Behavior Phrases: </h4><ul class="mylist">`);
        data.personality.content.behavior.phrase.forEach(element => {
            $("#b").after(`<li>`+ element  +`</li> `);
        });
        $("#personalityExp").append('</ul></div>');

        //previous decisions asked
        data.decisions.forEach(element,index => {
            $('#previousAnswers').append(`
            <hr>
            <div class="decision" id="decision`+ index +`">
                <p id="problem`+ index +`">`+ element.problem +`</p>
                <p>Our Answer:`+ element.answer +`</p>
                <button class="feedback" id="`+ index +`">Give Feedback</button>
                <div class="feedbackForm" id= "q`+ index +`feedback">
                    <h4>Give Feedback</h4>
                    <p>Did you follow our decision?</p>
                    <input type="radio" id="followed`+ index +`" name="follow`+ index +`" value="true">
                    <label for="followed`+ index +`">Yes</label>
                    <input type="radio" id="not`+ index +`" name="follow`+ index +`" value="false">
                    <label for="not`+ index +`">No</label>
                    <p>Are you happy and satisfied with the decision you've made?</p>
                    <input type="radio" id="satisfied`+ index +`" name="satisfy`+ index +`" value="true">
                    <label for="satisfied`+ index +`">Yes</label>
                    <input type="radio" id="notsat" name="satisfy`+ index +`" value="false">
                    <label for="notsat`+ index +`">No</label>
                    <p>Any further detail you want to share with us?</p>
                    <textarea class="detail" id="detail`+ index +`" placeholder="Please type here..."></textarea>
                    <br>
                    <button class= "feedbackSubmit" id="feedbackSubmit`+ index +`">Submit</button>
                </div>
            </div>
            `);
            if(element.feedbackGiven){
                $('#'+index).remove();
                $('#q'+index+'feedback').remove();
            }
        });
        $('.feedback').click(()=>{
            var id = $(this).attr('id');
            $('#'+id).remove();
            $('#q'+id+'feedback').show();
            $('#feedbackSubmit'+id).click(()=>{
                const feedback = {
                    'problem': $('#problem'+id).text(),
                    'isFollowed': $("input[name='follow'"+id+"]:checked").val(),
                    'isSatisfied': $("input[name='satisfy'"+id+"]:checked").val(),
                    'detail': $('#detail'+id).text()
                }
               $.post("http://localhost:3000/setUserFeedback",feedback,(data)=>{
                    if(data){
                        $('#q'+id+'feedback').remove();
                    } else {
                        //TODO Alert user
                    }
               });
            });
        });
    });
    $('#settingsPage').hide();
    $('#homePage').hide();
    $('#profilePage').show();
});

$('#cont').click(()=>{
    $('#testPage').hide();
    $('#homePage').show();
});


$('#logout').click(()=>{
    $('#settingsPage').hide();
            $('#homePage').hide();
            $('#profilePage').hide();
            $('#settingsPage').hide();
            $('#testPage').hide();
            $('#startPage').show();

    //server interaction to end session 
    $.get("http://localhost:3000/logout", (data) => {
        //if success go to entrance page
        if (data) {
            $('#settingsPage').hide();
            $('#homePage').hide();
            $('#profilePage').hide();
            $('#settingsPage').hide();
            $('#testPage').hide();
            $('#startPage').show();
        }
    });
});