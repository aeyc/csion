const delay = ms => new Promise(res => setTimeout(res, ms));
let signUpClicked=false;
$(".openLogin").click(() => {
    $(".entrance").hide();
        $("#signUpForm").hide();
        $(".circle").removeClass('open');

    if ((window.innerWidth < window.innerHeight )){
        $("#logo").css("margin-bottom", "30%");
    } else {
        $("#logo").css("margin-top", "5% ");
    }
    var k = 1;
    for(let i = 1; i<7; i++){
        var element = "";
        sleep(200*i).then(() => { 
            element= "#circle"+k.toString();
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
    for(let i = 1; i<7; i++){
        var element = "";
        sleep(200*i).then(() => { 
            element= "#circle"+k.toString();
            $(element).addClass('open');
            k++;
        });     
    }
    sleep(1800).then(() => { 
        $("#signUpForm").show();
    });
    
});
if ((window.innerWidth < window.innerHeight )) { 
    //mobile
    $("#logo").css({ "width": "50%", "margin-bottom": "45%", "margin-top": "30%" });
    $("button:hover, button:active").css({ "position": "relative", "top": "1px" });
    $("#circle1").css({"margin-left":"20%", "margin-top": "70%"});
    $("#circle2").css({"margin-left":"-15%", "margin-top": "73%"});
    $("#circle3").css({"margin-left":"65%", "margin-top": "74%"});
    $("#circle4").css({"margin-left":"25%", "margin-top": "115%"});
    $("#circle5").css({"margin-left":"-15%", "margin-top": "115%"});
    $("#circle6").css({"margin-left":"65%", "margin-top": "115%"});
    $("#loginForm").css({"margin-left":"12%", "margin-top": "100%"});
    $("#signUpForm").css({"margin-left":"12%", "margin-top": "82%"});

    
} else {
    //desktop

    $("button:active").css({ "position": "relative", "top": "1px" });
    $("#signup:hover").css({ "background-color": "#ffffff  !important", "color": "#539093 !important" });
    $("#login:hover").css({ "background-color": "#64adb1 ", "color": "#ffffff" });
    $("hr").css("margin-top", "10%" );
    $("#circle1").css({"margin-left":"52%", "margin-top": "17%"});
    $("#circle2").css({"margin-left":"32%", "margin-top": "18%"});
    $("#circle3").css({"margin-left":"42%", "margin-top": "16%"});
    $("#circle4").css({"margin-left":"52%", "margin-top": "30%"});
    $("#circle5").css({"margin-left":"32%", "margin-top": "30%"});
    $("#circle6").css({"margin-left":"42%", "margin-top": "30%"});
    $("#loginForm").css({"margin-left":"40%", "margin-top": "25%"});
    $("#signUpForm").css({"margin-left":"40%", "margin-top": "23%"});
   
}
const sleep = milliseconds => { 
    return new Promise(resolve => setTimeout(resolve, milliseconds)); 
  }; 

  $('#signupbutton').click(()=>{
    //server interaction  
    post("http://localhost:3000/createNewUser", (data) => {
        console.log(data);
    });
    //if OK route to test
    $('#testbutton').show();
    $('#signupbutton').hide();
  });