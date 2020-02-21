const delay = ms => new Promise(res => setTimeout(res, ms));

$("#login").click(() => {
    $("button").hide();
    $("hr").hide();
    $("p").hide();
    if ((window.innerWidth < window.innerHeight )){
        $("#logo").css("margin-bottom", "30%");
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

if ((window.innerWidth < window.innerHeight )) { 
    //mobile
    $("#logo").css({ "width": "50%", "margin-bottom": "45%", "margin-top": "30%" });
    $("button:hover, button:active").css({ "position": "relative", "top": "1px" });
    $("#circle1").css({"margin-left":"25%", "margin-top": "80%"});
    $("#circle2").css({"margin-left":"-10%", "margin-top": "83%"});
    $("#circle3").css({"margin-left":"70%", "margin-top": "84%"});
    $("#circle4").css({"margin-left":"30%", "margin-top": "125%"});
    $("#circle5").css({"margin-left":"-10%", "margin-top": "125%"});
    $("#circle6").css({"margin-left":"70%", "margin-top": "125%"});
    $("#loginForm").css({"margin-left":"12%", "margin-top": "100%"});

    
} else {
    //desktop
    $("button:active").css({ "position": "relative", "top": "1px" });
    $("#signup:hover").css({ "background-color": "#ffffff  !important", "color": "#539093 !important" });
    $("#login:hover").css({ "background-color": "#64adb1 ", "color": "#ffffff" });
    $("hr").css("margin-top", "10%" );
}
const sleep = milliseconds => { 
    return new Promise(resolve => setTimeout(resolve, milliseconds)); 
  }; 